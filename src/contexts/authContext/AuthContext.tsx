import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from 'firebase/auth';
import { auth } from '../../../firebase'
import {ReactNode, createContext, useContext, useState, useEffect} from 'react'

type AuthContextType = {
    user: User | null,
    loggedAccounts: User[],
    login: (userData: User)=>void,
    logout: ()=>void,
    loginWithGoogle: () => Promise<void>,
    loginWithFacebook: () => Promise<void>
}

type AuthProviderProps = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [loggedAccounts, setLoggedAccounts] = useState<User[]>([])

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    
    useEffect(()=>{
        const storedUser: string | null = localStorage.getItem("loggedUser")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser)=>{
            if (firebaseUser) {
                const fullName = firebaseUser.displayName || '';
                const [firstName, ...rest] = fullName.trim().split(' ');
                const lastName = rest.join(' ');

                const mappedUser: User = {
                  id: firebaseUser.uid,
                  firstName: firstName || '',
                  lastName: lastName || '',
                  email: firebaseUser.email || '',
                }
                setUser(mappedUser)
            } else {
                setUser(null)
            }
        })
        return () => unsubscribe()
    }, [])

    function login(userData: User) {
        setUser(userData)
        localStorage.setItem("loggedUser", JSON.stringify(userData))
        
        const localAccounts: string | null = localStorage.getItem('loggedAccounts')

        const accounts: User[] = localAccounts ? JSON.parse(localAccounts) : []

        const alreadyExists: boolean = accounts.some(acc => acc.email === userData.email)

        if (!alreadyExists) {
            accounts.push(userData)
            setLoggedAccounts(accounts)
            localStorage.setItem('loggedAccounts', JSON.stringify(accounts))
        }
    }

    const loginWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
    };
    
    const loginWithFacebook = async () => {
        await signInWithPopup(auth, facebookProvider);
    };

    async function logout() {
        try {
            await signOut(auth)
            setUser(null)
            localStorage.removeItem("loggedUser")
        } catch (error) {
            console.log("Erro a deslogar:", error)
        }
        
    }

    return (
        <AuthContext.Provider
        value={{user, loggedAccounts, login, logout, loginWithFacebook, loginWithGoogle}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
}

export { useAuth }
export default AuthProvider

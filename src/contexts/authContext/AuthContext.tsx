import { ReactNode, createContext, useContext, useState, useEffect } from 'react'

type AuthContextType = {
    user: User | null,
    loggedAccounts: User[],
    login: (userData: User)=>void,
    logout: ()=>void
}

type AuthProviderProps = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [loggedAccounts, setLoggedAccounts] = useState<User[]>([])
    
    useEffect(()=>{
        const storedUser: string | null = localStorage.getItem("loggedUser")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
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

    async function logout() {
        try {
            setUser(null)
            localStorage.removeItem("loggedUser")
        } catch (error) {
            console.log("Erro ao deslogar:", error)
        }    
    }

    return (
        <AuthContext.Provider
        value={{user, loggedAccounts, login, logout}}>
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

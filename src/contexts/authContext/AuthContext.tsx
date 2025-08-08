import { useMutation, useQuery } from '@tanstack/react-query'
import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { get, put, remove } from '../../util/requests/api'

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
    
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => await get("http://localhost:5000/loggedUser")
    })

    const loginMutation = useMutation({
        mutationFn: ({ user }: { user: User }) => put(`http://localhost:5000/loggedUser`, user)
    })

    const logoutMutation = useMutation({
        mutationFn: () => put(`http://localhost:5000/loggedUser`, {})
    })

    useEffect(()=>{
        if (data?.id) setUser(data)
    }, [data])

    function login(userData: User) {
        setUser(userData)
        loginMutation.mutate({ user: userData })
        
        const localAccounts: string | null = localStorage.getItem('loggedAccounts')

        const accounts: User[] = localAccounts ? JSON.parse(localAccounts) : []

        const alreadyExists: boolean = accounts.some(acc => acc.email === userData.email)

        if (!alreadyExists) {
            accounts.push(userData)
            setLoggedAccounts(accounts)
            localStorage.setItem('loggedAccounts', JSON.stringify(accounts))
        }
    }

    const logout = () => {
        setUser(null)
        logoutMutation.mutate()
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

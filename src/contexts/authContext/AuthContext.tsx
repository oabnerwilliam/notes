import { useMutation, useQuery } from '@tanstack/react-query'
import { ReactNode, createContext, useContext, useState } from 'react'
import { get, put } from '../../util/requests/api'
import Loader from '../../components/layout/loader/Loader'

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

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [loggedAccounts, setLoggedAccounts] = useState<User[]>([])
    
    const { isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            setUser(await get("http://localhost:5000/loggedUser"))
        } 
    })

    const loginMutation = useMutation({
        mutationFn: ({ user }: { user: User }) => put(`http://localhost:5000/loggedUser`, user)
    })

    const logoutMutation = useMutation({
        mutationFn: () => put(`http://localhost:5000/loggedUser`, {})
    })

    const login = (userData: User) => {
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
            { !isLoading ? children : <Loader/> }
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType | null => useContext(AuthContext)
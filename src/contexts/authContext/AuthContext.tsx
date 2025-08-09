import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { ReactNode, createContext, useContext, useMemo, useState } from 'react'
import { get, put } from '../../util/requests/api'

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
    const [loggedAccounts, setLoggedAccounts] = useState<User[]>([])
    
    const queryClient = useQueryClient()

    const { data } = useSuspenseQuery({
        queryKey: ['user'],
        queryFn: async () => await get("http://localhost:5000/loggedUser")
    })

    const user = useMemo(() => data?.id && data, [data])

    const loginMutation = useMutation({
        mutationFn: async ({ user }: { user: User }) => await put(`http://localhost:5000/loggedUser`, user),
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['user'] })
    }) 

    const logoutMutation = useMutation({
        mutationFn: async () => await put(`http://localhost:5000/loggedUser`, {}),
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['user'] })
    })

    const login = (userData: User) => {
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
        logoutMutation.mutate()
    }

    return (
        <AuthContext.Provider
        value={{ user, loggedAccounts, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
}

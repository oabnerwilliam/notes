import {React, createContext, useContext, useState, useEffect} from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    //const [localUsers, setLocalUsers] = useState(null)
    
    useEffect(()=>{
        const storedUser = localStorage.getItem("loggedUser")
        const timer = setTimeout(()=>{
            if (storedUser) {
                setUser(JSON.parse(storedUser))
            }
            setIsLoading(false)    
        }, 1000)

        return () => clearTimeout(timer)
        /*const storedLocalUsers = localStorage.getItem("users")
        if(storedLocalUsers) {
            setLocalUsers(JSON.parse(storedLocalUsers))    
        }*/
    }, [])

    function login(userData) {
        setUser(userData)
        localStorage.setItem("loggedUser", JSON.stringify(userData))
        /*setLocalUsers({
            ...localUsers,
            userData
        })*/
    }

    /*useEffect(()=>{
        localStorage.setItem("users", JSON.stringify(localUsers))
    }, [localUsers])*/

    function logout() {
        setUser(null)
        localStorage.removeItem("loggedUser")
    }

    /*if (loading) {
        return <Loader/>
    }*/

    return (
        <AuthContext.Provider
        value={{user, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    return useContext(AuthContext)
}

export { useAuth }
export default AuthProvider

import {React, createContext, useContext, useState, useEffect} from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    
    useEffect(()=>{
        const storedUser = localStorage.getItem("loggedUser")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    function login(userData) {
        setUser(userData)
        localStorage.setItem("loggedUser", JSON.stringify(userData))
    }

    function logout() {
        setUser(null)
        localStorage.removeItem("loggedUser")
    }

    return (
        <AuthContext.Provider
        value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    return useContext(AuthContext)
}

export { useAuth }
export default AuthProvider

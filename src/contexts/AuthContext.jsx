import {React, createContext, useContext, useState, useEffect} from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loggedAccounts, setLoggedAccounts] = useState([])
    //const [localUsers, setLocalUsers] = useState(null)
    
    useEffect(()=>{
        const storedUser = localStorage.getItem("loggedUser")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        /*const storedLocalUsers = localStorage.getItem("users")
        if(storedLocalUsers) {
            setLocalUsers(JSON.parse(storedLocalUsers))    
        }*/
    }, [])

    function login(userData) {
        setUser(userData)
        localStorage.setItem("loggedUser", JSON.stringify(userData))
        
        const accounts = JSON.parse(localStorage.getItem('loggedAccounts')) || []

        const alreadyExists = accounts.some(acc => acc.email === userData.email)

        if (!alreadyExists) {
            accounts.push(userData)
            setLoggedAccounts(accounts)
            localStorage.setItem('loggedAccounts', JSON.stringify(accounts))
        }
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
        value={{user, loggedAccounts, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    return useContext(AuthContext)
}

export { useAuth }
export default AuthProvider

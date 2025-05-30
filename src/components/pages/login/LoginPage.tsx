import React, { useEffect, useState } from 'react'
import UserForm from '../../form/auth/UserForm'
import { useNavigate } from 'react-router-dom'
import LinkButton from '../../layout/linkbutton/LinkButton'

import { useAuth } from '../../../contexts/AuthContext'
import Message from '../../layout/message/Message'

import {get} from '../../../util/requests/api'

const LoginPage = () => {
    const [existingUsers, setExistingUsers] = useState<User[]>([])
    const [currentUser, setCurrentUser] = useState<User>({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [message, setMessage] = useState<string>("")

    const {login, loginWithGoogle, loginWithFacebook} = useAuth()

    const navigate = useNavigate()

    useEffect(()=>{
        const getExistingUsers = async (): Promise<void> => {
            const users = await get("http://localhost:5000/users")
            setExistingUsers(users)    
        }
        getExistingUsers()
    }, [])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentUser({
            ...currentUser,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //const message = loginUser(existingUsers, currentUser, "/mynotes", login)
        const foundUser: User | undefined = existingUsers.find((existingUser)=>existingUser.email===currentUser.email)
        if (foundUser) {
            if (foundUser.password===currentUser.password) {
                navigate("/mynotes")
                login(foundUser)
            } else {
                setMessage("Senha errada.")
            }
        } else {
            setMessage("Usuário não existe.")
        }
        //setMessage(message)
        setTimeout(()=>{
            setMessage("")
        }, 3000)
    }

    return (
        <div 
        className='w-full 
        flex flex-col items-center justify-center gap-6
        text-secondary'
        >
            {
                message && (
                    <Message type={"error"} msg={message}/>
                )
            }
            <h1>Entrar</h1>
            <UserForm type="login" btnText="Entrar" handleOnChange={handleOnChange} handleSubmit={handleLogin}/>
            <button onClick={()=>{
                navigate("/mynotes")
                loginWithGoogle()
            }} className='cursor-pointer p-2 hover:bg-primary hover:text-p-text 
            transition-all duration-300 ease-in-out'>Login com Google</button>
            <button onClick={()=>{
                navigate("/mynotes")
                loginWithFacebook()
            }} className='cursor-pointer p-2 hover:bg-primary hover:text-p-text 
            transition-all duration-300 ease-in-out'>Login com Facebook</button>
            <LinkButton to="/signup" text="Fazer Cadastro" color="color"/>
        </div>  
    )
}

export default LoginPage

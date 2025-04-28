import React, { useEffect, useState } from 'react'
import UserForm from '../../form/auth/UserForm'
import style from './LoginPage.module.css'
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

    const {login} = useAuth()

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
        <div className={style.loginContainer}>
            {
                message && (
                    <Message type={"error"} msg={message}/>
                )
            }
            <h1>Entrar</h1>
            <UserForm type="login" btnText="Entrar" handleOnChange={handleOnChange} handleSubmit={handleLogin}/>
            <LinkButton to="/signup" text="Fazer Cadastro" color="color"/>
        </div>  
    )
}

export default LoginPage

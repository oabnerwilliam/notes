import React, { useEffect, useState } from 'react'
import UserForm from '../form/UserForm'
import style from './LoginPage.module.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LinkButton from '../layout/LinkButton'

import { useAuth } from '../../contexts/AuthContext'
import Message from '../layout/Message'

const LoginPage = () => {
    const [existingUsers, setExistingUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [message, setMessage] = useState("")

    const {login} = useAuth()

    const navigate = useNavigate()

    useEffect(()=>{
        fetch("http://localhost:5000/users", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp=>resp.json())
        .then((data)=>{
            setExistingUsers(data)
        })
        .catch((err)=>console.log("Erro ao buscar usuários", err))
    }, [])

    const handleOnChange = (e) => {
        setCurrentUser({
            ...currentUser,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const foundUser = existingUsers.find((existingUser)=>existingUser.email===currentUser.email)
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
        const timer = setTimeout(()=>{
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

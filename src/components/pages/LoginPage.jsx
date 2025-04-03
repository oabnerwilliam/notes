import React, { useEffect, useState } from 'react'
import UserForm from '../form/UserForm'

import style from './LoginPage.module.css'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [existingUsers, setExistingUsers] = useState([])
    const [user, setUser] = useState({})
    const [message, setMessage] = useState("")

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
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault()
        const foundUser = existingUsers.find((existingUser)=>existingUser.email===user.email)
        if (foundUser) {
            if (foundUser.password===user.password) {
                navigate("/mynotes")
                localStorage.setItem("loggedUser", JSON.stringify(foundUser))
            } else {
                const timer = setTimeout(()=>{

                }, 3000)
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
                    <p>{message}</p>
                )
            }
            <h1>Entrar</h1>
            <UserForm type="login" btnText="Entrar" handleOnChange={handleOnChange} handleSubmit={login}/>
        </div>  
    )
}

export default LoginPage

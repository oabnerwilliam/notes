import React, { useEffect, useState } from 'react'

import style from './SignUpPage.module.css'

import { FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const [viewPassword, setViewPassword] = useState(false)
  const [inputType, setInputType] = useState('password')
  const [user, setUser] = useState({})
  const [existingUsers, setExistingUsers] = useState([])

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value
    })
  }

  useEffect(()=>{
    fetch("http://localhost:5000/users", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp=>resp.json())
    .then((data)=>{
        console.log(data)
        setExistingUsers(data)
    })
    .catch((err)=>{
        console.log("Erro ao ver usuários já cadastrados.", err)
    })
  }, [])

  const submitUser = (e) => {
    e.preventDefault()
    const userExists = existingUsers.find((existingUser)=> user.email === existingUser.email)
    if (userExists) {
        console.log("Usuário já cadastrado.")
    } else {
        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(resp=>resp.json())
        .then((data)=>{
            console.log("Usuário cadastrado com sucesso!", data)
            return fetch("http://localhost:5000/users")
            
        })
        .then(resp=>resp.json())
        .then((updatedUsers)=>{
            setExistingUsers(updatedUsers)
        })
        .catch((err)=>{
            console.log("Erro ao cadastrar usuário ou atualizar lista.", err)
        })
        navigate("/mynotes")
    }
  }

  const showPassword = () => {
    setViewPassword(!viewPassword)
  }
  useEffect(()=>{
    if (viewPassword == true) {
        setInputType('text')
    } else {
        setInputType('password')
    }
  }, [viewPassword])

  return (
    <div className={style.formContainer}>
        <form className={style.form} onSubmit={submitUser}>
            <input type="text" 
            name="name" 
            id="name" 
            placeholder="Insira seu nome"
            onChange={handleOnChange}
            required/>
            <input type="email" 
            name="email" 
            id="email"
            placeholder="Insira seu email"
            onChange={handleOnChange}
            required/>
            <div className={style.passwordContainer}>
                <input type={inputType} 
                name="password" 
                id="password"
                placeholder="Insira sua senha"
                minLength="6"
                onChange={handleOnChange}
                required/>
                <FaEye onClick={showPassword} 
                className={style.eye}/>   
            </div>
            <button type="submit" className={style.submitButton}>Cadastrar</button>
        </form>
    </div>
  )
}

export default SignUpPage

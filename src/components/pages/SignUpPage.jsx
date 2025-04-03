import React, { useEffect, useState } from 'react'

import style from './SignUpPage.module.css'

import { FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import UserForm from '../form/UserForm'

const SignUpPage = () => {
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

  return (
    <div className={style.formContainer}>
        <UserForm type="signUp" btnText="Cadastrar" handleOnChange={handleOnChange} handleSubmit={submitUser}/>
    </div>
  )
}

export default SignUpPage

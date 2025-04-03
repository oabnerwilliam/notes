import React from 'react'

import style from './UserForm.module.css'

import { useState, useEffect } from 'react'

import { FaEye } from 'react-icons/fa'

const UserForm = ({type, btnText, handleOnChange, handleSubmit}) => {
    const [viewPassword, setViewPassword] = useState(false)
    const [inputType, setInputType] = useState('password')
  
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
        <form className={style.form} onSubmit={handleSubmit}>
                {
                    type=="signUp" && (
                        <input type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Insira seu nome"
                        onChange={handleOnChange}
                        required/>
                    )
                }
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
                <button type="submit" className={style.submitButton}>{btnText}</button>
        </form>
    )
}

export default UserForm

import { useState, useEffect } from 'react'
import { FaEye } from 'react-icons/fa'
import style from './UserForm.module.css'

type UserFormProps = {
    type: 'signUp' | 'login',
    btnText: string,
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const UserForm = ({type, btnText, handleOnChange, handleSubmit}: UserFormProps) => {
    const [viewPassword, setViewPassword] = useState<boolean>(false)
    const [inputType, setInputType] = useState<"password" | "text">('password')
  
    const showPassword = (): void => {
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
                    type==="signUp" && (
                        <>
                            <input type="text" 
                            name="firstName" 
                            id="name" 
                            placeholder="Insira seu primeiro nome"
                            onChange={handleOnChange}
                            required/>
                            <input type="text" 
                            name="lastName" 
                            id="name" 
                            placeholder="Insira seu sobrenome"
                            onChange={handleOnChange}
                            required/>    
                        </>
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
                        minLength={6}
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

import { useState, useEffect } from 'react'
import { FaEye } from 'react-icons/fa'

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
        <form 
        className='flex flex-col items-start
        w-2/5
        gap-4
        relative'
        onSubmit={handleSubmit}>
                {
                    type==="signUp" && (
                        <>
                            <input type="text" 
                            name="firstName" 
                            id="name" 
                            placeholder="Insira seu primeiro nome"
                            onChange={handleOnChange}
                            required
                            className='p-2
                            text-xl
                            w-full
                            text-secondary
                            outline-none
                            border border-secondary'/>
                            <input type="text" 
                            name="lastName" 
                            id="name" 
                            placeholder="Insira seu sobrenome"
                            onChange={handleOnChange}
                            required
                            className='p-2
                            text-xl
                            w-full
                            text-secondary
                            outline-none
                            border border-secondary'/>    
                        </>
                    )
                }
                <input type="email" 
                    name="email" 
                    id="email"
                    placeholder="Insira seu email"
                    onChange={handleOnChange}
                    required
                    className='p-2
                    text-xl
                    w-full
                    text-secondary
                    outline-none
                    border border-secondary'/>
                <div 
                className='relative w-full'
                >
                    <input type={inputType} 
                        name="password" 
                        id="password"
                        placeholder="Insira sua senha"
                        minLength={6}
                        onChange={handleOnChange}
                        required
                        className='p-2
                        text-xl
                        w-full
                        text-secondary
                        outline-none
                        border border-secondary'/>
                        <FaEye onClick={showPassword} 
                        className='border-none
                        text-xl
                        flex justify-center
                        absolute
                        right-2
                        top-1/2
                        bg-transparent
                        transform
                        -translate-y-1/2
                        transition-all
                        duration-300
                        ease-in-out
                        cursor-pointer
                        hover:fill-primary'
                        />   
                </div>
                <button type="submit" 
                className='p-4
                self-center
                w-4/5
                bg-secondary
                text-bg
                transition-all
                duration-300
                ease-in-out
                cursor-pointer
                hover:bg-s-hover'
                >{btnText}</button>
        </form>
    )
}

export default UserForm

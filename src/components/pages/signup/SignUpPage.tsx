import { useEffect, useState } from 'react'

import style from './SignUpPage.module.css'

import { useNavigate } from 'react-router-dom'

import UserForm from '../../form/auth/UserForm'
import LinkButton from '../../layout/linkbutton/LinkButton'
import Message from '../../layout/message/Message'

const SignUpPage = () => {
    const [user, setUser] = useState<User>({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [existingUsers, setExistingUsers] = useState<User[]>([])
    const [message, setMessage] = useState<string>("")

    const navigate = useNavigate()

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const submitUser = (e: React.FormEvent) => {
        e.preventDefault()
        const userExists: User | undefined = existingUsers.find((existingUser)=> user.email === existingUser.email)
        if (userExists) {
            setMessage("Usuário já cadastrado.")
            setTimeout(()=>{
                setMessage("")
            }, 3000)
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
            navigate("/login")
        }
    }

    return (
        <div className={style.formContainer}>
            {
                message && (
                    <Message msg={message} type="error"/>
                )
            }
            <h1>Cadastrar</h1>
            <UserForm type="signUp" btnText="Cadastrar" handleOnChange={handleOnChange} handleSubmit={submitUser}/>
            <LinkButton to="/login" text="Fazer Login" color="color"/>
        </div>
    )
}

export default SignUpPage

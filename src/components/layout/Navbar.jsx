import React, { useEffect, useState } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'

import Container from './Container'

const Navbar = () => {
    const [loggedUser, setLoggedUser] = useState({})

    const navigate = useNavigate()

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("loggedUser"))
        if (user) {
            setLoggedUser(user)
        }
    }, [])
    
    const logout = () => {
        localStorage.removeItem("loggedUser")
        navigate("/")
    }
    
    return (
        <>
            <nav className={style.navbar}>
                <Container>
                    <Link to="/" className={style.title}><h1>NOTES</h1></Link>
                    <ul>
                        <li>
                            <Link to="/">Início</Link>
                        </li>
                        {
                            Object.keys(loggedUser).length>0 ? (
                                <>
                                    <li>
                                        <Link to="/mynotes">Minhas Notas</Link>
                                    </li>
                                    <button onClick={logout}>Sair</button>    
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/signup">Cadastro</Link>
                                    </li>
                                </>
                                
                            )
                        }
                        
                        
                        
                    </ul>    
                </Container>
            </nav>
        </>
    )
}

export default Navbar

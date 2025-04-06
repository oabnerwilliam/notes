import React, { useEffect, useState } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'

import Container from './Container'
import AuthButton from './AuthButton'

import {useAuth} from '../../contexts/AuthContext'
import Loader from './Loader'

const Navbar = () => {
    const {user, logout, isLoading} = useAuth()

    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/")
    }
    
    return (
        <>
            <nav className={`${style.navbar} ${isLoading ? style.loading : ''}`}>
                <Container>
                    <Link to="/" className={style.title}><h1>NOTES</h1></Link>
                    <ul>
                        {
                            user ? (
                                <>
                                    <AuthButton text={user.firstName}
                                    type="link"
                                    color="white"/>
                                    <AuthButton text="Sair" 
                                    color="green"
                                    type="button"
                                    handleOnClick={handleLogout}/>    
                                </>
                            ) : isLoading ? (
                                <></>
                            ) : (
                                <>
                                    <AuthButton
                                    text="Entrar"
                                    color="green"
                                    type="link"
                                    to="/login"/>
                                    <AuthButton
                                    text="Criar Conta"
                                    color="white"
                                    type="link"
                                    to="/signup"/>
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

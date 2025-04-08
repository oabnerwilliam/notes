import React, { useEffect, useState } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import AuthButton from './AuthButton'

import {useAuth} from '../../contexts/AuthContext'

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
                <div className={style.navContainer}>
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
                                <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 0.3}}
                                style={{display: 'flex',
                                    gap: '1em'
                                }}
                                >
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
                                </motion.div> 
                            )
                        }
                    </ul>    
                </div>
            </nav>
        </>
    )
}

export default Navbar

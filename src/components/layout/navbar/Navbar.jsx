import React, { useEffect, useState } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import AuthButton from '../authbutton/AuthButton'

import {useAuth} from '../../../contexts/AuthContext'
import DropDown from '../dropdown/DropDown'

const Navbar = () => {
    const {user, logout, isLoading} = useAuth()
    const [scrolled, setScrolled] = useState(false)

    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/")
    }
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`${style.navbar} ${scrolled ? style.scrolled : ''}`}>
                <div className={style.navContainer}>
                    <Link to="/" className={style.title}><h1>NOTES</h1></Link>
                    <ul>
                        {
                            user ? (
                                <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 0.3}}
                                style={{display: 'flex',
                                    gap: '1em'
                                }}
                                >
                                    <AuthButton text={user.firstName}
                                    type="link"
                                    to="/accounts"
                                    color="page"/>
                                    <AuthButton text="Sair" 
                                    color="color"
                                    type="button"
                                    handleOnClick={handleLogout}/>    
                                </motion.div>
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
                                    color="color"
                                    type="link"
                                    to="/accounts"/>
                                    <AuthButton
                                    text="Criar Conta"
                                    color="page"
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

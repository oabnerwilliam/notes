import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import AuthButton from '../authbutton/AuthButton'
import logo from '../../../../public/favicon.svg'

import {useAuth} from '../../../contexts/AuthContext'

const Navbar = () => {
    const {user, loggedAccounts, logout} = useAuth() // tipar
    const [scrolled, setScrolled] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleLogout = (): void => {
        logout()
        navigate("/")
    }
    
    useEffect(() => {
        const handleScroll = (): void => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);

    return (
        <>
            <nav 
            className={`p-8 h-28 bg-bg
            fixed top-0 left-0 w-full z-1000
            after:content-[""] after:h-px after:w-full after:bg-p-text after:absolute after:bottom-0 after:left-0
            ${scrolled ? "shadow-sm shadow-black after:opacity-0" : ""}`}
            >
                <div 
                className='max-w-250 h-full mx-auto
                flex justify-between items-center'
                >
                    {/* <Link to="/" 
                    className='self-center justify-self-start text-secondary decoration-none
                    transition-all duration-300 ease-in-out
                    relative hover:text-primary'
                    ><h1>NOTES</h1></Link> */}
                    <Link to="/" 
                    className='self-center justify-self-start text-secondary decoration-none
                    transition-all duration-300 ease-in-out
                    relative hover:text-primary'
                    ><img src={logo} className='w-[50px]'></img></Link>
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
                                    type="button"
                                    showAccounts="true"
                                    color="page"/>
                                    <AuthButton text="Sair" 
                                    color="color"
                                    type="button"
                                    handleOnClick={handleLogout}/>    
                                </motion.div>
                            ) : (
                                <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 0.3}}
                                style={{display: 'flex',
                                    gap: '1em'
                                }}
                                >
                                    {/* <AuthButton
                                    text="Entrar"
                                    color="color"
                                    type="link"
                                    to={loggedAccounts && loggedAccounts.length>0 ? "/accounts" : "/login"}/> */}
                                    <AuthButton text="Entrar"
                                    type="button"
                                    showAccounts="true"
                                    color="color"/>
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

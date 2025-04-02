import React from 'react'
import style from './Navbar.module.css'
import { Link } from 'react-router-dom'

import Container from './Container'

const Navbar = () => {
  return (
    <>
        <nav className={style.navbar}>
            <Container>
                <Link to="/"><h1>NOTES</h1></Link>
                <ul>
                    <li>
                        <Link to="/">Início</Link>
                    </li>
                    <li>
                        <Link to="/mynotes">Minhas Notas</Link>
                    </li>
                </ul>    
            </Container>
        </nav>
    </>
  )
}

export default Navbar

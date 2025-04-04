import React, { useEffect, useState } from 'react'

import style from './Home.module.css'

import Notes from '../../img/notes.svg'
import LinkButton from '../layout/LinkButton'

const Home = () => {
  const [loggedUser, setLoggedUser] = useState({})
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("loggedUser"))
    if (user) {
      setLoggedUser(user)
    }
  }, [])

  return (
    <>
      <div className={style.home}>
        <h1><span>NOTES</span></h1>
        <p>O seu bloco de notas virtual.</p>
        {
          Object.keys(loggedUser).length>0 ? (
            <LinkButton to="/mynotes" text="Minhas Notas" color="black"/>
          ) : (
            <div className={style.links}>
              <LinkButton to="/login" text="Entrar" color="green"/>
              <LinkButton to="/signup" text="Cadastrar" color="black"/>
            </div>
          )
        }
        <img src={Notes} alt="Notas"/>
      </div>
    </>
  )
}

export default Home

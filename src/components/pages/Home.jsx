import React, { useEffect, useState } from 'react'

import style from './Home.module.css'

import notes from '../../img/notes.svg'
import LinkButton from '../layout/linkbutton/LinkButton'

import { useAuth } from '../../contexts/AuthContext'
import Loader from '../layout/loader/Loader'

const Home = () => {
  const {user} = useAuth()

  return (
    <>
      <div className={style.home}>
        {
          user ? (
            <>
              <h1>Olá, <span>{user.firstName}</span></h1>
              <p>Bem-vindo de volta ao seu bloco de notas virtual!</p>
              <LinkButton to="/mynotes" text="Minhas Notas" color="color"/>
            </>
          ) : (
            <>
              <h1><span>NOTES</span></h1>
              <p>O seu bloco de notas virtual.</p>
              <div className={style.links}>
                <LinkButton to="/accounts" text="Entrar" color="color"/>
                <LinkButton to="/signup" text="Criar Conta" color="page"/>
              </div>
            </>
          )
        }
        <img src={notes} alt="Notas"/>
      </div>
    </>
  )
}

export default Home

import React from 'react'

import style from './Home.module.css'

import Notes from '../../img/notes.svg'
import LinkButton from '../layout/LinkButton'

const Home = () => {
  return (
    <>
      <div className={style.home}>
        <h1>Bem-vindo ao <span>Notes!</span></h1>
        <p>Seu mais novo bloco de notas virtual!</p>
        <div className={style.links}>
          <LinkButton to="/createnote" text="Criar Nota" color="black"/>
          <LinkButton to="/mynotes" text="Ver Notas" color="green"/>
        </div>
        
        <img src={Notes} alt="Notas"/>
      </div>
    </>
  )
}

export default Home

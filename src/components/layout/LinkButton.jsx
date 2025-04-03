import React from 'react'

import { Link } from 'react-router-dom'

import style from './LinkButton.module.css'

import { FaPen } from 'react-icons/fa'

const LinkButton = ({to, text, color}) => {
  return (
    <>
      <Link to={to} className={`${style.btn} ${style[color]}`}>{text}</Link>
      {/*<div className={style.container}>
        <Link to={to} 
        className={style.animatedButton}>
          <FaPen/>
          <span>{text}</span>
        </Link>
      </div>*/}
    </>
  )
}

export default LinkButton

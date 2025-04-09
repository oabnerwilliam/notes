import React from 'react'

import { Link } from 'react-router-dom'

import style from './LinkButton.module.css'

import { FaPen } from 'react-icons/fa'

const LinkButton = ({to, text, color, handleOnClick}) => {
  return (
    <>
      <Link to={to} 
      className={`${style.btn} 
      ${style[color]}`}
      onClick={handleOnClick}>{text}</Link>
    </>
  )
}

export default LinkButton

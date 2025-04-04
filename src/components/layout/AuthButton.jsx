import React from 'react'

import style from './AuthButton.module.css'
import { Link } from 'react-router-dom'

function AuthButton({handleOnClick, to, text, color, type}) {
  return (
    <>
        {
            type==="button" ? (
                <button className={`${style.btn} ${style[color]}`} onClick={handleOnClick}>{text}</button>
            ) : (
                <Link className={`${style.btn} ${style[color]}`} to={to}>{text}</Link>
            )
        }
    </>
  )
}

export default AuthButton

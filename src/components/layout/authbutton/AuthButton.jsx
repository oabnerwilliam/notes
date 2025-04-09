import React, { useState } from 'react'

import style from './AuthButton.module.css'
import { Link } from 'react-router-dom'
import DropDown from '../dropdown/DropDown'

function AuthButton({handleOnClick, to, text, color, type, showAccounts}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const clickEvent = () => {
    if(type=="button") {
      if (handleOnClick) {
        handleOnClick()
      }
      if (showAccounts==="true") {
        openMenu()
      }
    }  
  }

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className={style.btnContainer}>
        {
            type==="button" ? (
                <button className={`${style.btn} 
                ${style[color]}`} 
                onClick={clickEvent}>{text}</button>
            ) : (
                <Link className={`${style.btn} 
                ${style[color]}`} 
                to={to}
                onClick={clickEvent}>{text}</Link>
            )
        }
        {
          showAccounts=="true" && (
            <DropDown isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}/>
          )
        }
    </div>
  )
}

export default AuthButton

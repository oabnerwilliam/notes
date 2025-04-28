import React, { useState } from 'react'

import style from './AuthButton.module.css'
import { Link } from 'react-router-dom'
import DropDown from '../dropdown/DropDown'

function AuthButton({handleOnClick, to, text, color, type, showAccounts}: ButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  
  const clickEvent = (): void => {
    if(type=="button") {
      if (handleOnClick) {
        handleOnClick()
      }
      if (showAccounts==="true") {
        openMenu()
      }
    }  
  }

  const openMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className={style.btnContainer}>
        {
            type==="button" ? (
                <button className={`${style.btn} 
                ${style[color]}`} 
                onClick={clickEvent}>{text}</button>
            ) : to ? (
                <Link className={`${style.btn} 
                ${style[color]}`} 
                to={to}
                onClick={clickEvent}>{text}</Link>
            ) : null
        }
        {
          showAccounts==="true" && (
            <DropDown isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}/>
          )
        }
    </div>
  )
}

export default AuthButton

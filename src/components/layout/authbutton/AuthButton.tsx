import { useState } from 'react'

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

  const btnStyle = `py-4 px-6
    flex items-center justify-center
    rounded-4xl
    transition-all duration-300 ease-in-out
    no-underline w-auto
    border-none
    text-[.8em]
    ${color==="color"?
      "bg-primary text-p-text cursor-pointer hover:bg-p-hover":
      "bg-secondary text-bg cursor-pointer hover:bg-s-hover"}`

  return (
    <div 
    className='relative'
    >
        {
            type==="button" ? (
                <button 
                className={btnStyle} 
                onClick={clickEvent}>{text}</button>
            ) : to ? (
                <Link 
                className={btnStyle} 
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

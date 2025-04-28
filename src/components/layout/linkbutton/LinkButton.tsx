import { Link } from 'react-router-dom'

import style from './LinkButton.module.css'

const LinkButton = ({to, text, color, handleOnClick}: ButtonProps) => {
  return (
    <>
      {
        to && (
          <Link to={to} 
          className={`${style.btn} 
          ${style[color]}`}
          onClick={handleOnClick}>{text}</Link>  
        )
      }
    </>
  )
}

export default LinkButton

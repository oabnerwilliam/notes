import { Link } from 'react-router-dom'

const LinkButton = ({to, text, color, handleOnClick}: ButtonProps) => {
  return (
    <>
      {
        to && (
          <Link to={to} 
          className={`decoration-none p-4
            ${color==="page"?
              "bg-secondary text-bg transition-all ease-in-out duration-300 hover:bg-s-hover":
              "bg-primary text-p-text transition-all ease-in-out duration-300 hover:bg-p-hover"}`}
          onClick={handleOnClick}>{text}</Link>  
        )
      }
    </>
  )
}

export default LinkButton

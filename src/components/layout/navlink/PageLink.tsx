import style from './PageLink.module.css'

import { Link } from 'react-router-dom'

const PageLink = ({to, text}: ButtonProps) => {
  return to && (
    <Link to={to} 
    className={style.link}>{text}</Link>
  )
}

export default PageLink

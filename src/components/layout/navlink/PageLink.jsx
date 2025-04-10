import React from 'react'

import style from './PageLink.module.css'

import { Link } from 'react-router-dom'

const PageLink = ({to, text}) => {
  return <Link to={to}
  className={style.link}>{text}</Link>
}

export default PageLink

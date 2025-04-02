import React from 'react'

import { Link } from 'react-router-dom'

import style from './LinkButton.module.css'

const LinkButton = ({to, text, color}) => {
  return <Link to={to} className={`${style.btn} ${style[color]}`}>{text}</Link>
}

export default LinkButton

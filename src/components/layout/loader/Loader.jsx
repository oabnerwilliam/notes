import React, { useState, useEffect } from 'react'

import style from './Loader.module.css' 
import { BarLoader, PuffLoader } from 'react-spinners'

const Loader = ({fullScreen = false}) => {
  const [color, setColor] = useState()
  
  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement)
    const loaderColor = rootStyles.getPropertyValue("--secondary").trim()
    setColor(loaderColor)
  }, [])

  return (
    <div className={`${style.loaderContainer}
    ${fullScreen ? style.fullScreen : ''}`}>
      <BarLoader color={color} width={50}/>
    </div>
  )
}

export default Loader

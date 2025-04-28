import { useState, useEffect } from 'react'

import style from './Loader.module.css' 
import { BarLoader } from 'react-spinners'

type LoaderProps = {
  fullScreen?: boolean
}

const Loader = ({fullScreen = false}: LoaderProps) => {
  const [color, setColor] = useState<string>()
  
  useEffect(() => {
    const rootStyles: CSSStyleDeclaration = getComputedStyle(document.documentElement)
    const loaderColor: string = rootStyles.getPropertyValue("--secondary").trim()
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

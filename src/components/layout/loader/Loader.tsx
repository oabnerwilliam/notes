import { useState, useEffect } from 'react'

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
    <div className={`size-full
    flex justify-center items-center
    bg-bg
    ${fullScreen ? "fixed top-0 left-0 w-screen h-screen bg-bg z-2" : ""}`}>
      <BarLoader color={color} width={50}/>
    </div>
  )
}

export default Loader

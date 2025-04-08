import { useState } from 'react'
import style from './DarkButton.module.css'

import { FaMoon, FaSun } from 'react-icons/fa'

const DarkButton = () => {
    const [isDark, setIsDark] = useState(false)

    const toggleDark = () => {
        document.documentElement.classList.toggle("darkmode")
        setIsDark(!isDark)
        if (isDark) {
            removeDark()
        } else {
            activateDark()
        }
    }

    const activateDark = () => {
        localStorage.setItem("darkmode", "on")
    }

    const removeDark = () => {
        localStorage.removeItem("darkmode")
    }
  
    return <div className={style.btn} onClick={toggleDark}>{isDark==false ? <FaMoon/> : <FaSun/>}</div>
}

export default DarkButton

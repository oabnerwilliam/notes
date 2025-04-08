import { useEffect, useState } from 'react'
import style from './DarkButton.module.css'

import { FaMoon, FaSun } from 'react-icons/fa'

const DarkButton = () => {
    const [isDark, setIsDark] = useState(()=>{
        return localStorage.getItem('darkmode') === 'on' ||
        document.documentElement.classList.contains('darkmode')
    })

    const toggleDark = () => {
        if (isDark) {
            document.documentElement.classList.remove("darkmode")
            localStorage.removeItem("darkmode")
        } else {
            document.documentElement.classList.add("darkmode")
            localStorage.setItem("darkmode", "on")
        }
        setIsDark(!isDark)
    }

    useEffect(()=>{
        if (isDark) {
            document.documentElement.classList.add('darkmode')
        } else {
            document.documentElement.classList.remove('darkmode')
        }
    }, [isDark])
  
    return <div className={style.btn} onClick={toggleDark}>{isDark == false ? <FaMoon/> : <FaSun/>}</div>
}

export default DarkButton

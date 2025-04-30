import { useEffect, useState } from 'react'

import { FaMoon, FaSun } from 'react-icons/fa'

const DarkButton = () => {
    const [isDark, setIsDark] = useState<boolean>(()=>{
        return localStorage.getItem('darkmode') === 'on' ||
        document.documentElement.classList.contains('darkmode')
    })

    const toggleDark = (): void => {
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
  
    return (
        <div 
        className='size-[75px]
        rounded-full
        fixed right-[100px] bottom-[100px]
        bg-primary
        flex justify-center items-center
        transition-all ease-in-out duration-300
        cursor-pointer
        hover:bg-p-hover' 
        onClick={toggleDark}>{isDark == false ? 
            <FaMoon className='fill-p-text text-3xl'/> : 
            <FaSun className='fill-p-text text-3xl'/>
        }
        </div>
    )
}

export default DarkButton

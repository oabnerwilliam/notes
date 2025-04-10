import React from 'react'

const clickOut = (elementRef, action) => {
    const handleClickOutside = (e) => {
        if (elementRef.current && 
            !elementRef.current.contains(e.target)) {
                action()
            }
    }

    document.addEventListener("mousedown", handleClickOutside)
    
    return ()=>{
        document.removeEventListener("mousedown", handleClickOutside)    
    }  
}

export default clickOut

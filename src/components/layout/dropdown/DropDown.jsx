import React from 'react'

import style from './DropDown.module.css'

const DropDown = ({isOpen}) => {
    
  
    return (
        <div className={`${style.dropdown} 
        ${isOpen ? style.open : ''}`}>
        
        </div>
    )
}

export default DropDown

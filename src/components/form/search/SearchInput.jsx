import React from 'react'

import { useRef, useState, useEffect } from 'react'
import style from './SearchInput.module.css'
import { FaSearch } from 'react-icons/fa'
import clickOut from '../../../util/events/clickout/clickOut'

const SearchInput = ({placeholder, handleOnChange}) => {
  const [isOpen, setIsOpen] = useState(false)

  const inputRef = useRef(null)
  const searchRef = useRef(null)

  useEffect(()=>{
    const cleanup = clickOut(searchRef, ()=>{
      setIsOpen(false)
    })

    return cleanup
  }, [])

  const openSearch = (e) => {
    setIsOpen(true)
    inputRef.current.focus()
  }
  
  return (
    <div className={style.search} ref={searchRef}>
        <div className={`${style.overlay} ${isOpen ? style.open : ''}`}>
        <button onClick={openSearch}>
            <FaSearch/>
        </button>
        </div>
        <input type="text" 
        name="search" 
        id="search"
        onChange={handleOnChange}
        className={style.input}
        placeholder={placeholder}
        ref={inputRef}/> 
    </div>
  )
}

export default SearchInput

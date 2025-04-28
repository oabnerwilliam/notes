import React from 'react'

import { useRef, useState, useEffect } from 'react'
import style from './SearchInput.module.css'
import { FaSearch } from 'react-icons/fa'
//import clickOut from '../../../util/events/clickout/clickOut'
import clickOut from "../../../util/events/clickout/clickOut"

type SearchInputProps = {
  placeholder: string,
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({placeholder, handleOnChange}: SearchInputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    const cleanup = clickOut(searchRef, ()=>{
      setIsOpen(false)
    })

    return cleanup
  }, [])

  const openSearch = () => {
    setIsOpen(true)
    inputRef.current?.focus()
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

import React from 'react'

import { useRef, useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
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
    <div 
    className='flex justify-between items-center gap-4 relative'
    ref={searchRef}>
        <div 
        className='absolute
        -left-10
        h-full
        bg-bg
        border-none
        flex items-center justify-center
        rounded-4xl
        transition-[width] ease-in-out duration-300'
        style={{ width: isOpen ? '2.5rem' : 'calc(100% + 2.6em)' }}>
          <button onClick={openSearch}
          className='bg-transparent
          border-none
          flex justify-center items-center
          h-14 w-14
          rounded-full
          absolute right-4
          transition-all
          ease-in-out
          duration-300
          cursor-pointer
          hover:bg-primary
          group'>
              <FaSearch className='group-hover:fill-p-text text-xl fill-secondary transition-all ease-in-out duration-300'/>
          </button>
        </div>
        <input type="text" 
        name="search" 
        id="search"
        onChange={handleOnChange}
        className='p-3
        rounded-4xl
        outline-none
        border border-white
        h-14
        bg-bg
        text-secondary
        focus:border-secondary'
        placeholder={placeholder}
        ref={inputRef}/> 
    </div>
  )
}

export default SearchInput

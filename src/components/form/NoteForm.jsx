import React, { useEffect, useRef, useState } from 'react'

import style from './NoteForm.module.css'

const NoteForm = ({handleSubmit}) => {
  const [note, setNote] = useState({})
  const [isFocused, setIsFocused] = useState(false)

  const formRef = useRef()
  
  useEffect(()=>{
    const handleClickOutside = (e) => {
      if (formRef.current &&
        !formRef.current.contains(e.target) &&
      isFocused) {
          submit()
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [note, isFocused])

  const handleOnChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    })
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const submit = () => {
    if(note.title && note.content) {
      handleSubmit(note)
      setNote({title: "", content: ""})  
    }
  }
  
  return (
    <form className={style.form} onSubmit={(e)=>{e.preventDefault()}} ref={formRef}>
        <input 
        type="text" 
        name="title" 
        id="" 
        className={style.title} 
        placeholder="Minha Nota" 
        onChange={handleOnChange}
        value={note.title || ''}
        onFocus={handleFocus}
        onBlur={handleBlur} 
        required/>
        <textarea 
        name="content" 
        id="" 
        className={style.content} 
        placeholder="Escreva sua nota..." 
        onChange={handleOnChange}
        value={note.content || ''}
        onFocus={handleFocus}
        onBlur={handleBlur}  
        required/>
        {/* <hr/>
        <input type="submit" value="Criar Nota" className={style.submitButton}/> */}
    </form>
  )
}

export default NoteForm

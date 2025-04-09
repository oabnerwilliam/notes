import React, { useEffect, useRef, useState } from 'react'

import style from './NoteForm.module.css'

import { useAuth } from '../../../contexts/AuthContext'

const NoteForm = ({handleSubmit}) => {
  const [note, setNote] = useState({})
  const [isFocused, setIsFocused] = useState(false)

  const formRef = useRef(null)
  const textRef = useRef(null)

  const {user} = useAuth()
  
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

  const autoGrow = (e) => {
    const textarea = textRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.overflowY = "hidden";
      textarea.style.height = `${textarea.scrollHeight}px`

      if (textarea.scrollHeight>300) {
        textarea.style.height = "300px"
        textarea.style.overflowY = "auto";
      }
    }
    setNote({
      "title":note.title,
      "content":e.target.value
    })
  }

  const submit = () => {
    if(note.title && note.content) {
      handleSubmit(note)
      if (user) {
        setNote({title: "", content: ""})   
      }
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
        ref={textRef}
        placeholder="Escreva sua nota..." 
        onChange={handleOnChange}
        value={note.content || ''}
        onInput={autoGrow}
        onFocus={handleFocus}
        onBlur={handleBlur}  
        required/>
        {/* <hr/>
        <input type="submit" value="Criar Nota" className={style.submitButton}/> */}
    </form>
  )
}

export default NoteForm

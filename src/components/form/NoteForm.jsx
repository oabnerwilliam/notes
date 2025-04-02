import React, { useState } from 'react'

import style from './NoteForm.module.css'

const NoteForm = ({handleSubmit}) => {
  const [note, setNote] = useState({})
  
  const handleOnChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    })
  }

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(note)
    setNote({title: "", content: ""})
  }
  
  return (
    <form className={style.form} onSubmit={submit}>
        <input 
        type="text" 
        name="title" 
        id="" 
        className={style.title} 
        placeholder="Título" 
        onChange={handleOnChange}
        value={note.title || ''} 
        required/>
        <textarea 
        name="content" 
        id="" 
        className={style.content} 
        placeholder="Escreva sua nota..." 
        onChange={handleOnChange}
        value={note.content || ''}  
        required/>
        <hr/>
        <input type="submit" value="Criar Nota" className={style.submitButton}/>
    </form>
  )
}

export default NoteForm

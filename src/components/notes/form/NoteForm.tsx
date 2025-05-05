import React, { useEffect, useRef, useState } from 'react'

import { useAuth } from '../../../contexts/AuthContext'
import clickOut from '../../../util/events/clickout/clickOut'

type NoteFormProps = {
  handleSubmit: (note: Note)=>void
}

const NoteForm = ({handleSubmit}: NoteFormProps) => {
  const [note, setNote] = useState<Note>({title: "", content: "", userId: ""})
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)

  const {user} = useAuth() // tipar
  
  useEffect(()=>{
    const cleanup = clickOut(formRef, ()=>{
      if (isFocused) {
        submit()  
      }
    })

    return cleanup
  }, [note, isFocused])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setNote({
      ...note,
      [target.name]: target.value
    })
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.overflowY = "hidden";
      textarea.style.height = `${textarea.scrollHeight}px`;

      if (textarea.scrollHeight > 300) {
        textarea.style.height = "300px";
        textarea.style.overflowY = "auto";
      }
    }
    setNote((prevNote: Note) => ({
      ...prevNote,
      content: e.target.value
    }))
  }

  const submit = (): void => {
    if(note.title && note.content) {
      handleSubmit(note)
      if (user) {
        setNote({title: "", content: "", userId: ""})   
      }
    }
  }
  
  return (
    <form
    className='flex flex-col
    min-h-[200px] h-auto max-h-[500px] w-[600px]
    border border-secondary
    transition-all duration-300 ease-in-out'
    onSubmit={(e)=>{e.preventDefault()}} ref={formRef}>
        <input 
        type="text" 
        name="title" 
        id="title"
        className='outline-none p-3 resize-none
        bg-bg text-secondary
        w-full h-3/10 text-[1.8em] border-none' 
        placeholder="Minha Nota" 
        onChange={handleOnChange}
        value={note.title || ''}
        onFocus={handleFocus}
        onBlur={handleBlur} 
        required/>
        <textarea 
        name="content" 
        id="content"
        className='outline-none p-3 resize-none
        bg-bg text-secondary
        w-full h-7/10 text-[1.2em] border-none' 
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

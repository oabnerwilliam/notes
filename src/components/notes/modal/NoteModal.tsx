import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

import style from './NoteModal.module.css'
import { FaTrash } from 'react-icons/fa'
import clickOut from '../../../util/events/clickout/clickOut'

type NoteModalProps = {
  handleSubmit: (note: Note)=>void,
  handleDelete: ()=>void,
  note: Note,
  toggleEditing: ()=>void
}

const NoteModal = ({handleSubmit, handleDelete, note, toggleEditing}: NoteModalProps) => {
    const [currentNote, setCurrentNote] = useState<Note>(note)
    const [isFocused, setIsFocused] = useState<boolean>(false)
    
    const formRef = useRef<HTMLDivElement>(null) 
    const textRef = useRef<HTMLTextAreaElement>(null)
    
    const handleOnChange = (e: React.ChangeEvent<HTMLElement>) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement
      setCurrentNote({
          ...currentNote,
          [target.name]: target.value
        })
    }

    useEffect(()=>{
        const cleanup = clickOut(formRef, ()=>{
          toggleEditing()
          if(isFocused) {
            handleSubmit(currentNote)
            console.log(currentNote)
          }
        })

        return cleanup
    }, [currentNote, isFocused])

    const handleFocus = (): void => {
        setIsFocused(true)
    }
    
    const handleBlur = (): void => {
        setIsFocused(false)
    }

    const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const textarea = textRef.current
        if (textarea) {
          textarea.style.height = "auto"
          textarea.style.overflowY = "hidden";
          textarea.style.height = `${textarea.scrollHeight}px`
    
          if (textarea.scrollHeight>600) {
            textarea.style.height = "600px"
            textarea.style.overflowY = "auto";
          }
        }
        setCurrentNote((prevNote: Note)=>({
          ...prevNote,
          content: e.target.value
        }))
    }

    return (
        <div
        className={style.overlay}>
            <motion.div
            key={currentNote.id}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.3}}
            exit={{opacity: 0}} 
            className={style.modal} 
            ref={formRef}>
                <input 
                    type="text" 
                    name="title" 
                    id="" 
                    className={style.title} 
                    placeholder="Título" 
                    onChange={handleOnChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={currentNote.title || ''} 
                    required/>
                <textarea 
                    name="content" 
                    id="" 
                    className={style.content} 
                    ref={textRef}
                    placeholder="Escreva sua nota..." 
                    onChange={handleOnChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onInput={autoGrow}
                    value={currentNote.content || ''}  
                    required/>
                <div className={style.actions}>
                    <button 
                    onClick={handleDelete}
                    >
                        <FaTrash/>   
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default NoteModal

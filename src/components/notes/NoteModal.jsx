import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import style from './NoteModal.module.css'
import { FaX } from 'react-icons/fa6'
import { FaTrash } from 'react-icons/fa'

const NoteModal = ({handleSubmit, handleDelete, note, toggleEditing}) => {
    const [currentNote, setCurrentNote] = useState(note)
    const [isFocused, setIsFocused] = useState(false)
    
    const formRef = useRef() 
    const textRef = useRef()
    
    const handleOnChange = (e) => {
        setCurrentNote({
          ...currentNote,
          [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        const handleClickOutside = (e) => {
          if (formRef.current &&
            !formRef.current.contains(e.target)) {
              toggleEditing()
              if (isFocused) {
                handleSubmit(currentNote)
                console.log(currentNote)
              }
          }
        }
        
        document.addEventListener("mousedown", handleClickOutside)
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [currentNote, isFocused])

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
    
          if (textarea.scrollHeight>600) {
            textarea.style.height = "600px"
            textarea.style.overflowY = "auto";
          }
        }
        setCurrentNote({
          [e.target.name]: e.target.value
        })
    }

    return (
        <div
        className={style.overlay}>
            <div
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
            </div>
        </div>
    )
}

export default NoteModal

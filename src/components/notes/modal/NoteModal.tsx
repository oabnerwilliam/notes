import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

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
        className='fixed top-0 left-0 right-0 bottom-0
        flex items-center justify-center'
        style={{ backgroundColor: "hsl(0, 0%, 0%, 0.4)" }}
        >
            <motion.div
            key={currentNote.id}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.3}}
            exit={{opacity: 0}} 
            className='flex flex-col 
            border border-secondary
            p-2 w-[600px] min-h-[200px] h-auto max-h-[600px]
            fixed top-1/2 left-1/2
            transform -translate-x-1/2 -translate-y-9/20
            overflow-hidden
            transition-all duration-300 ease-in-out
            bg-bg z-2000' 
            ref={formRef}>
                <input 
                    type="text" 
                    name="title" 
                    id="" 
                    className='outline-none resize-none
                    bg-bg text-secondary border-none
                    p-2 text-[1.5em] h-1/5
                    whitespace-normal break-all wrap-break-word font-bold' 
                    placeholder="Título" 
                    onChange={handleOnChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={currentNote.title || ''} 
                    required/>
                <textarea 
                    name="content" 
                    id="" 
                    className='outline-none resize-none
                    bg-bg text-secondary border-none
                    p-2 text-[1.2em] min-h-[150px] h-auto
                    whitespace-normal break-all wrap-break-word' 
                    ref={textRef}
                    placeholder="Escreva sua nota..." 
                    onChange={handleOnChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onInput={autoGrow}
                    value={currentNote.content || ''}  
                    required/>
                <div 
                className='w-full h-3/20
                flex justify-center p-2'
                >
                    <button 
                    onClick={handleDelete}
                    className='bg-inherit border-none
                    text-[1.1em] 
                    transition-all duration-300 ease-in-out
                    text-secondary cursor-pointer
                    hover:text-primary'
                    >
                        <FaTrash/>   
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default NoteModal

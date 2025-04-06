import React, { useEffect, useRef, useState } from 'react'

import style from './NoteCard.module.css'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import NoteModal from './NoteModal'
import { AnimatePresence, motion } from 'framer-motion'

const NoteCard = ({note, handleDelete, handleSubmit}) => {
    const [editing, setEditing] = useState(false)
    const [currentNote, setCurrentNote] = useState(note)

    const trashRef = useRef()
    
    const toggleEditing = () => {
        setEditing(!editing)
    }

    const submit = (note) => {
        handleSubmit(note)
        setCurrentNote(note)
        toggleEditing()
    }

    return (
        <>
            <div 
            className={`${style.noteCard} 
            ${editing && style.hide}`} 
            onClick={(e)=>{
                if (!trashRef.current.contains(e.target)) {
                    toggleEditing()    
                }
            }}>
                <div className={style.info}>
                    <h2>{currentNote.title}</h2>
                    <p>{currentNote.content}</p>    
                </div>
                <div className={style.actions}>
                    <button 
                    onClick={handleDelete}
                    ref={trashRef}
                    >
                        <FaTrash/>   
                    </button>
                </div>   
            </div>
            <AnimatePresence>
                {
                    editing && (
                        <motion.div
                        key={currentNote.id}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.3}}
                        exit={{opacity: 0}}
                        style={{ position: 'absolute', top: 0, 
                        left: 0, 
                        width: '100%' }}>
                            <NoteModal handleDelete={handleDelete} 
                            note={note}
                            handleSubmit={submit}
                            toggleEditing={toggleEditing}/>
                        </motion.div>
                        )
                }
            </AnimatePresence>
        </>    
    )
}

export default NoteCard

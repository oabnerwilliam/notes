import React, { useEffect, useRef, useState } from 'react'

import style from './NoteCard.module.css'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import NoteModal from '../modal/NoteModal'
import { AnimatePresence, motion } from 'framer-motion'

type NoteCardProps = {
    note: Note,
    handleDelete: () => void,
    handleSubmit: (note: Note) => void
}

const NoteCard = ({note, handleDelete, handleSubmit}: NoteCardProps) => {
    const [editing, setEditing] = useState<boolean>(false)
    const [currentNote, setCurrentNote] = useState<Note>(note)

    const trashRef = useRef<HTMLButtonElement>(null)
    
    const toggleEditing = (): void => {
        setEditing(!editing)
    }

    const submit = (note: Note): void => {
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
                if (!trashRef.current?.contains(e.target as Node)) {
                    toggleEditing()    
                }
            }}>
                <div className={style.info}>
                    <h2>{currentNote.title}</h2>
                    {/* <p>{currentNote.content.split("\n").map((line, index)=>(
                        <React.Fragment key={index}>
                            {line}
                            <br/>
                        </React.Fragment>
                    ))}</p>     */}
                    <p>{currentNote.content.replace(/\n/g, ' ')}</p>
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

import React, { useEffect, useState } from 'react'

import style from './NoteCard.module.css'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

const NoteCard = ({note, handleDelete, handleSubmit}) => {
    const [editing, setEditing] = useState(false)
    const [currentNote, setCurrentNote] = useState(note)
    
    const toggleEditing = () => {
        setEditing(!editing)
    }  

    const handleOnChange = (e) => {
        setCurrentNote({
          ...currentNote,
          [e.target.name]: e.target.value
        })
    }

    const submit = () => {
        handleSubmit(currentNote)
        toggleEditing()
    }

    return (
        <>
            <div className={style.noteCard} onClick={!editing && toggleEditing}>
            {
                !editing ? (
                    <>
                        <h2>{currentNote.title}</h2>
                        <p>{currentNote.content}</p>   
                    </>
                ) : (
                    <>
                        <input 
                            type="text" 
                            name="title" 
                            id="" 
                            className={style.title} 
                            placeholder="Título" 
                            onChange={handleOnChange}
                            value={currentNote.title || ''} 
                            required/>
                        <textarea 
                            name="content" 
                            id="" 
                            className={style.content} 
                            placeholder="Escreva sua nota..." 
                            onChange={handleOnChange}
                            value={currentNote.content || ''}  
                            required/>
                        <hr/>
                        <button className={style.submitButton}
                        onClick={submit}>Salvar Edição</button>
                        <div className={style.actions}>
                            <button onClick={toggleEditing}>
                                <FaX/>   
                            </button>
                            <button onClick={handleDelete}>
                                <FaTrash/>   
                            </button>
                        </div>
                    </>
                )
            }
            </div>
        </>    
    )
}

export default NoteCard

import React, { useEffect, useState } from 'react'

import style from './NoteCard.module.css'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'

const NoteCard = ({note, handleDelete, handleSubmit}) => {
    const [editing, setEditing] = useState(false)
    const [currentNote, setCurrentNote] = useState(note)
    
    const editNote = () => {
        setEditing(true)
    }

    const handleOnChange = (e) => {
        setCurrentNote({
          ...currentNote,
          [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(currentNote)
        setEditing(false)
    }

    return (
        <>
            {
                !editing ? (
                    <div className={style.noteCard} 
                    key={currentNote.id}>
                        <h2>{currentNote.title}</h2>
                        <p>{currentNote.content}</p>
                        <div className={style.actions}>
                            <button onClick={editNote}>
                                <FaPencilAlt/>    
                            </button>
                            <button onClick={handleDelete}>
                                <FaTrash/>   
                            </button>
                        </div>
                    </div>
                ) : (
                    <form className={style.noteCard} onSubmit={submit}>
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
                        <input type="submit" 
                        value="Editar Nota" 
                        className={style.submitButton}/>
                        <div className={style.actions}>
                            <button onClick={editNote}>
                                <FaPencilAlt/>    
                            </button>
                            <button onClick={handleDelete}>
                                <FaTrash/>   
                            </button>
                        </div>
                    </form>
                )
            }
            
        </>    
    )
}

export default NoteCard

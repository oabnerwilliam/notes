import React from 'react'
import { useNoteList } from './useNoteList'
import NoteCard from '../card/NoteCard'

export const NoteList = ({ 
    filteredNotes, 
    setNotes 
}: {
    filteredNotes: Note[],
    setNotes: (notes: Note[]) => void    
}) => {
    const { deleteNote, editNote } = useNoteList({ setNotes })

    return (
        <div 
        className='w-full
        grid grid-cols-3 gap-6'
        >
        {
            filteredNotes.map((note)=>(
                <NoteCard 
                    note={note}
                    key={note.id}
                    handleDelete={()=>deleteNote(note)}
                    handleSubmit={editNote}
                />
            ))  
        }
        </div>
    )
}
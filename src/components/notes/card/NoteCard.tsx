import { useRef, useState } from 'react'

import { FaTrash } from 'react-icons/fa'
import NoteModal from '../modal/NoteModal'
import { AnimatePresence, clamp, motion } from 'framer-motion'

type NoteCardProps = {
    note: Note,
    handleDelete: (note: Note) => void,
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
            className={`group flex flex-col justify-between
            border border-secondary p-2 pb-4 min-h-[200px]
            h-auto overflow-hidden transition-all duration-300 ease-in-out text-secondary min-w-[250px] hover:bg-bg-hover cursor-pointer w-full
            ${editing ? "opacity-0" : ""}`}
            onClick={(e)=>{
                if (!trashRef.current?.contains(e.target as Node)) {
                    toggleEditing()    
                }
            }}>
                <div 
                className='flex flex-col justify-between'
                >
                    <h2
                    className='p-2'
                    >{currentNote.title}</h2>
                    <p
                    className='text-xl line-clamp-9 whitespace-normal
                    p-2'
                    style={{ lineClamp: 9, textOverflow: "ellipsis" }}
                    >{currentNote.content.replace(/\n/g, ' ')}</p>
                </div>
                <div 
                className='w-full flex justify-center p-2
                opacity-0 transition-all ease-in-out duration-300 group-hover:opacity-100'
                >
                    <button 
                    onClick={()=>handleDelete(note)}
                    ref={trashRef}
                    className='bg-inherit border-none text-lg
                    transition-all duration-300 ease-in-out
                    text-secondary cursor-pointer hover:text-primary'
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

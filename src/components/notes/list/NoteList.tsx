import NoteCard from '../card/NoteCard'

export const NoteList = ({ 
    list,
    deleteNote,
    editNote
}: {
    list: Note[],
    deleteNote: (note: Note) => void,
    editNote: (note: Note) => void
}) => {
    return (
        <div 
        className='w-full
        grid grid-cols-3 gap-6'
        >
        {
            list.map((note)=>(
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
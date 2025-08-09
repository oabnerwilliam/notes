import { useEffect, useState } from 'react'
import { post } from '../../../util/requests/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearch } from '../../../hooks/search/useSearch'
import { useAuth } from '../../../contexts/authContext/AuthContext'

const useMyNotes = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([])

    const { user } = useAuth()

    const queryClient = useQueryClient()


    const createNoteMutation = useMutation({
        mutationFn: async ({ note }: { note: Note }) => await post('http://localhost:5000/notes/', note),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] })
    })


    const createNote = async (note: Note): Promise<void> => {
        note = {
            ...note,
            ["userId"]: user.id
        }
        
        createNoteMutation.mutate({ note })
    }


    const { searchItem, filtered } = useSearch(notes)

    useEffect(()=>{
        setFilteredNotes(filtered)
    }, [filtered])
    

    return {
        filteredNotes,
        setNotes,
        createNote,
        searchItem
    }
}

export default useMyNotes

import { useEffect, useState } from 'react'
import { get, post } from '../../../util/requests/api'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useSearch } from '../../../hooks/search/useSearch'
import { useAuth } from '../../../contexts/authContext/AuthContext'
import { userFilter } from '../../../util/filters/userfilter/userFilter'

const useMyNotes = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([])

    const { user } = useAuth()

    const queryClient = useQueryClient()


    const { data } = useSuspenseQuery<Note[]>({
        queryKey: ['notes'],
        queryFn: async () => await get("http://localhost:5000/notes"),
    })

    useEffect(()=>{
        if (data && user) {
            setNotes(userFilter(data, user).slice().reverse())
        }
    }, [data, user])


    const createNoteMutation = useMutation({
        mutationFn: async ({ note }: { note: Note }) => await post('http://localhost:5000/notes/', note),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] })
    })

    const editNoteMutation = useMutation({
        mutationFn: async ({ note }: { note: Note }) => await put(`http://localhost:5000/notes/${note.id}`, note),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] })
    })

    const deleteNoteMutation = useMutation({
        mutationFn: async ({ note }: { note: Note }) => await remove(`http://localhost:5000/notes/${note.id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] })
    })

    const createNote = async (note: Note): Promise<void> => {
        note = {
            ...note,
            ["userId"]: user.id
        }
        
        createNoteMutation.mutate({ note })
    }

    const editNote = async (note: Note): Promise<void> => {
        editNoteMutation.mutate({ note })
    }

    const deleteNote = async (note: Note): Promise<void> => {
        deleteNoteMutation.mutate({ note })
    }


    const { searchItem, filtered } = useSearch(notes)

    useEffect(()=>{
        setFilteredNotes(filtered)
    }, [filtered])
    

    return {
        filteredNotes,
        createNote,
        editNote,
        deleteNote,
        searchItem
    }
}

export default useMyNotes

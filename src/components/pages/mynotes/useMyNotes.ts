import { useMemo } from 'react'
import { get, post, put, remove } from '../../../util/requests/api'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useSearch } from '../../../hooks/search/useSearch'
import { useAuth } from '../../../contexts/authContext/AuthContext'
import { userFilter } from '../../../util/filters/userfilter/userFilter'

const useMyNotes = () => {
    const { user } = useAuth()

    const queryClient = useQueryClient()


    const { data } = useSuspenseQuery<Note[]>({
        queryKey: ['notes'],
        queryFn: async () => await get("http://localhost:5000/notes"),
    })
    
    const notes = useMemo(() => user && userFilter(data, user).slice().reverse(), [data]) ?? []
    
    const { searchItem, filtered } = useSearch(notes)
    

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


    return {
        filteredNotes: filtered,
        createNote,
        editNote,
        deleteNote,
        searchItem
    }
}

export default useMyNotes

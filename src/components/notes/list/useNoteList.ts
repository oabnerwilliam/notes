import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { userFilter } from '../../../util/filters/userfilter/userFilter'
import { get, put, remove } from '../../../util/requests/api'
import { useAuth } from '../../../contexts/authContext/AuthContext'

export const useNoteList = ({ setNotes }: { setNotes: (notes: Note[]) => void }) => {
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


    const editNoteMutation = useMutation({
        mutationFn: async ({ note }: { note: Note }) => await put(`http://localhost:5000/notes/${note.id}`, note),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] })
    })

    const deleteNoteMutation = useMutation({
        mutationFn: async ({ note }: { note: Note }) => await remove(`http://localhost:5000/notes/${note.id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] })
    })


    const editNote = async (note: Note): Promise<void> => {
        editNoteMutation.mutate({ note })
    }

    const deleteNote = async (note: Note): Promise<void> => {
        deleteNoteMutation.mutate({ note })
    }


    return {
        editNote,
        deleteNote
    }
}
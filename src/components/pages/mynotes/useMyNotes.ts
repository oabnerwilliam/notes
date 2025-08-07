import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/authContext/AuthContext'
import { get } from '../../../util/requests/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userFilter } from '../../../util/filters/userfilter/userFilter'
import createItem from '../../../util/actions/createItem'
import editItem from '../../../util/actions/editItem'
import deleteItem from '../../../util/actions/deleteItem'
import { useSearch } from '../../../hooks/search/useSearch'

const useMyNotes = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
    const { user } = useAuth()

    const queryClient = useQueryClient()

    const { data, isLoading: loadingNotes } = useQuery<Note[]>({
        queryKey: ['notes'],
        queryFn: async () => {
            return await get("http://localhost:5000/notes")
        }
    })

    useEffect(()=>{
        if (data && user) {
            setNotes(userFilter(data, user).slice().reverse())
        }
    }, [data, user])

    const createNote = async (note: Note): Promise<void> => {
        note = {
            ...note,
            ["userId"]: user.id
        }
        
        useMutation({
            mutationFn: (note: Note) => createItem("http://localhost:5000/notes", note, notes),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['notes'] })
            }
        }).mutate(note)
    }

    const editNote = async (note: Note): Promise<void> => {
        useMutation({
            mutationFn: (note: Note) => editItem(`http://localhost:5000/notes/${note.id}`, note, notes),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['notes'] })
            }
        }).mutate(note)
    }

    const deleteNote = async (note: Note): Promise<void> => {
        useMutation({
            mutationFn: (note: Note) => deleteItem(`http://localhost:5000/notes/${note.id}`, note, notes),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['notes'] })
            }
        }).mutate(note)
    }

    const { searchItem } = useSearch(notes, setFilteredNotes)

    return {
        filteredNotes,
        loadingNotes,
        createNote,
        editNote,
        deleteNote,
        searchItem
    }
}

export default useMyNotes

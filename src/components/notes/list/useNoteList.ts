import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { userFilter } from '../../../util/filters/userfilter/userFilter'
import { get } from '../../../util/requests/api'
import { useAuth } from '../../../contexts/authContext/AuthContext'

export const useNoteList = ({ setNotes }: { setNotes: (notes: Note[]) => void }) => {
    const { user } = useAuth()

    const { data } = useSuspenseQuery<Note[]>({
        queryKey: ['notes'],
        queryFn: async () => await get("http://localhost:5000/notes"),
    })

    useEffect(()=>{
        if (data && user) {
            setNotes(userFilter(data, user).slice().reverse())
        }
    }, [data, user])
}
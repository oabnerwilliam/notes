import { useEffect, useState } from 'react'

import NoteForm from '../../notes/form/NoteForm'
import NoteCard from '../../notes/card/NoteCard'
import SearchInput from '../../form/search/SearchInput'

import Loader from '../../layout/loader/Loader'
import LinkButton from '../../layout/linkbutton/LinkButton'
import Message from '../../layout/message/Message'

import { useAuth } from '../../../contexts/AuthContext'
import { useSearch } from '../../../hooks/search/useSearch'

import {get} from '../../../util/requests/api'

import userFilter from '../../../util/filters/userfilter/userFilter'
import createItem from '../../../util/actions/createItem'
import editItem from '../../../util/actions/editItem'
import deleteItem from '../../../util/actions/deleteItem'

const MyNotes = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
  const [searchFiltered, setSearchFiltered] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [message, setMessage] = useState<string>("")

  const {user} = useAuth() // tipar

  const {searchItem} = useSearch(filteredNotes, setSearchFiltered) // tipar
  
  useEffect(() => {
    const getNotes = async (): Promise<void> => {
      if (user) {
        const list: Note[] = await get("http://localhost:5000/notes")
        setNotes(list)
      }
    }
    getNotes()
  }, [user])

  useEffect(()=>{
    if (notes && user) {
        setFilteredNotes(userFilter(notes, user).slice().reverse())
    }
  }, [notes, user])

  useEffect(()=>{
    setIsLoading(true)
  }, [user])

  useEffect(()=>{
    if (isLoading) {
      const timer: ReturnType<typeof setTimeout> = setTimeout(()=>{
        setSearchFiltered(filteredNotes)
        setIsLoading(false)
      }, 1000)
      return ()=>clearTimeout(timer)  
    } else {
      setSearchFiltered(filteredNotes)
    }
  }, [filteredNotes, user])

  useEffect(()=>{
    console.log(searchFiltered)
  }, [searchFiltered])

  const createNote = async (note: Note): Promise<void> => {
    if (user) {
      note = {
        ...note,
        ["userId"]: user.id
      }

      const {newList: newNotes} = await createItem("http://localhost:5000/notes", note, notes)
      setNotes(newNotes)

      setIsLoading(false)
    } else {
      setMessage("Você não pode criar notas sem estar conectado.")
      setTimeout(()=>{
        setMessage("")
      }, 3000)
    }
  }

  const editNote = async (note: Note): Promise<void> => {
    if (user) {
      const {newList: newNotes} = await editItem(`http://localhost:5000/notes/${note.id}`, note, notes)

      setNotes(newNotes)
      
      console.log("Nota editada com sucesso!")
      setIsLoading(false)
    }
  }

  const deleteNote = async (note: Note): Promise<void> => {
    if (user) {
      const {newList: newNotes} = await deleteItem(`http://localhost:5000/notes/${note.id}`, note, notes)

      setNotes(newNotes)

      console.log("Nota excluída com sucesso!")
      setIsLoading(false)
    }
  }

  return(
    <div 
    className='flex flex-col items-center gap-8
    m-12 w-full'
    >
      {
        isLoading ? (
          <Loader/>
        ) : (
          <>
            {
              message && (
                <Message msg={message}
                type="error"/>    
              )
            }
            <div 
            className='flex justify-between w-[600px]'
            >
              <h1
              className='bg-primary text-p-text p-[.3em]'
              >Minhas Anotações</h1>
              {
                searchFiltered && searchFiltered.length>0 && (
                  <SearchInput
                  handleOnChange={searchItem}
                  placeholder="Pesquisar nota"
                  />
                )
              }
            </div>
            <div 
            >
              <NoteForm handleSubmit={createNote}/>
            </div>
            {
              user ? (
                <div 
                className='w-full
                grid grid-cols-3 gap-6'
                >
                  {
                    searchFiltered.map((note)=>(
                      <NoteCard note={note}
                      key={note.id}
                      handleDelete={()=>deleteNote(note)}
                      handleSubmit={editNote}
                      />
                    ))  
                  }
                </div>
              ) : (
                <>
                  <h3 className='text-secondary'>Você ainda não está conectado.</h3>
                  <LinkButton color="green"
                  to="/login"
                  text="Entrar"/>
                  <p className='text-secondary'>ou</p>
                  <LinkButton color="black"
                  to="/signup"
                  text="Criar Conta"/>  
                </>
              )
            }
            
          </>
        )
      }
      
    </div>
  )
}

export default MyNotes

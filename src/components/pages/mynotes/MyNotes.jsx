import React, { useEffect, useState } from 'react'

import style from './MyNotes.module.css'

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
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [searchFiltered, setSearchFiltered] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState("")

  const {user} = useAuth()

  const {searchItem} = useSearch(filteredNotes, setSearchFiltered)
  
  useEffect(() => {
    const getNotes = async () => {
      if (user) {
        const list = await get("http://localhost:5000/notes")
        setNotes(list)
      }
    }
    getNotes()
  }, [user])

  useEffect(()=>{
    if (user) {
      setFilteredNotes(userFilter(notes, user).slice().reverse())  
    }
  }, [notes, user])

  useEffect(()=>{
    setIsLoading(true)
  }, [user])

  useEffect(()=>{
    if (isLoading) {
      const timer = setTimeout(()=>{
        setSearchFiltered(filteredNotes)
        setIsLoading(false)
      }, 1000)
      return ()=>clearTimeout(timer)  
    } else {
      setSearchFiltered(filteredNotes)
    }
  }, [filteredNotes, user])

  const createNote = async (note) => {
    if (user) {
      note = {
        ...note,
        ["userId"]: user.id
      }

      const newNotes = await createItem("http://localhost:5000/notes", note, notes)
      setNotes(newNotes)

      setIsLoading(false)
    } else {
      setMessage("Você não pode criar notas sem estar conectado.")
      setTimeout(()=>{
        setMessage("")
      }, 3000)
    }
  }

  const editNote = async (note) => {
    if (user) {
      const newNotes = await editItem(`http://localhost:5000/notes/${note.id}`, note, notes)

      setNotes(newNotes)
      
      console.log("Nota editada com sucesso!")
      setIsLoading(false)
    }
  }

  const deleteNote = async (note) => {
    if (user) {
      const newNotes = await deleteItem(`http://localhost:5000/notes/${note.id}`, note, notes)

      setNotes(newNotes)

      console.log("Nota excluída com sucesso!")
      setIsLoading(false)
    }
  }

  return(
    <div className={style.notes}>
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
            <div className={style.header}>
              <h1>Minhas Anotações</h1>
              {
                searchFiltered && searchFiltered.length>0 && (
                  <SearchInput
                  handleOnChange={searchItem}
                  placeholder="Pesquisar nota"
                  />
                )
              }
            </div>
            <div className={style.noteForm}>
              <NoteForm handleSubmit={createNote}/>
            </div>
            {
              user ? (
                <div className={style.noteList}>
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
                  <h3>Você ainda não está conectado.</h3>
                  <LinkButton color="green"
                  to="/login"
                  text="Entrar"/>
                  <p>ou</p>
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

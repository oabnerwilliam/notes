import React, { useEffect, useState } from 'react'

import style from './MyNotes.module.css'

import NoteForm from '../form/NoteForm'
import NoteCard from '../notes/NoteCard'
import SearchInput from '../form/search/input/SearchInput'

import { useAuth } from '../../contexts/AuthContext'
import { useSearch } from '../../hooks/search/useSearch'

import Loader from '../layout/loader/Loader'
import LinkButton from '../layout/linkbutton/LinkButton'
import Message from '../layout/message/Message'

import {get, post, put, remove} from '../../util/requests/api'

const MyNotes = () => {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [searchFiltered, setSearchFiltered] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState("")

  const {user} = useAuth()

  const {searchItem} = useSearch(filteredNotes, setSearchFiltered)
  
  const handleSetNotes = (item) => {
    setNotes(item)
  }

  const handleSetFilteredNotes = (item) => {
    setFilteredNotes(item)
  }
  
  useEffect(() => {
    const getNotes = async () => {
      if (user) {
        const list = await get("http://localhost:5000/notes")
        handleSetNotes(list)
      }
    }
    getNotes()
  }, [user])

  useEffect(()=>{
    if (user) {
      const firstFilter = notes.filter((note) => {
        return note.userId===user.id
      }).slice().reverse()
      handleSetFilteredNotes(firstFilter)
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
      const data = await post("http://localhost:5000/notes", note)
      setNotes((notes)=>[
        ...notes,
        data
      ])
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
      const data = await put(`http://localhost:5000/notes/${note.id}`, note)
      console.log("Projeto editado com sucesso!")
      setNotes((prevNotes)=>
        prevNotes.map((note)=>(note.id === data.id ? data : note))
      )
      setIsLoading(false)
    }
  }

  const deleteNote = async (id) => {
    if (user) {
      const data = await remove(`http://localhost:5000/notes/${id}`)
      console.log("Projeto excluido com sucesso!", data)
      setNotes((notes)=>notes.filter((note)=>note.id!==id))
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
                      handleDelete={()=>deleteNote(note.id)}
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

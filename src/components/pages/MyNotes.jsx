import React, { useEffect, useState } from 'react'

import style from './MyNotes.module.css'

import NoteForm from '../form/NoteForm'
import NoteCard from '../notes/NoteCard'
import SearchInput from '../form/search/input/SearchInput'

import { useAuth } from '../../contexts/AuthContext'
import useSearch from '../../hooks/search/useSearch'
import Loader from '../layout/Loader'
import getList from '../util/getList'

const MyNotes = () => {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [searchFiltered, setSearchFiltered] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const {user} = useAuth()

  const {searchItem} = useSearch(filteredNotes, setSearchFiltered)

  const handleSetNotes = (item) => {
    setNotes(item)
  }

  const handleSetFilteredNotes = (item) => {
    setFilteredNotes(item)
  }
  
  useEffect(()=>{
    getList("notes", (list)=>{
      handleSetNotes(list)
    })
  }, [])

  useEffect(()=>{
    if (user) {
      const firstFilter = notes.filter((note) => {
        return note.userId===user.id
      }).slice().reverse()
      handleSetFilteredNotes(firstFilter)
    }
  }, [notes, user])

    const createNote = (note) => {
      note = {
        ...note,
        ["userId"]: user.id
      }
      
      fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
      })
      .then((resp)=>resp.json())
      .then((data)=>{
        console.log(data)
        setNotes((notes) => [...notes, data])
        setIsLoading(false)
      })
      .catch((err)=>console.log(err))
    }

  const editNote = (note) => {
    fetch(`http://localhost:5000/notes/${note.id}`, {
      method: "PUT",
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(note)
    })
    .then((resp)=>resp.json())
    .then((data)=>{
      console.log("Projeto editado com sucesso!")
      setNotes((prevNotes) => 
        prevNotes.map((note) => (note.id === data.id ? data : note))
      )
      setIsLoading(false)
    })
    .catch((err)=>console.log(err))
  }

  const deleteNote = (id) => {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((resp)=>resp.json())
    .then((data)=>{
      console.log("Projeto excluido com sucesso!", data)
      setNotes((notes)=>notes.filter((note)=>note.id!==id))
      setIsLoading(false)
    })
    .catch((err)=>console.log(err))
  }

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
  }, [filteredNotes])

  return(
    <div className={style.notes}>
      {
        isLoading ? (
          <Loader/>
        ) : (
          <>
            <div className={style.header}>
              <h1>Minhas Anotações</h1>
              <SearchInput
              handleOnChange={searchItem}
              placeholder="Pesquisar nota"
              />
            </div>
            <div className={style.noteForm}>
              <NoteForm handleSubmit={createNote}/>
            </div>
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
          </>
        )
      }
      
    </div>
  )
}

export default MyNotes

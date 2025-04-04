import React, { useEffect, useState } from 'react'

import style from './MyNotes.module.css'

import NoteForm from '../form/NoteForm'
import NoteCard from '../notes/NoteCard'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'

const MyNotes = () => {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  //const [currentUser, setCurrentUser] = useState({})

  const {user} = useAuth()

  const handleSetNotes = (item) => {
    setNotes(item)
  }

  const handleSetFilteredNotes = (item) => {
    setFilteredNotes(item)
  }
  
  useEffect(()=>{
    fetch("http://localhost:5000/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((resp)=>resp.json())
    .then((data)=>{
      handleSetNotes(data)
    })
    .catch((err)=>console.log(err))
  }, [])

  useEffect(()=>{
    if (user) {
      handleSetFilteredNotes(notes.filter((note)=> note.userId===user.id
    ).slice().reverse())
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
    })
    .catch((err)=>console.log(err))
  }

  return(
    <div className={style.notes}>
      <h1>Minhas Anotações</h1>
      <div className={style.noteForm}>
        <NoteForm handleSubmit={createNote}/>
      </div>
      <div className={style.noteList}>
        {
          filteredNotes.map((note)=>(
            <NoteCard note={note} 
            key={note.id} 
            handleDelete={()=>deleteNote(note.id)} 
            handleSubmit={editNote}/>
          ))
        }  
      </div>
      
    </div>
  )
}

export default MyNotes

import NoteForm from '../../notes/form/NoteForm'
import NoteCard from '../../notes/card/NoteCard'
import SearchInput from '../../form/search/SearchInput'

import LinkButton from '../../layout/linkbutton/LinkButton'

import { useAuth } from '../../../contexts/authContext/AuthContext'

import useMyNotes from './useMyNotes'
import Loader from '../../layout/loader/Loader'

const MyNotes = () => {
  const { user } = useAuth()

  const {
    filteredNotes,
    loadingNotes,
    createNote,
    editNote,
    deleteNote,
    searchItem
  } = useMyNotes()

  return(
    <div 
    className='flex flex-col items-center gap-8
    m-12 w-full'
    >
      {
        user ? (
          <>
            <div 
            className='flex justify-between w-[600px]'
            >
              <h1
              className='bg-primary text-p-text p-[.3em]'
              >Minhas Anotações</h1>
              <SearchInput
                handleOnChange={searchItem}
                placeholder="Pesquisar nota"
              />
            </div>
            <div 
            >
              <NoteForm handleSubmit={createNote}/>
            </div>
            {
              !loadingNotes ? (
                <div 
                className='w-full
                grid grid-cols-3 gap-6'
                >
                  {
                    filteredNotes.map((note)=>(
                      <NoteCard note={note}
                      key={note.id}
                      handleDelete={()=>deleteNote(note)}
                      handleSubmit={editNote}
                      />
                    ))  
                  }
                </div>
              ) : (
                <Loader/>
              )
            }
          </>
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
    </div>
  )
}

export default MyNotes

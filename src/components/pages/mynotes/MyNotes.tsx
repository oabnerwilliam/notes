import NoteForm from '../../notes/form/NoteForm'
import SearchInput from '../../form/search/SearchInput'

import LinkButton from '../../layout/linkbutton/LinkButton'

import { useMyNotes } from './useMyNotes'
import Loader from '../../layout/loader/Loader'
import { Suspense } from 'react'
import { NoteList } from '../../notes/list/NoteList'

const MyNotes = () => {
  const {
    filteredNotes,
    setNotes,
    createNote,
    editNote,
    deleteNote,
    searchItem,
    user
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
            
            <Suspense fallback={<Loader/>}>
              <NoteList
                filteredNotes={filteredNotes}
                setNotes={setNotes}
                editNote={editNote}
                deleteNote={deleteNote}
              />
            </Suspense>
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

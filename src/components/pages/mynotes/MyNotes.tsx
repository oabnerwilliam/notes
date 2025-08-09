import NoteForm from '../../notes/form/NoteForm'
import SearchInput from '../../form/search/SearchInput'

import LinkButton from '../../layout/linkbutton/LinkButton'

import { useAuth } from '../../../contexts/authContext/AuthContext'

import useMyNotes from './useMyNotes'
import { NoteList } from '../../notes/list/NoteList'

const MyNotes = () => {
  const { user } = useAuth()

  const {
    filteredNotes,
    createNote,
    editNote,
    deleteNote,
    searchItem,
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
            
            <NoteList
              list={filteredNotes}
              deleteNote={deleteNote}
              editNote={editNote}
            />
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

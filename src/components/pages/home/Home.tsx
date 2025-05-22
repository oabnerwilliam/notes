import notes from '../../../img/notes.svg'
import LinkButton from '../../layout/linkbutton/LinkButton'

import { useAuth } from '../../../contexts/AuthContext'

const Home = () => {
  const {user, loggedAccounts} = useAuth()

  return (
    <>
      <div 
      className='m-16
      flex flex-col items-center justify-between gap-6
      size-full'
      >
        {
          user ? (
            <>
              <h1
              className='text-[3.5em] mb-0
              text-secondary'
              >Olá, <span className='bg-primary text-p-text p-[.2em]'>{user.firstName}</span></h1>
              <p
              className='text-s-hover text-[1.3em]'
              >Bem-vindo de volta ao seu bloco de notas virtual!</p>
              <LinkButton to="/mynotes" text="Minhas Notas" color="color"/>
            </>
          ) : (
            <>
              <h1
              className='text-[3.5em] mb-0
              text-secondary'
              ><span className='bg-primary text-p-text p-[.2em]'>MyNotes</span></h1>
              <p
              className='text-s-hover text-[1.3em]'
              >O seu bloco de notas virtual.</p>
              <div 
              className='flex gap-4'
              >
                <LinkButton to={loggedAccounts && loggedAccounts.length > 0 ? "/accounts" : "/login"} text="Entrar" color="color"/>
                <LinkButton to="/signup" text="Criar Conta" color="page"/>
              </div>
            </>
          )
        }
        <img src={notes} alt="Notas" className='mt-8 w-[300px]'/>
      </div>
    </>
  )
}

export default Home

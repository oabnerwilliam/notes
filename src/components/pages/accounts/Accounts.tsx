import { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/authContext/AuthContext'
import { useNavigate } from 'react-router-dom'

import LinkButton from '../../layout/linkbutton/LinkButton'

const Accounts = () => {
    const [accounts, setAccounts] = useState<User[]>([])

    const navigate = useNavigate()

    useEffect(()=>{
        const localAccounts: string | null = localStorage.getItem("loggedAccounts")

        if (localAccounts) {
            setAccounts(JSON.parse(localAccounts))
        }
    }, [])

    const {login} = useAuth()

    const handleOnClick = (account: User): () => void => {
        return () => {
            login(account)
            navigate('/mynotes')   
        }
    }

    return (
        <div 
        className='flex flex-col items-center gap-8
        w-auto mx-auto mt-20'
        >
            <h1
            className='bg-primary text-p-text p-2'
            >Minhas Contas</h1>
            {
                accounts && (
                    <div 
                    className='flex flex-col gap-4 w-full'
                    >
                    {
                    accounts.map((account)=>(
                        <button 
                        className='flex flex-col items-center justify-center w-full gap-2
                        bg-bg text-secondary
                        border border-secondary p-8
                        rounded-4xl 
                        transition-[background-color] duration-300 ease-in-out cursor-pointer hover:bg-bg-hover'
                        onClick={handleOnClick(account)}
                        key={account.id}>
                            <h2>{`${account.firstName} ${account.lastName}`}</h2>
                            <p>{account.email}</p>
                        </button>
                    ))    
                    }
                    </div>
                )
            }
            <LinkButton
            to="/login"
            text="Adicionar Conta"
            color="page"/>
        </div>
    )
}

export default Accounts

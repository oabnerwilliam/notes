import { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import style from  './Accounts.module.css'
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
        <div className={style.accountsContainer}>
            <h1>Minhas Contas</h1>
            <div className={style.accountList}>
                {
                    accounts && (
                        <div className={style.accountList}>
                        {
                        accounts.map((account)=>(
                            <button className={style.account}
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
            </div>
            <LinkButton
            to="/login"
            text="Adicionar Conta"
            color="page"/>
        </div>
    )
}

export default Accounts

import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import style from  './Accounts.module.css'
import { useNavigate } from 'react-router-dom'

import LinkButton from '../layout/linkbutton/LinkButton'

const Accounts = () => {
    const [accounts, setAccounts] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        setAccounts(JSON.parse(localStorage.getItem("loggedAccounts")))
    }, [])

    const {login} = useAuth()

    const handleOnClick = (account) => {
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
                        accounts.map((account)=>(
                            <button className={style.account}
                            onClick={handleOnClick(account)}
                            key={account.id}>
                                <h2>{account.firstName}</h2>
                                <p>{account.email}</p>
                            </button>
                        ))
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

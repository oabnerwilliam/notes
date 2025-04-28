import React, {useState, useEffect, useRef} from 'react'

import style from './DropDown.module.css'

import { useAuth } from '../../../contexts/AuthContext'
import LinkButton from '../linkbutton/LinkButton'
import clickOut from '../../../util/events/clickout/clickOut'

type DropDownProps = {
    isOpen: boolean,
    setIsOpen: (arg: boolean)=>void
}

const DropDown = ({isOpen, setIsOpen}: DropDownProps) => {
    const [accounts, setAccounts] = useState<User[]>([])
    
    const menuRef = useRef<HTMLDivElement>(null)
    
    const {user, login} = useAuth()

    useEffect(()=>{
        let accounts = localStorage.getItem("loggedAccounts")
        const loggedAccounts: User[] = accounts ? JSON.parse(accounts) : []

        setAccounts(loggedAccounts)

        const cleanup = clickOut(menuRef, ()=>{
            setIsOpen(false)
        })

        return cleanup
    }, [isOpen, user])

    const handleOnClick = (account: User) => {
        return () => {
            if (user && account.email!==user.email) {
                login(account)
            }
            setIsOpen(false) 
        }
    }
    
    return (
        <div className={`${style.dropdown} 
        ${isOpen ? style.open : ''}`}
        ref={menuRef}>
            {
                user && (
                    <div className={style.content}>
                        <h1>Minhas Contas</h1>
                        <button className={`${style.account}
                        ${style.current}`}
                        onClick={handleOnClick(user)}
                        key={user.id}>
                            <h2>{`${user.firstName} ${user.lastName}`}</h2>
                            <p>{user.email}</p>
                        </button>
                        {
                            accounts.slice(0, 3).filter((acc)=>acc.email!==user.email).map((account)=>(
                                <button className={`${style.account}
                                ${account.email===user.email?style.current:''}`}
                                onClick={handleOnClick(account)}
                                key={account.id}>
                                    <h2>{`${account.firstName} ${account.lastName}`}</h2>
                                    <p>{account.email}</p>
                                </button>
                            ))
                        }
                        {accounts.length>3 && (
                            <LinkButton
                            to="/accounts"
                            text="Ver todas"
                            color="color"
                            handleOnClick={()=>setIsOpen(false)}/>
                        )}
                        <LinkButton
                        to="/login"
                        text="Adicionar Conta"
                        color="page"
                        handleOnClick={()=>setIsOpen(false)}/>
                    </div>
                )
            }
            
        </div>
    )
}

export default DropDown

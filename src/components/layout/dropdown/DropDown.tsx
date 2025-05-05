import React, {useState, useEffect, useRef} from 'react'

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

    const handleOnClick = (account: User): ()=>void => {
        return () => {
            if (user) {
                if (account.email!==user.email) {
                    login(account)
                }
            } else {
                login(account)
            }
            setIsOpen(false) 
        }
    }
    
    const accountStyle: string = "bg-bg text-secondary border border-secondary rounded-2xl p-4 w-full flex flex-col items-center gap-1 transition-[background-color] duration-300 ease-in-out cursor-pointer hover:bg-bg-hover overflow-hidden"

    const currentStyle: string = "bg-primary !text-p-text cursor-pointer hover:bg-p-hover"

    return (
        <div 
        className={`absolute top-2/1 left-1/2
        transform -translate-x-1/2
        bg-bg
        rounded-2xl
        w-[350px] h-auto opacity-0
        transition-all duration-300 ease-in-out
        text-secondary p-8
        shadow-sm shadow-black -z-1 invisible
        ${isOpen ? "visible opacity-100 border border-secondary" : ""}`}
        ref={menuRef}>
            <div 
            className='transtion-all ease-in-out duration-200
            gap-4 w-full
            flex flex-col items-center'
            >
                <h1
                className='bg-primary text-p-text
                p-2 text-3xl'>Minhas Contas</h1>
                {
                    user && (
                        <button className={`${accountStyle}
                        ${currentStyle}`}
                        onClick={handleOnClick(user)}
                        key={user.id}>
                            <h2>{`${user.firstName} ${user.lastName}`}</h2>
                            <p>{user.email}</p>
                        </button>
                    )
                }
                {
                    user ? (
                        accounts.slice(0, 3).filter((acc)=>acc.email!==user.email).map((account)=>(
                            <button className={accountStyle}
                            onClick={handleOnClick(account)}
                            key={account.id}>
                                <h2>{`${account.firstName} ${account.lastName}`}</h2>
                                <p>{account.email}</p>
                            </button>
                        ))
                    ) : (
                        accounts.slice(0, 3).map((account)=>(
                            <button className={accountStyle}
                            onClick={handleOnClick(account)}
                            key={account.id}>
                                <h2>{`${account.firstName} ${account.lastName}`}</h2>
                                <p>{account.email}</p>
                            </button>
                        ))
                    )
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
        </div>
    )
}

export default DropDown

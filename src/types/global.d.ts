declare global {
    type User = {
        id: string,
        firstName?: string,
        lastName?: string,
        email: string,
        password?: string
    }
    type ButtonProps = {
        handleOnClick?: ()=>void,
        to?: string,
        text?: string,
        color: string,
        type?: string,
        showAccounts?: string
    }
    type Note = {
        id?: string,
        title: string,
        content: string,
        userId: string
    }
}

export {}
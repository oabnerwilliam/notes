const loginUser = (existingUsers, currentUser, to, login) => {
    const foundUser = existingUsers.find((existingUser)=>existingUser.email===currentUser.email)
    if (foundUser) {
        if (foundUser.password===currentUser.password) {
            navigate(to)
            login(foundUser)
        } else {
            return("Senha errada.")
        }
    } else {
        return("Usuário não existe.")
    }
}

export default loginUser

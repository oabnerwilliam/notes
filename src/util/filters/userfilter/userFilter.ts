const userFilter = <T extends {
    userId: string
}>(list?: T[], user?: User): T[] => {
    if (user && list) {
        const userFiltered = list.filter((item)=>{
            return item.userId === user.id
        })
        return userFiltered
    }
    return []
}

export default userFilter

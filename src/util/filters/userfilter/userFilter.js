const userFilter = (list, user) => {
    if (list, user) {
        const userFiltered = list.filter((item)=>{
            return item.userId === user.id
        })
        return userFiltered
    }
}

export default userFilter

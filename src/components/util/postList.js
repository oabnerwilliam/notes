import React from 'react'

function postList(note, user, action) {
    note = {
    ...note,
    ["userId"]: user.id
    }
    
    fetch("http://localhost:5000/notes", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(note)
    })
    .then((resp)=>resp.json())
    .then((data)=>{
        action(data)
        /*console.log(data)
        setNotes((notes) => [...notes, data])
        setIsLoading(false)*/
    })
    .catch((err)=>console.log(err))
}

export default postList

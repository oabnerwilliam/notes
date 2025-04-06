import React from 'react'

function getList(endpoint, action) {
    fetch(`http://localhost:5000/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((resp)=>resp.json())
      .then((data)=>{
        action(data)
      })
      .catch((err)=>console.log(err))
}

export default getList

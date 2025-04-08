export const get = async (url) => {
    try {
        const resp = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!resp.ok) {
            throw new Error("Algo deu errado!")
        }

        const data = await resp.json()

        return data    

    } catch(error) {
        console.log("Erro:", error.message)
    }
}

export const post = async (url, item) => {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        
        if (!res.ok) {
            throw new Error("Algo deu errado!")
        }

        const data = await res.json()
    
        return data
    
    } catch(error) {
        console.error("Erro:", error.message)
    }    
}

export const put = async (url, item) => {
    try {
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        
        if (!res.ok) {
            throw new Error("Algo deu errado!")
        }

        const data = await res.json()
    
        return data
    
    } catch(error) {
        console.error("Erro:", error.message)
    }
}

export const remove = async (url) => {
    try {
        const resp = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!resp.ok) {
            throw new Error("Algo deu errado!")
        }

        const data = await resp.json()

        return data    

    } catch(error) {
        console.log("Erro:", error.message)
    }
}
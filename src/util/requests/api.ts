export const get = async (url: string) => {
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
}

export const post = async <T>(url: string, item: T) => {
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
}

export const put = async <T>(url: string, item: T) => {
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
}

export const remove = async (url: string) => {
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
}
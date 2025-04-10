import { put } from '../requests/api'

const editItem = async (url, item, list) => {
    const data = await put(url, item)

    const newList = list.map((item)=>(item.id === data.id ? data : item))
    
    return newList
}

export default editItem

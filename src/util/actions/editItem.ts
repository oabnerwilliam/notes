import { put } from '../requests/api'

const editItem = async <T extends {
    id?: string
}>(url: string, item: T, list: T[]): Promise<{ newList: T[] }> => {
    const data = await put(url, item)

    const newList = list.map((item)=>(item.id === data.id ? data : item))
    
    return { newList }
}

export default editItem

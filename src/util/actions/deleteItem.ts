import { remove } from "../requests/api"


const deleteItem = async <T extends {
    id?: string
}>(url: string, deletedItem: T, list: T[]): Promise<{ newList: T[] }> => {
    const data = await remove(url)
    
    const newList = list.filter((item)=>item.id!==deletedItem.id)

    return { newList }
}

export default deleteItem

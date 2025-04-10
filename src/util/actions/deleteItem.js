import { remove } from "../requests/api"

const deleteItem = async (url, deletedItem, list) => {
    const data = await remove(url)
    
    const newList = list.filter((item)=>item.id!==deletedItem.id)

    return newList
}

export default deleteItem

import { post } from '../requests/api'

const createItem = async <T>(url: string, item: T, list: T[]): Promise<{ newList: T[] }> => {
    const data = await post(url, item)

    let newList = [...list, data]

    return { newList }
}

export default createItem

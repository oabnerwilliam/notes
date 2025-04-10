import { post } from '../requests/api'

const createItem = async (url, item, list) => {
    const data = await post(url, item)

    return [...list, data]
}

export default createItem

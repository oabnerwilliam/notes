import { useEffect, useState } from 'react'

interface SearchableItem {
    title: string;
    content: string;
}

type useSearchType <T> = {
    searchItem: (e: React.ChangeEvent<HTMLInputElement>) => void,
    filtered: T[]
}

export const useSearch = <T extends SearchableItem> (
    list: T[]
): useSearchType <T> => {
    const [searchText, setSearchText] = useState<string>('')
    const [filtered, setFiltered] = useState<T[]>([])
    
    useEffect(()=>{
        if (searchText) {
            setFiltered(
                list.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                item.content.toLowerCase().includes(searchText.toLowerCase()))
            )    
        } else {
            setFiltered(list)
        }
    }, [searchText, list])
    
    const searchItem = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchText(e.target.value)
    }
  
    return { searchItem, filtered }
}

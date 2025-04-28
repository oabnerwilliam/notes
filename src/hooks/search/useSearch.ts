import { useEffect, useState } from 'react'

interface SearchableItem {
    title: string;
    content: string;
}

type useSearchType = {
    searchItem: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function useSearch<T extends SearchableItem>(
    list: T[], 
    setFiltered: (filteredList: T[])=>void
): useSearchType  {
    const [searchText, setSearchText] = useState<string>('')
    
    useEffect(()=>{
        if (searchText) {
            setFiltered(
                list.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                item.content.toLowerCase().includes(searchText.toLowerCase()))
            )    
        } else {
            setFiltered(list)
        }
    }, [searchText, list, setFiltered])
    
    const searchItem = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchText(e.target.value)
    }
  
    return {searchItem}
}   

export {useSearch}

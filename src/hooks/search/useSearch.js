import { useEffect, useState } from 'react'

function useSearch (list, setFiltered) {
    const [searchText, setSearchText] = useState('')
    
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
    
    const searchItem = (e) => {
        setSearchText(e.target.value)
    }
  
    return {searchItem}
}   

export {useSearch}

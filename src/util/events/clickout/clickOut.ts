const clickOut = (elementRef: React.RefObject<HTMLElement | null>, action: () => void) => {
    const handleClickOutside = (e: MouseEvent) => {
        if (elementRef.current && 
            !elementRef.current.contains(e.target as Node)) {
                action()
            }
    }

    document.addEventListener("mousedown", handleClickOutside)
    
    return ()=>{
        document.removeEventListener("mousedown", handleClickOutside)    
    }  
}

export default clickOut

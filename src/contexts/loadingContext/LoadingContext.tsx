import { createContext, ReactNode, useContext, useState } from "react"
import Loader from "../../components/layout/loader/Loader"

type LoadingContextType = {
    startLoading: () => void,
    stopLoading: () => void
}

type LoadingProviderProps = {
    children: ReactNode
}

const LoadingContext = createContext<LoadingContextType | null>(null)

const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [loading, setLoading] = useState(false)
    
    const startLoading = () => {
        setLoading(true)
    }

    const stopLoading = () => {
        setLoading(false)
    }

    if (loading) return <Loader/>

    return (
        <LoadingContext.Provider value={{ startLoading, stopLoading }}>
            { children }
        </LoadingContext.Provider>
    )
}

const useLoading = () => {
    const context = useContext(LoadingContext)

    if (!context) {
        throw new Error('useLoading deve ser usado dentro de um LoadingProvider')
    }

    return context
}

export { useLoading }
export default LoadingProvider

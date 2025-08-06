import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import AuthProvider from './contexts/authContext/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const rootElement = document.getElementById('root')

const queryClient = new QueryClient()

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App/>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  )
} else {
  console.error("Elemento com ID 'root' não encontrado no DOM.")
}



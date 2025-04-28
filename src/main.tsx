import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import AuthProvider from './contexts/AuthContext'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </StrictMode>
  )
} else {
  console.error("Elemento com ID 'root' não encontrado no DOM.")
}



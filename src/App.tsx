import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Navbar from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import Container from './components/layout/container/Container'

import Home from './components/pages/home/Home'
import MyNotes from './components/pages/mynotes/MyNotes'
import SignUpPage from './components/pages/signup/SignUpPage'
import LoginPage from './components/pages/login/LoginPage'
import DarkButton from './components/layout/darkmode/DarkButton'
import Accounts from './components/pages/accounts/Accounts'
import { AuthProvider } from './contexts/authContext/AuthContext'
import { Suspense } from 'react'
import Loader from './components/layout/loader/Loader'

function App() {
  return (
    <Suspense fallback={<Loader/>}>
      <AuthProvider>
        <Router>
          <Navbar/>
          <Container customClass="router">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/mynotes" element={<MyNotes/>}/>
              <Route path="/signup" element={<SignUpPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/accounts" element={<Accounts/>}/>
            </Routes>
          </Container>
          <Footer/>
          <DarkButton/>
        </Router>
      </AuthProvider>
    </Suspense>
  )
}

export default App

import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from 'react-router-dom'
import React, { useEffect } from 'react'

import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'

import Home from './components/pages/Home'
import MyNotes from './components/pages/MyNotes'
import SignUpPage from './components/pages/SignUpPage'
import LoginPage from './components/pages/LoginPage'

import {useAuth} from './contexts/AuthContext'

function PrivateRoute({children}) {
  const {user} = useAuth()

  return user ? children : <Navigate to="/"/>
}

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Container customClass="min-height">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/mynotes" 
            element={
              <PrivateRoute>
                <MyNotes/>
              </PrivateRoute>
            }/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
          </Routes>
        </Container>
        <Footer/>
      </Router>
    </div>
  )
}

export default App

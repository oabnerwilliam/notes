import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React from 'react'

import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'

import Home from './components/pages/Home'
import MyNotes from './components/pages/MyNotes'
import SignUpPage from './components/pages/SignUpPage'
import LoginPage from './components/pages/LoginPage'
import DarkButton from './components/layout/darkmode/DarkButton'

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Container customClass="router">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/mynotes" element={<MyNotes/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
          </Routes>
        </Container>
        <Footer/>
        <DarkButton/>
      </Router>
    </div>
  )
}

export default App

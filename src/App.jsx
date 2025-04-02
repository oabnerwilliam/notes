import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React from 'react'

import { useState } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'

import Home from './components/pages/Home'
import MyNotes from './components/pages/MyNotes'
import NotePage from './components/pages/NotePage'

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Container customClass="min-height">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/mynotes" element={<MyNotes/>}/>
            <Route path="/notepage" element={<NotePage/>}/>
          </Routes>
        </Container>
        <Footer/>
      </Router>
    </div>
  )
}

export default App

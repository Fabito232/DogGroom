//import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import '../styles/App.css'
import Login from './login'
import Citas from './citas'



const App = () => {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/citas" element={<Citas />} />
      </Routes>
   </Router>
  )
}
export default App

//import { useState } from 'react'
import AgendarCita from './AgendarCita';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../styles/App.css'
import Login from './login'
import Citas from './citas'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lista_productos from './lista_productos';

const App = () => {
  
  return (
    <>
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/citas" element={<Citas />}/>
          <Route path="/agendarcita" element={<AgendarCita />}/>
          <Route path="/productos" element={<Lista_productos />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
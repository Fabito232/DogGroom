import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../styles/App.css'
import Login from './login'
import Citas from './citas'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  
  return (
    <>
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/citas" element={<Citas />}/>
        </Routes>
      </Router>
    </>
  )
}
export default App
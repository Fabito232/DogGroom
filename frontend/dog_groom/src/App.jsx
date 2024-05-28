import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lista_productos from './components/lista_productos';
import Lista_clientes from './components/lista_clientes';


const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Lista_clientes />} />
          </Routes>
      </Router>
  );
}

export default App
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lista_productos from './lista_productos';
import Lista_Clientes from './lista_clientes';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Lista_Clientes />} />
          </Routes>
      </Router>
  );
}

export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lista_productos from './components/lista_productos';
import Agregar_producto from './components/agregar_producto';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Lista_productos />} />
          </Routes>
      </Router>
  );
}

export default App

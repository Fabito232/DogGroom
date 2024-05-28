import React from 'react';
import '../styles/lista_clientes.css';
import imgPerro from '../assets/img_perro.jpg'

const ListaClientes = () => (
  <div className="App">
    <header className="header">
      <h1>Lista de Clientes</h1>
      <button className="add-button">Agregar</button>
    </header>
    <div className="cliente-lista">
      {[
        { id: 1, image: 'https://via.placeholder.com/150', cedula: '12345', nombre: 'Juan Perez', telefono: '555-1234', mascota: 'Lasi', raza: 'Pastor' },
        { id: 2, image: 'https://via.placeholder.com/150', cedula: '12345', nombre: 'Juan Perez', telefono: '555-1234', mascota: 'Lasi', raza: 'Pastor' },
        { id: 3, image: 'https://via.placeholder.com/150', cedula: '12345', nombre: 'Juan Perez', telefono: '555-1234', mascota: 'Lasi', raza: 'Pastor' },
        { id: 4, image: 'https://via.placeholder.com/150', cedula: '12345', nombre: 'Juan Perez', telefono: '555-1234', mascota: 'Lasi', raza: 'Pastor' },
        { id: 5, image: 'https://via.placeholder.com/150', cedula: '12345', nombre: 'Juan Perez', telefono: '555-1234', mascota: 'Lasi', raza: 'Pastor' },
        { id: 6, image: 'https://via.placeholder.com/150', cedula: '12345', nombre: 'Juan Perez', telefono: '555-1234', mascota: 'Lasi', raza: 'Pastor' }

      ].map(cliente => (
        <div key={cliente.id} className="cliente-card">
          <div className="image-container">
            <img src={cliente.image} alt={cliente.nombre} />
          </div>
          <div className="cliente-info">
            <div className="info-item">
              <span className="info-label">Cédula:</span>
              <span className="info-value">{cliente.cedula}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Nombre:</span>
              <span className="info-value">{cliente.nombre}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Teléfono:</span>
              <span className="info-value">{cliente.telefono}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Mascota:</span>
              <span className="info-value">{cliente.mascota}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Raza:</span>
              <span className="info-value">{cliente.raza}</span>
            </div>
          </div>
          <div className="buttons">
            <button className="edit-button">Editar</button>
            <button className="delete-button">Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);


export default ListaClientes;


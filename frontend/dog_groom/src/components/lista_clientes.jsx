import React from 'react';
import '../styles/lista_clientes.css';
import imgPerro from '../assets/img_perro.jpg';

const ListaClientes = () => (
  <div className="App">
    <header className="encabezado-cliente">
      <h1>Lista de Clientes</h1>
      <button className="boton-agregar-cliente">Agregar</button>
    </header>
    <div className="lista-clientes">
      {[
        { id: 1, image: imgPerro, cedula: '12345', nombre: 'Juan Perez', telefono: '555-1234', mascota: 'Lasi', raza: 'Pastor' },
        { id: 2, image: imgPerro, cedula: '67890', nombre: 'Maria Lopez', telefono: '555-5678', mascota: 'Lasi', raza: 'Pastor' },
        { id: 3, image: imgPerro, cedula: '11223', nombre: 'Carlos Diaz', telefono: '555-1122', mascota: 'Lasi', raza: 'Pastor' },
        { id: 4, image: imgPerro, cedula: '33445', nombre: 'Ana Torres', telefono: '555-3344', mascota: 'Lasi', raza: 'Pastor' },
        { id: 5, image: imgPerro, cedula: '55667', nombre: 'Luis Mora', telefono: '555-5566', mascota: 'Lasi', raza: 'Pastor' }
      ].map(cliente => (
        <div key={cliente.id} className="tarjeta-cliente">
          <div className="contenedor-imagen-cliente">
            <img src={cliente.image || defaultImage} alt={cliente.nombre} />
          </div>
          <div className="informacion-cliente">
            <div className="elemento-info-cliente">
              <span className="etiqueta-info-cliente">Cédula:</span>
              <span className="valor-info-cliente">{cliente.cedula}</span>
            </div>
            <div className="elemento-info-cliente">
              <span className="etiqueta-info-cliente">Nombre:</span>
              <span className="valor-info-cliente">{cliente.nombre}</span>
            </div>
            <div className="elemento-info-cliente">
              <span className="etiqueta-info-cliente">Teléfono:</span>
              <span className="valor-info-cliente">{cliente.telefono}</span>
            </div>
            <div className="elemento-info-cliente">
              <span className="etiqueta-info-cliente">Mascota:</span>
              <span className="valor-info-cliente">{cliente.mascota}</span>
            </div>
            <div className="elemento-info-cliente">
              <span className="etiqueta-info-cliente">Raza:</span>
              <span className="valor-info-cliente">{cliente.raza}</span>
            </div>
          </div>
          <div className="botones-cliente">
            <button className="boton-editar-cliente">Editar</button>
            <button className="boton-eliminar-cliente">Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ListaClientes;


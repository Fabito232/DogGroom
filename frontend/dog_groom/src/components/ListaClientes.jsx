import React, { useState, useEffect } from 'react';
import imgPerro from '../assets/img_perro.jpg';
import Header from "./Header";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([
    { id: 1, image: imgPerro, cedula: '12345', nombre: 'Juan Perez', telefono: '555-1234', mascota: 'Lasi', raza: 'Pastor' },
    { id: 2, image: imgPerro, cedula: '67890', nombre: 'Maria Lopez', telefono: '555-5678', mascota: 'Lasi', raza: 'Pastor' },
    { id: 3, image: imgPerro, cedula: '11223', nombre: 'Carlos Diaz', telefono: '555-1122', mascota: 'Lasi', raza: 'Pastor' },
    { id: 4, image: imgPerro, cedula: '33445', nombre: 'Ana Torres', telefono: '555-3344', mascota: 'Lasi', raza: 'Pastor' },
    { id: 5, image: imgPerro, cedula: '55667', nombre: 'Luis Mora', telefono: '555-5566', mascota: 'Lasi', raza: 'Pastor' }
  ]);

  const [clienteEditando, setClienteEditando] = useState(null);
  const [isGuardarDisabled, setIsGuardarDisabled] = useState(true);

  const manejarEditar = (cliente) => {
    setClienteEditando(cliente);
  };

  const manejarGuardar = () => {
    if (isGuardarDisabled) return;
    setClientes(clientes.map(cliente => cliente.id === clienteEditando.id ? clienteEditando : cliente));
    setClienteEditando(null);
  };

  const manejarCancelar = () => {
    setClienteEditando(null);
  };

  const manejarCambioEntradaEdicion = (e) => {
    const { name, value } = e.target;
    setClienteEditando({ ...clienteEditando, [name]: value });
  };

  const manejarCambioImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setClienteEditando({ ...clienteEditando, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const manejarEliminar = (id) => {
    const confirmacion = window.confirm('¿Estás seguro de eliminar este cliente?');
    if (confirmacion) {
      setClientes(clientes.filter(cliente => cliente.id !== id));
    }
  };

  useEffect(() => {
    if (clienteEditando) {
      const { cedula, nombre, telefono, mascota, raza } = clienteEditando;
      setIsGuardarDisabled(!cedula || !nombre || !telefono || !mascota || !raza);
    } else {
      setIsGuardarDisabled(true);
    }
  }, [clienteEditando]);

  return (
    <div className="relative min-h-screen flex flex-col bg-fondo bg-cover">
      <Header />
      <div className="flex-grow flex items-start justify-start p-12">
        <div className="shadow-lg w-full md:w-200 md:h-auto">
          <div className="shadow-md p-16 mb-8 overflow-auto max-h-[790px]" style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
            <div className="flex items-center justify-between mb-4">
              <h1 className="bg-gray-300 rounded-lg text-6xl font-bold flex-1 text-center">Lista de Clientes</h1>
              <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-4 px-12 rounded ml-8">Agregar</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
              {clientes.map(cliente => (
                <div key={cliente.id} className="flex bg-amber-700 bg-opacity-90 border border-black w-full">
                  <div className="p-4 w-64 relative">
                    <img
                      src={clienteEditando && clienteEditando.id === cliente.id ? clienteEditando.image : cliente.image || imgPerro}
                      alt={cliente.nombre}
                      className="h-full w-full object-cover rounded-lg cursor-pointer"
                      onClick={() => document.getElementById(`fileInput-${cliente.id}`).click()}
                    />
                    {clienteEditando && clienteEditando.id === cliente.id && (
                      <input
                        id={`fileInput-${cliente.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={manejarCambioImagen}
                      />
                    )}
                  </div>
                  <div className="flex-grow flex flex-col justify-between p-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="font-bold mr-2">Cédula:</div>
                        {clienteEditando && clienteEditando.id === cliente.id ? (
                          <input
                            type="text"
                            name="cedula"
                            value={clienteEditando.cedula}
                            onChange={manejarCambioEntradaEdicion}
                            className="block w-full p-1 border border-gray-300 rounded"
                          />
                        ) : (
                          <div className="bg-white p-1 rounded flex-grow">{cliente.cedula}</div>
                        )}
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="font-bold mr-2">Nombre:</div>
                        {clienteEditando && clienteEditando.id === cliente.id ? (
                          <input
                            type="text"
                            name="nombre"
                            value={clienteEditando.nombre}
                            onChange={manejarCambioEntradaEdicion}
                            className="block w-full p-1 border border-gray-300 rounded"
                          />
                        ) : (
                          <div className="bg-white p-1 rounded flex-grow">{cliente.nombre}</div>
                        )}
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="font-bold mr-2">Teléfono:</div>
                        {clienteEditando && clienteEditando.id === cliente.id ? (
                          <input
                            type="text"
                            name="telefono"
                            value={clienteEditando.telefono}
                            onChange={manejarCambioEntradaEdicion}
                            className="block w-full p-1 border border-gray-300 rounded"
                          />
                        ) : (
                          <div className="bg-white p-1 rounded flex-grow">{cliente.telefono}</div>
                        )}
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="font-bold mr-2">Mascota:</div>
                        {clienteEditando && clienteEditando.id === cliente.id ? (
                          <input
                            type="text"
                            name="mascota"
                            value={clienteEditando.mascota}
                            onChange={manejarCambioEntradaEdicion}
                            className="block w-full p-1 border border-gray-300 rounded"
                          />
                        ) : (
                          <div className="bg-white p-1 rounded flex-grow">{cliente.mascota}</div>
                        )}
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="font-bold mr-2">Raza:</div>
                        {clienteEditando && clienteEditando.id === cliente.id ? (
                          <input
                            type="text"
                            name="raza"
                            value={clienteEditando.raza}
                            onChange={manejarCambioEntradaEdicion}
                            className="block w-full p-1 border border-gray-300 rounded"
                          />
                        ) : (
                          <div className="bg-white p-1 rounded flex-grow">{cliente.raza}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between space-x-4 mt-4">
                      {clienteEditando && clienteEditando.id === cliente.id ? (
                        <div className="flex w-full space-x-4">
                          <button className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex-1 ${isGuardarDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={manejarGuardar} disabled={isGuardarDisabled}>Guardar</button>
                          <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md flex-1" onClick={manejarCancelar}>Cancelar</button>
                        </div>
                      ) : (
                        <div className="flex w-full space-x-4">
                          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex-1" onClick={() => manejarEditar(cliente)}>Editar</button>
                          <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md flex-1" onClick={() => manejarEliminar(cliente.id)}>Eliminar</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaClientes;

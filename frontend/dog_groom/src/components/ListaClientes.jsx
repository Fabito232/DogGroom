import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imgPerro from '../assets/img_perro.jpg';
import Header from "./Header";
import { obtenerClientes, actualizarCliente, borrarCliente } from '../services/clienteService';
import { obtenerMascotas, actualizarMascota, borrarMascota } from '../services/mascotaService';
import { URL_Hosting } from '../services/api';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([
    { id: 1, image: imgPerro, cedula: '12345', nombre: 'Juan Perez', telefono: '555-1234', mascota: 'Lasi', raza: 'Pastor' },
    { id: 2, image: imgPerro, cedula: '67890', nombre: 'Maria Lopez', telefono: '555-5678', mascota: 'Lasi', raza: 'Pastor' },
    { id: 3, image: imgPerro, cedula: '11223', nombre: 'Carlos Diaz', telefono: '555-1122', mascota: 'Lasi', raza: 'Pastor' },
    { id: 4, image: imgPerro, cedula: '33445', nombre: 'Ana Torres', telefono: '555-3344', mascota: 'Lasi', raza: 'Pastor' },
    { id: 5, image: imgPerro, cedula: '55667', nombre: 'Luis Mora', telefono: '555-5566', mascota: 'Lasi', raza: 'Pastor' }
  ]);

  const cargarClientes = async () => {
    try {
      const resClientes = await obtenerClientes();
      console.log(resClientes)
      const listaClientes = resClientes.data.map(cliente => ({
        id: cliente.Cedula,
        cedula: cliente.Cedula,
        nombre: cliente.Nombre,
        telefono: cliente.Telefono,
        mascota: cliente.Mascota.length > 0 ? cliente.Mascota[0].Nombre : '-',
        raza: cliente.Mascota.length > 0 ? cliente.Mascota[0].Raza : '-',
        image: cliente.Mascota.length > 0 ? cliente.Mascota[0].FotoURL : '-',
        idMascota: cliente.Mascota.length > 0 ? cliente.Mascota[0].ID_Mascota : '-',
        ID_TipoMascota: cliente.Mascota.length > 0 ? cliente.Mascota[0].ID_TipoMascota : '-'
      }))
      setClientes(listaClientes)
      console.log(listaClientes)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    cargarClientes()
  }, [])

  const navigate = useNavigate();
  const [clienteEditando, setClienteEditando] = useState(null);
  const [isGuardarDisabled, setIsGuardarDisabled] = useState(true);

  const manejarAgregar = () => {
    navigate('/agregarCliente');
  };

  const manejarEditar = async (cliente) => {
    console.log("Cliente editado", cliente)
    setClienteEditando(cliente);
  };

  const manejarGuardar = async () => {
    console.log("editar:" + clienteEditando)
    const cliente = {
      cedula: clienteEditando.cedula,
      nombre: clienteEditando.nombre,
      telefono: clienteEditando.telefono
    }
    const mascota = {
      nombre: clienteEditando.mascota,
      raza: clienteEditando.raza,
      image: clienteEditando.image,
      cedula: clienteEditando.cedula,
      ID_TipoMascota: clienteEditando.ID_TipoMascota
    }

    const resCliente = await actualizarCliente(cliente, clienteEditando.id);
    console.log(resCliente)
    if (resCliente.ok) {
      console.log(clienteEditando.image)
      const resMascota = await actualizarMascota(mascota, clienteEditando.idMascota);
      console.log(resMascota)
    }


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
    console.log("files:", file)
    setClienteEditando({ ...clienteEditando, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setClienteEditando({ ...clienteEditando, image: reader.result });
      };
      reader.readAsDataURL(file);
    }

  };

  const manejarEliminar = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de eliminar este cliente?');
    if (confirmacion) {
      const resCliente = await borrarCliente(id)
      console.log(resCliente)
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
    <div className="relative min-h-screen flex flex-col bg-fondo2 bg-cover">
      <Header />
      <div className="flex-grow flex items-start justify-start p-4 md:p-12">
        <div className="shadow-lg w-full md:w-200 md:h-auto">
          <div className="shadow-md p-4 md:p-16 mb-8 overflow-auto max-h-[790px]" style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
              <h1 className="bg-gray-300 rounded-lg text-3xl md:text-6xl font-bold flex-1 text-center mb-4 md:mb-0">Lista de Clientes</h1>
              <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 md:py-4 px-6 md:px-12 rounded" onClick={manejarAgregar}>Agregar</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {clientes.map(cliente => (
                <div key={cliente.id} className="flex flex-col bg-amber-700 bg-opacity-90 border border-black w-full">
                  <div className="relative p-4 w-full flex justify-center">
                    <img
                      src={clienteEditando && clienteEditando.id === cliente.id ? clienteEditando.image : URL_Hosting + cliente.image || imgPerro}
                      alt={cliente.nombre}
                      className="h-32 w-32 md:h-48 md:w-48 object-cover rounded-lg cursor-pointer"
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


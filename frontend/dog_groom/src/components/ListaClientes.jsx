import { useState, useEffect } from 'react';
import imgPerro from '../assets/img_perro.jpg';
import Header from "./Header";
import { obtenerClientes, actualizarCliente, borrarCliente } from '../services/clienteService';
import { actualizarMascota } from '../services/mascotaService';
import { URL_Hosting } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare,faTrashCan } from '@fortawesome/free-solid-svg-icons';
import AgregarCliente from './AgregarCliente';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [clientesPorPagina] = useState(8);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [isGuardarDisabled, setIsGuardarDisabled] = useState(true);
  const [terminoBusqueda, setTerminoBusqueda] = useState(""); // Nuevo estado para el término de búsqueda
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const abrirModal = () => {
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
  };

  const cargarClientes = async () => {
    try {
      const resClientes = await obtenerClientes();
      // const listaClientes = resClientes.data.map(cliente => ({
      //   id: cliente.Cedula,
      //   cedula: cliente.Cedula,
      //   nombre: cliente.Nombre,
      //   telefono: cliente.Telefono,
      //   mascota: cliente.Mascota.length > 0 ? cliente.Mascota[0].Nombre : '-',
      //   raza: cliente.Mascota.length > 0 ? cliente.Mascota[0].Raza : '-',
      //   image: cliente.Mascota.length > 0 ? cliente.Mascota[0].FotoURL : imgPerro,
      //   idMascota: cliente.Mascota.length > 0 ? cliente.Mascota[0].ID_Mascota : '-',
      //   ID_TipoMascota: cliente.Mascota.length > 0 ? cliente.Mascota[0].ID_TipoMascota : '-'
      // }));
      const listaClientes = resClientes.data.map(cliente => ({
        id: cliente.Cedula,
        cedula: cliente.Cedula,
        nombre: cliente.Nombre,
        telefono: cliente.Telefono,
        mascota: cliente.Mascota.length > 0 ? cliente.Mascota[0]: '-',
        
      }));
      console.log(listaClientes);
      setClientes(listaClientes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, [modalIsOpen]);

  const manejarEditar = async (cliente) => {
    console.log("Cliente editado",cliente)
    setClienteEditando(cliente);
  };

  const manejarGuardar = async () => {
    const cliente = {
      cedula: clienteEditando.cedula,
      nombre: clienteEditando.nombre,
      telefono: clienteEditando.telefono
    };
    const mascota = {
      nombre: clienteEditando.mascota.Nombre,
      raza: clienteEditando.mascota.Raza,
      image: clienteEditando.mascota.FotoURL,
      cedula: clienteEditando.cedula,
      ID_TipoMascota: clienteEditando.mascota.ID_TipoMascota
    };

    const resCliente = await actualizarCliente(cliente, clienteEditando.id);
    if (resCliente.ok) {
      await actualizarMascota(mascota, clienteEditando.mascota.ID_Mascota);
    }

    if (isGuardarDisabled) return;
    setClientes(clientes.map(c => c.id === clienteEditando.id ? clienteEditando : c));
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
    console.log("files:" , file)
    setClienteEditando({ ...clienteEditando, image: file});
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     setClienteEditando({ ...clienteEditando, image: reader.result });
    //   };
    //   reader.readAsDataURL(file);
    // }
  };
  const manejarEliminar = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de eliminar este cliente?');
    if (confirmacion) {
      await borrarCliente(id);
      setClientes(clientes.filter(cliente => cliente.id !== id));
    }
  };

  useEffect(() => {
    if (clienteEditando) {
      const { cedula, nombre, telefono, mascota } = clienteEditando;
      setIsGuardarDisabled(!cedula || !nombre || !telefono || !mascota || !mascota.Nombre || !mascota.Raza);
   
    } else {
      setIsGuardarDisabled(true);
    }
  }, [clienteEditando]);

  const manejarCambioBusqueda = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    cliente.cedula.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    cliente.mascota.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  const indiceUltimoCliente = paginaActual * clientesPorPagina;
  const indicePrimerCliente = indiceUltimoCliente - clientesPorPagina;
  const clientesActuales = clientesFiltrados.slice(indicePrimerCliente, indiceUltimoCliente);

  const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-300bg-cover">
      <Header />
      <div className="flex-grow flex items-start justify-start p-4 md:p-12">
        <div className="shadow-lg w-full md:w-200 md:h-auto">
          <div className="shadow-md p-4 md:p-16 mb-8 overflow-auto max-h-[790px]" style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
              <h1 className="bg-gray-300 rounded-lg text-3xl md:text-6xl font-bold flex-1 text-center mb-4 md:mb-0">Lista de Clientes</h1>
              <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 md:py-4 px-6 md:px-12 rounded ml-8" onClick={abrirModal}>Agregar</button>
              <AgregarCliente 
              isOpen={modalIsOpen}
              cerrar={cerrarModal}
              />
            </div>
            <input
              type="text"
              placeholder="Buscar por Nombre de Cliente, Cédula o Nombre de la Mascota"
              value={terminoBusqueda}
              onChange={manejarCambioBusqueda}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {clientesActuales.map(cliente => (
                <div key={cliente.id} className="flex flex-col bg-amber-700 bg-opacity-90 border border-black w-full">
                  <div className="relative p-4 w-full flex justify-center">
                    <img
                      src={clienteEditando && clienteEditando.id === cliente.id ? clienteEditando.mascota.FotoURL : (cliente.mascota && cliente.mascota.FotoURL) ? URL_Hosting + cliente.mascota.FotoURL : imgPerro}
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
                            value={clienteEditando.mascota.Nombre}
                            onChange={manejarCambioEntradaEdicion}
                            className="block w-full p-1 border border-gray-300 rounded"
                          />
                        ) : (
                          <div className="bg-white p-1 rounded flex-grow">{cliente.mascota.Nombre}</div>
                        )}
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="font-bold mr-2">Raza:</div>
                        {clienteEditando && clienteEditando.id === cliente.id ? (
                          <input
                            type="text"
                            name="raza"
                            value={clienteEditando.mascota.Raza}
                            onChange={manejarCambioEntradaEdicion}
                            className="block w-full p-1 border border-gray-300 rounded"
                          />
                        ) : (
                          <div className="bg-white p-1 rounded flex-grow">{cliente.mascota.Raza}</div>
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
                          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-md flex-1" onClick={() => manejarEditar(cliente)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                          <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-4 rounded-md flex-1" onClick={() => manejarEliminar(cliente.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setPaginaActual(paginaActual - 1)}
                disabled={paginaActual === 1}
                className="mx-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setPaginaActual(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
                className="mx-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaClientes;
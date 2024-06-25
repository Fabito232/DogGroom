import { useState, useEffect } from 'react';
import imgCliente from '../assets/img_perro.jpg'; // Imagen fija para los clientes
import Header from "./Header";
import { obtenerClientes, actualizarCliente, borrarCliente } from '../services/clienteService';
import { crearMascota, actualizarMascota, borrarMascota } from '../services/mascotaService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import AgregarCliente from './AgregarCliente';
import MostrarMascotas from './MostrarMascotas';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [clientesPorPagina] = useState(8);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [isGuardarDisabled, setIsGuardarDisabled] = useState(true);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenMascotas, setModalIsOpenMascotas] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [mascotasSelecionadas, setMascotasSelecionadas] = useState([]);

  const abrirModal = () => {
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
  };

  const abrirModalMascotas = (cliente) => {
    setClienteSeleccionado({cedula:cliente.cedula, nombre: cliente.nombre});
    setMascotasSelecionadas(cliente.mascotas)
    console.log("amoldal: ", cliente,)
    setModalIsOpenMascotas(true);
  };

  const cerrarModalMascotas = () => {
    setModalIsOpenMascotas(false);
    setClienteSeleccionado(null);
  };

  const cargarClientes = async () => {
    try {
      const resClientes = await obtenerClientes();
      const listaClientes = resClientes.data.map(cliente => ({
        id: cliente.Cedula,
        cedula: cliente.Cedula,
        nombre: cliente.Nombre,
        telefono: cliente.Telefono,
        mascotas: cliente.Mascota,
      }));
      setClientes(listaClientes);
      console.log(listaClientes)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, [modalIsOpen]);

  const editarMascota = async (mascota, ID_Mascota) => {
    console.log("foto", mascota.Foto);
    const formData = new FormData();
    formData.append('nombre', mascota.Nombre);
    formData.append('raza', mascota.Raza);
    formData.append('cedula', mascota.ID_Cliente);
    formData.append('ID_TipoMascota', mascota.ID_TipoMascota);
    formData.append('image', mascota.Foto);

    try {
        const resMascota = await actualizarMascota(formData, ID_Mascota);

        if (resMascota) {
            console.log(resMascota.data);
            const mascotaEditada = resMascota.data;
            mascotaEditada.TipoMascotum = mascota.TipoMascotum;

            const nuevaListaM = clientes.map(cliente => {
                if (cliente.cedula === mascotaEditada.ID_Cliente) {
                    const nuevasMascotas = cliente.mascotas.map(mascota =>
                        mascota.ID_Mascota === ID_Mascota ? mascotaEditada : mascota
                    );
                    setMascotasSelecionadas(nuevasMascotas)
                    return { ...cliente, mascotas: nuevasMascotas };
                }
                return cliente;
            });
            setClientes(nuevaListaM);
        } else {
            console.log(resMascota);
        }
    } catch (error) {
        console.log(error);
    }
  };

  const agregarMascota = async (mascota) => {
    console.log("foto", mascota.Foto)
    const formData = new FormData();
    formData.append('nombre', mascota.Nombre);
    formData.append('raza', mascota.Raza);
    formData.append('cedula', mascota.ID_Cliente);
    formData.append('ID_TipoMascota', mascota.ID_TipoMascota);
    formData.append('image', mascota.Foto);

    try {
      const resMascota = await crearMascota(formData);

      if(resMascota){
        console.log(resMascota.data)
        const nuevaMascota = resMascota.data;
        nuevaMascota.TipoMascotum = mascota.TipoMascotum
        const nuevaListaM = clientes.map(cliente => {
          if(cliente.cedula === nuevaMascota.ID_Cliente){
            const nuevasMascotas = [...cliente.mascotas, nuevaMascota];
            setMascotasSelecionadas(nuevasMascotas)
            return { ...cliente, mascotas: nuevasMascotas };
          }
           return cliente;
        });
        console.log(nuevaListaM)
        setClientes(nuevaListaM)
        
      }else{
        console.log(resMascota)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const eliminarCliente = async (ID_Mascota) => {

    try {
      const resMascota = await borrarMascota(ID_Mascota);
      console.log(resMascota);
      const nuevasMascotas = mascotasSelecionadas.filter(mascota => mascota.ID_Mascota !== ID_Mascota)
      const nuevaListaM = clientes.map(cliente => {
        if(cliente.cedula === clienteSeleccionado.cedula){
          return { ...cliente, mascotas: nuevasMascotas };
        }
         return cliente;
      });
      setMascotasSelecionadas(nuevasMascotas);
      setClientes(nuevaListaM);
    } catch (error) {
      console.log(error)
    }
  }


  const manejarEditar = async (cliente) => {
    setClienteEditando(cliente);
  };

  const manejarGuardar = async () => {
    const cliente = {
      cedula: clienteEditando.cedula,
      nombre: clienteEditando.nombre,
      telefono: clienteEditando.telefono
    };

    const resCliente = await actualizarCliente(cliente, clienteEditando.id);
    if (resCliente.ok) {
      // Actualiza la mascota si es necesario
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

  const manejarEliminar = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de eliminar este cliente?');
    if (confirmacion) {
      await borrarCliente(id);
      setClientes(clientes.filter(cliente => cliente.id !== id));
    }
  };

  useEffect(() => {
    if (clienteEditando) {
      const { cedula, nombre, telefono } = clienteEditando;
      setIsGuardarDisabled(!cedula || !nombre || !telefono);
    } else {
      setIsGuardarDisabled(true);
    }
  }, [clienteEditando]);

  const manejarCambioBusqueda = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    cliente.cedula.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  const indiceUltimoCliente = paginaActual * clientesPorPagina;
  const indicePrimerCliente = indiceUltimoCliente - clientesPorPagina;
  const clientesActuales = clientesFiltrados.slice(indicePrimerCliente, indiceUltimoCliente);

  const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);

  return (
    <div className="relative min-h-screen flex flex-col bg-fondo2 bg-cover">
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
              placeholder="Buscar por Nombre de Cliente o Cédula"
              value={terminoBusqueda}
              onChange={manejarCambioBusqueda}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {clientesActuales.map(cliente => (
                <div key={cliente.id} className="flex flex-col bg-amber-700 bg-opacity-90 border border-black w-full">
                  <div className="relative p-4 w-full flex justify-center">
                    <img
                      src={imgCliente}
                      alt={cliente.nombre}
                      className="h-32 w-32 md:h-48 md:w-48 object-cover rounded-lg cursor-pointer"
                      onClick={() => abrirModalMascotas(cliente)} // Abrir modal al hacer clic en la imagen
                    />
                    <MostrarMascotas
                      isOpen={modalIsOpenMascotas}
                      mascotas={mascotasSelecionadas}
                      cargarClientes={cargarClientes}
                      nombreCliente={clienteSeleccionado ? clienteSeleccionado.nombre : ''}
                      cedula={clienteSeleccionado ? clienteSeleccionado.cedula : ''}
                      agregarMascota={agregarMascota}
                      actualizarMascota={editarMascota}
                      eliminarCliente={eliminarCliente}
                      setMascotasSelecionadas={setMascotasSelecionadas}
                      cerrar={cerrarModalMascotas}
                    />
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
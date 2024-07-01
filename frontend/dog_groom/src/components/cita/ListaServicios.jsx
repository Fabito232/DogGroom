import { useState, useEffect } from 'react';
import { obtenerServicios, actualizarServicio, borrarServicio, crearServicio } from '../../services/paqueteServices.js';
import PropTypes from 'prop-types';
import { notificarError, notificarExito } from '../../utilis/notificaciones.js';
import AgregarServicio from './AgregarServicio';
import { obtenerTipoMascotas } from '../../services/tipoAnimal.js';
import Header from '../Header.jsx';
import { FontAwesomeIcon, faTrashCan, faPenToSquare} from '../../utilis/iconos.js'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ListaServicios = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [tiposMascota, setTiposMascota] = useState([]);
  const [buscarPalabra, setBuscarPalabra] = useState('');
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
  const [modo, setModo] = useState('agregar');
  const [servicioActual, setServicioActual] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [servicioPorPagina] = useState(5); // Cantidad de servicios por página

  useEffect(() => {
    setServiciosFiltrados(
      servicios.filter((servicio) =>
        servicio.descripcion.toLowerCase().includes(buscarPalabra.toLowerCase())
      )
    );
  }, [servicios, buscarPalabra]);

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    try {
      const resServicio = await obtenerServicios();
      const resTipoAnimal = await obtenerTipoMascotas();

      if (resServicio.ok) {
        const ListaServicios = resServicio.data.map(servicio => ({
          id: servicio.ID_Servicio,
          descripcion: servicio.Descripcion,
          precio: servicio.Precio,
          tipoMascota: servicio.TipoMascota
        }));

        setServicios(ListaServicios);
        console.log(resServicio);
      } else {
        console.log(resServicio);
      }

      if(resTipoAnimal.ok){  
        setTiposMascota(resTipoAnimal.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const abrirModal = (modo, servicio = null) => {
    setModo(modo);
    setServicioActual(servicio);
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
  };

  const agregarServicio = async (servicio) => {
    try {

        console.log("antes",servicio)
        const nuevoServicio = {
            descripcion: servicio.descripcion,
            precio: servicio.precio,
            ID_TipoMascota: servicio.tipoMascota.ID_TipoMascota
        }
        console.log("despues",nuevoServicio)
      const resServicio = await crearServicio(nuevoServicio);

      if (resServicio.ok) {
        console.log(resServicio);
        const nuevoServicio = {
          id: resServicio.data.ID_Servicio,
          ...servicio,
        };
        console.log("sss",nuevoServicio)
        setServicios([...servicios, nuevoServicio]);
        setModalIsOpen(false);
        notificarExito(resServicio.message);
      } else {
        notificarError(resServicio);
      }
    } catch (error) {
      notificarError(error);
    }
  };

  const editarServicio = async (servicioEditado) => {
    try {
      console.log(servicioEditado);
      const servicioActualizado = {
        descripcion: servicioEditado.descripcion,
        precio: servicioEditado.precio,
        ID_TipoMascota: servicioEditado.tipoMascota.ID_TipoMascota
      };
      const resServicio = await actualizarServicio(servicioActualizado, servicioEditado.id);
      if (resServicio.ok) {
        const servicioActualizado = servicios.map((servicio) =>
          servicio.id === servicioEditado.id ? servicioEditado : servicio
        );
        setServicios(servicioActualizado);
        setModalIsOpen(false);
        notificarExito("Se actualizó el servicio correctamente");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarServicio = async (id) => {
    const resultado = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
        try {
            await borrarServicio(id);
            toast.success('Se eliminó el servicio', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const updatedGastos = servicios.filter((servicio) => servicio.id !== id);
            setServicios(updatedGastos);
        } catch (error) {
            toast.error(`Error al eliminar el servicio: ${error.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.error('Error al eliminar el servicio:', error);
        }
    }
};

  // Paginación
  const indiceUltimoGasto = paginaActual * servicioPorPagina;
  const indicePrimerGasto = indiceUltimoGasto - servicioPorPagina;
  const serviciosActuales = serviciosFiltrados.slice(indicePrimerGasto, indiceUltimoGasto);

  const numerosDePagina = [];
  for (let i = 1; i <= Math.ceil(serviciosFiltrados.length / servicioPorPagina); i++) {
    numerosDePagina.push(i);
  }

  const paginar = (numeroDePagina) => setPaginaActual(numeroDePagina);
  const manejarAnterior = () => setPaginaActual((prev) => Math.max(prev - 1, 1));
  const manejarSiguiente = () => setPaginaActual((prev) => Math.min(prev + 1, numerosDePagina.length));

  const obtenerPaginasVisibles = () => {
    if (numerosDePagina.length <= 3) {
      return numerosDePagina;
    } else if (paginaActual <= 2) {
      return [1, 2, 3];
    } else if (paginaActual >= numerosDePagina.length - 1) {
      return [numerosDePagina.length - 2, numerosDePagina.length - 1, numerosDePagina.length];
    } else {
      return [paginaActual - 1, paginaActual, paginaActual + 1];
    }
  };

  const paginasVisibles = obtenerPaginasVisibles();

  return (
    <>
    <Header></Header>
    <div className="bg-slate-400 bg-cover min-h-screen justify-center">
    <div className='md:container md:mx-auto p-5'>
      <div className="p-6 bg-amber-700 container bg-opacity-95 rounded-lg">
        <h1 className="text-3xl text-center text-white font-bold mb-4">Servicios de La Bandada </h1>
        <div className='flex justify-between mb-4'>
          <div>
            <input
              type="text"
              placeholder="Buscar servicio..."
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={buscarPalabra}
              onChange={(e) => setBuscarPalabra(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={() => abrirModal('agregar')}
              className="mb-4 px-4 py-2 font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Agregar Servicio
            </button>
            <AgregarServicio
              isOpen={modalIsOpen}
              cerrar={cerrarModal}
              agregarServicio={agregarServicio}
              editarServicio={editarServicio}
              servicio={servicioActual}
              modo={modo}
              tiposMascota={tiposMascota}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-lime-600 border-b text-lg">
                <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Tipo Animal</th>              
                <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {serviciosActuales.map((servicio) => (
                <tr key={servicio.id} className="border-b border-gray-300">
                  <td className="px-6 py-4 text-center whitespace-nowrap">{servicio.descripcion}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">${servicio.precio}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">{servicio.tipoMascota.Descripcion}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap flex justify-center items-center space-x-2">
                    <button
                      className="px-4 py-1 bg-blue-600 w-24 text-white rounded-md mr-2 hover:bg-blue-700 focus:outline-none"
                      onClick={() => abrirModal('editar', servicio)}
                    >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="px-4 py-1 bg-red-600 w-24 text-white rounded-md  hover:bg-red-700 focus:outline-none"
                      onClick={() => eliminarServicio(servicio.id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {serviciosActuales.length === 0 ? (
            <h1 className="text-3xl font-bold m-5 text-center">Aún no se han agregado servicios</h1>
          ) : ( 
            <div className="flex justify-center mt-4">
              <nav>
                <ul className="flex items-center">
                  <li className="mr-6">
                    <button
                      onClick={manejarAnterior}
                      className={`px-8 py-2 text-xl bg-white text-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none ${paginaActual === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                      disabled={paginaActual === 1}
                    >
                      &laquo;
                    </button>
                  </li>
                  {paginasVisibles.map((numero) => (
                    <li key={numero} className="cursor-pointer mx-1">
                      <button
                        onClick={() => paginar(numero)}
                        className={`px-4 py-2 text-xl ${paginaActual === numero ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-md hover:bg-blue-600 hover:text-white focus:outline-none`}
                      >
                        {numero}
                      </button>
                    </li>
                  ))}
                  <li className="ml-6">
                    <button
                      onClick={manejarSiguiente}
                      className={`px-8 py-2 text-xl bg-white text-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none ${paginaActual === numerosDePagina.length ? 'cursor-not-allowed opacity-50' : ''}`}
                      disabled={paginaActual === numerosDePagina.length}
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

ListaServicios.propTypes = {
  actualizarFinanzasAnuales: PropTypes.func
};

export default ListaServicios;
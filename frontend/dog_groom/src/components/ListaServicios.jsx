import { useState, useEffect } from 'react';
import { obtenerServicios, actualizarServicio, borrarServicio, crearServicio } from '../services/paqueteServices';
import PropTypes from 'prop-types';
import { useConfirm } from './ModalConfirmacion';
import { notificarError, notificarExito } from '../utilis/notificaciones';
import AgregarServicio from './AgregarServicio';
import { obtenerTipoMascotas } from '../services/tipoAnimal';
import Header from './Header';
import { FontAwesomeIcon, faTrashCan, faPenToSquare} from '../utilis/iconos.js'

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

  const openConfirmModal = useConfirm();

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

  const eliminarGasto = async (id) => {
    openConfirmModal('¿Estás seguro de que deseas eliminar este elemento?', async () => {
      try {
        const resGasto = await borrarServicio(id);
        if (resGasto.ok) {
          const updatedGastos = servicios.filter((servicio) => servicio.id !== id);
          setServicios(updatedGastos);
          notificarExito("Se borró exitosamente el servicio");
        }
      } catch (error) {
        console.log(error);
      }
      console.log('Elemento eliminado');
    });
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
    <div className='md:container md:mx-auto p-5'>
    <div className="p-6 bg-amber-700 container bg-opacity-95 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Servicios de La Bandada </h1>
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
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Tipo Animal</th>              
              <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {serviciosActuales.map((servicio) => (
              <tr key={servicio.id} className="border-b border-gray-300">
                <td className="px-6 py-4 whitespace-nowrap">{servicio.descripcion}</td>
                <td className="px-6 py-4 whitespace-nowrap">${servicio.precio}</td>
                <td className="px-6 py-4 whitespace-nowrap">{servicio.tipoMascota.Descripcion}</td>
                <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center space-x-2">
                  <button
                    className="px-4 py-1 bg-blue-600 text-white rounded-md mr-2 hover:bg-blue-700 focus:outline-none"
                    onClick={() => abrirModal('editar', servicio)}
                  >
                   <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="px-4 py-1 bg-red-600 text-white rounded-md  hover:bg-red-700 focus:outline-none"
                    onClick={() => eliminarGasto(servicio.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex items-center">
            <li>
              <button
                onClick={manejarAnterior}
                className={`px-3 py-1 bg-white text-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none ${
                  paginaActual === 1 ? 'cursor-not-allowed opacity-50' : ''
                }`}
                disabled={paginaActual === 1}
              >
                &laquo;
              </button>
            </li>
            {paginasVisibles.map((numero) => (
              <li key={numero} className="cursor-pointer mx-1">
                <button
                  onClick={() => paginar(numero)}
                  className={`px-3 py-1 ${
                    paginaActual === numero
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600'
                  } rounded-md hover:bg-blue-600 hover:text-white focus:outline-none`}
                >
                  {numero}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={manejarSiguiente}
                className={`px-3 py-1 bg-white text-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none ${
                  paginaActual === numerosDePagina.length ? 'cursor-not-allowed opacity-50' : ''
                }`}
                disabled={paginaActual === numerosDePagina.length}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
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

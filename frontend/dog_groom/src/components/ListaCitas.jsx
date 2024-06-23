import { useState, useEffect } from 'react';
import { obtenerCitas, actualizarCita, borrarCita, crearCita } from '../services/citaServices.js'
import { useConfirm } from './ModalConfirmacion';
import { notificarError, notificarExito } from '../utilis/notificaciones';
import Header from './Header';
import { FontAwesomeIcon, faTrashCan, faPenToSquare} from '../utilis/iconos.js'
import dayjs from 'dayjs';

const ListaCitas = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [citas, setCitas] = useState([]);
  const [buscarPalabra, setBuscarPalabra] = useState('');
  const [citasFiltrados, setCitasFiltrados] = useState([]);
  const [modo, setModo] = useState('agregar');
  const [citaActual, setCitaActual] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [citaPorPagina] = useState(5); // Cantidad de citas por página

  const openConfirmModal = useConfirm();

  useEffect(() => {
    setCitasFiltrados(
      citas.filter((cita) =>
        cita.cliente.toLowerCase().includes(buscarPalabra.toLowerCase()) ||
        cita.fechaYHora.toLowerCase().includes(buscarPalabra.toLowerCase()) 
      )
    );
  }, [citas, buscarPalabra]);

  useEffect(() => {
    cargarCitas();
  }, []);

  const cargarCitas = async () => {
    try {
      const resCita = await obtenerCitas();
      console.log(resCita)
      if (resCita.ok) {
        const ListaCitas = resCita.data.map(cita => ({
          id: cita.ID_Cita,
          descripcion: cita.Descripcion,
          servicio:cita.Servicio.Descripcion,
          estado: cita.Estado,
          montoAdicional: cita.MontoAdicional,
          montoTotal: cita.MontoTotal,
          fechaYHora: dayjs(cita.FechaYHora).format('YYYY-MM-DD HH:mm'),
          cliente: cita.Cliente.Nombre
        }));
        
        console.log( )
        setCitas(ListaCitas);
        console.log(ListaCitas);
      } else {
        console.log(resCita);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const abrirModal = (modo, cita = null) => {
    setModo(modo);
    setCitaActual(cita);
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
  };

  const agregarCita = async (cita) => {

  };

  const editarCita = async (citaEditado) => {
    try {
      console.log(citaEditado);
      const citaActualizado = {
        descripcion: citaEditado.descripcion,
        precio: citaEditado.precio,
        ID_TipoMascota: citaEditado.tipoMascota.ID_TipoMascota
      }
      const resCita = await actualizarCita(citaActualizado, citaEditado.id);
      if (resCita.ok) {
        const citaActualizado = citas.map((cita) =>
          cita.id === citaEditado.id ? citaEditado : cita
        );
        setCitas(citaActualizado);
        setModalIsOpen(false);
        notificarExito("Se actualizó el cita correctamente")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarGasto = async (id) => {

    openConfirmModal('¿Estás seguro de que deseas eliminar este elemento?', async () => {
      try {
        const resGasto = await borrarCita(id);
        if (resGasto.ok) {
          const updatedGastos = citas.filter((cita) => cita.id !== id);
          setCitas(updatedGastos);
          notificarExito("Se borro existosamente el cita")
        }
      } catch (error) {
        console.log(error);
      }
      console.log('Elemento eliminado');
    });

  };

  // Paginación
  const indiceUltimoGasto = paginaActual * citaPorPagina;
  const indicePrimerGasto = indiceUltimoGasto - citaPorPagina;
  const citasActuales = citasFiltrados.slice(indicePrimerGasto, indiceUltimoGasto);

  const numerosDePagina = [];
  for (let i = 1; i <= Math.ceil(citasFiltrados.length / citaPorPagina); i++) {
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
    <div className="p-6 bg-gray-100 container">
      <h1 className="text-3xl font-bold mb-4">Citas de La Bandada </h1>
      <div className='flex justify-between mb-4'>
        <div>
          <input
            type="text"
            placeholder="Buscar cita..."
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
            Agregar Cita
          </button>

        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">Fecha</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>   
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Descripcion</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>              
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Monto Adicional</th>              
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Monto Total</th>                          
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citasActuales.map((cita) => (
              <tr key={cita.id} className="border-b border-gray-300">
                <td className="px-6 py-4 whitespace-nowrap text-center">{cita.fechaYHora}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{cita.cliente}</td>
                <td className="px-6 py-4 whitespace-normal text-center">{cita.descripcion}</td>
                <td className="px-6 py-4 whitespace-normal text-center">{cita.servicio}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${cita.estado ? 'bg-green-500' : 'bg-gray-500'}`}>

                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{cita.montoAdicional}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{cita.montoTotal}</td>   
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    className="px-4 py-1 bg-blue-600 text-white rounded-md mr-2 hover:bg-blue-700 focus:outline-none"
                    onClick={() => abrirModal('editar', cita)}
                  >
                   <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="px-4 py-1 bg-red-600 text-white rounded-md  hover:bg-red-700 focus:outline-none"
                    onClick={() => eliminarGasto(cita.id)}
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

export default ListaCitas;

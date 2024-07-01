import { useState, useEffect } from 'react';
import { obtenerCitas, borrarCita, } from '../../services/citaServices.js'
import { notificarExito } from '../../utilis/notificaciones.js';
import Header from '../Header.jsx';
import { FontAwesomeIcon, faTrashCan, faAddressCard} from '../../utilis/iconos.js'
import dayjs from 'dayjs';
import AgendarCita from './AgendarCita.jsx';
import Resumen from './ResumenCita.jsx'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ListaCitas = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenSummary, setModalIsOpenSummary] = useState(false);
  const [citas, setCitas] = useState([]);
  const [buscarPalabra, setBuscarPalabra] = useState('');
  const [citasFiltrados, setCitasFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [citaPorPagina] = useState(10); // Cantidad de citas por página
  const [citaActual, setCitaActual] = useState();

  useEffect(() => {
    setCitasFiltrados(
      citas.filter((cita) =>
        cita.cliente.nombre.toLowerCase().includes(buscarPalabra.toLowerCase()) ||
        cita.fechaYHora.toLowerCase().includes(buscarPalabra.toLowerCase()) 
      )
    );
  }, [citas, buscarPalabra]);

  useEffect(() => {
    cargarCitas();
  }, [modalIsOpen, modalIsOpenSummary]);

  const cargarCitas = async () => {
    try {
      const resCita = await obtenerCitas();
      console.log(resCita)
      if (resCita.ok) {

        const ListaCitas = resCita.data.map(cita => ({
          id: cita.ID_Cita,
          start: dayjs(cita.FechaYHora).toDate(), 
          fechaYHora: dayjs(cita.FechaYHora).format('YYYY-MM-DD HH:mm'),
          cedula: cita.Cliente.Cedula, 
          descripcion: cita.Descripcion, 
          estado: cita.Estado, 
          montoTotal: parseFloat(cita.MontoTotal), 
          montoAdicional: parseFloat(cita.MontoAdicional), 
          cliente: { 
            nombre: cita.Cliente.Nombre,
            cedula: cita.Cliente.Cedula,
            telefono: cita.Cliente.Telefono
          },
          mascotas:{
              id: cita.Mascotum.ID_Mascota,
              nombre: cita.Mascotum.Nombre,
              raza: cita.Mascotum.Raza,
              tipoMascota: cita.Mascotum.TipoMascotum.Descripcion,
              fotoURL: cita.Mascotum.FotoURL
          },
          servicio: { 
            id_servicio: cita.Servicio ? cita.Servicio.ID_Servicio : 1,
            descripcion: cita.Servicio ? cita.Servicio.Descripcion : "No existe",
            precio: parseFloat(cita.Servicio) ? parseFloat(cita.Servicio.Precio) : 0
          }
        }));
        const ordenarPorfechas = ListaCitas.sort((a, b) => new Date(b.fechaYHora) - new Date(a.fechaYHora));
        console.log(ordenarPorfechas)
        setCitas(ordenarPorfechas);
      } else {
        console.log(resCita);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const abrirModalResumen = (cita) => {
    setCitaActual(cita)
    setModalIsOpenSummary(true)
  };

  const cerrarModalResumen = () => {
    setModalIsOpenSummary(false);
  };

  const agregarCita = async () => {
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
  };

  const eliminarCita = async (id) => {
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
                const resCita = await borrarCita(id);
                if (resCita.ok) {
                  const updatedGastos = citas.filter((cita) => cita.id !== id);
                  setCitas(updatedGastos);
                  notificarExito("Se borro existosamente la cita")
                }
            } catch (error) {
                toast.error(`Error al eliminar la mascota: ${error.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.error('Error al eliminar la mascota:', error);
            }
        }
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
    <div className="p-6 bg-amber-700 container bg-opacity-95 rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Citas de La Bandada </h1>
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
            onClick={agregarCita}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Agregar Cita
          </button>
          <AgendarCita 
            isOpen={modalIsOpen}
            cerrar={cerrarModal}
          />

        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
          <tr className="bg-lime-600 border-b text-lg">
              <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider ">Fecha</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Cliente</th>   
              <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Descripcion</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Servicio</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Estado</th>                           
              <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Monto Total</th>                          
              <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citasActuales.map((cita) => (
              <tr key={cita.id} className="border-b border-gray-300">
                <td className="px-6 py-4 whitespace-nowrap text-center">{cita.fechaYHora}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{cita.cliente.nombre}</td>
                <td className="px-6 py-4 whitespace-normal text-center">{cita.descripcion}</td>
                <td className="px-6 py-4 whitespace-normal text-center">{cita.servicio.descripcion}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${cita.estado ? 'bg-green-500' : 'bg-gray-500'}`}>
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{cita.montoTotal}</td>   
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    className="px-4 py-1 bg-blue-600 text-white rounded-md mr-2 hover:bg-blue-700 focus:outline-none"
                    onClick={() => abrirModalResumen(cita)}
                  >
                   <FontAwesomeIcon icon={faAddressCard} />
                  </button>
                  <Resumen
                  isOpen={modalIsOpenSummary}
                  cerrar={cerrarModalResumen}
                  cita={citaActual}
                  agregarCita={agregarCita}
                  />
                  <button
                    className="px-4 py-1 bg-red-600 text-white rounded-md  hover:bg-red-700 focus:outline-none"
                    onClick={() => eliminarCita(cita.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {citasActuales.length === 0 ? (
            <h1 className="text-3xl font-bold m-5 text-center">Aún no se han agregado citas</h1>
      ) : (
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
       )}
      </div>
    </div>
  </>
  );
};

export default ListaCitas;

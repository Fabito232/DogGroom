import { useEffect, useState } from 'react';
import { URL_Hosting } from '../../services/api.js';
import Cliente from '../../assets/img_perro.jpg';
import { notificarError } from '../../utilis/notificaciones';
import AgregarMascota from './AgregarMascota';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { obtenerTipoMascotas } from '../../services/tipoAnimal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const MostrarMascota = ({ isOpen, mascotas, nombreCliente, cedula, agregarMascota, actualizarMascota, eliminarCliente, cerrar }) => {
    const [mascotaEditando, setMascotaEditando] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modo, setModo] = useState('agregar');
    const [tiposMascota, setTiposMascota] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [mascotasPorPagina] = useState(2); // Cantidad de mascotass por página


    const manejarEliminar = async (id) => {
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
                manejarAnterior()
                await eliminarCliente(id);
                toast.success('Se eliminó la mascota', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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

    const abrirModal = (modo, mascota = null) => {
        setModo(modo);
        setMascotaEditando(mascota);
        setModalIsOpen(true);
    };

    const cerrarModal = () => {
        setModalIsOpen(false);
    };

    const cargarTiposMascotas = async () => {
        try {
            const resTipoAnimal = await obtenerTipoMascotas();
            if (resTipoAnimal.ok) {
                setTiposMascota(resTipoAnimal.data);
            }
        } catch (error) {
            notificarError(error);
        }
    };

    useEffect(() => {
        cargarTiposMascotas();
    }, []);

    const guardarMascota = async (mascota) => {
        const nuevaMascota = {
            Nombre: mascota.nombre,
            Raza: mascota.raza,
            ID_TipoMascota: mascota.tipoMascota.ID_TipoMascota,
            Foto: mascota.fotoURL,
            ID_Cliente: cedula,
            TipoMascotum: mascota.tipoMascota,
        };
        if (modo === 'agregar') {
            agregarMascota(nuevaMascota);
        } else if (modo === "editar") {
            actualizarMascota(nuevaMascota, mascota.ID_Mascota);
        }
    };
      // Paginación
  const indiceUltimoMascotas = paginaActual * mascotasPorPagina;
  const indicePrimerMascotas = indiceUltimoMascotas - mascotasPorPagina;
  const mascotasActuales = mascotas.slice(indicePrimerMascotas, indiceUltimoMascotas);

  const numerosDePagina = [];
  for (let i = 1; i <= Math.ceil(mascotas.length / mascotasPorPagina); i++) {
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
        <Modal
            isOpen={isOpen}
            onRequestClose={cerrar}
            contentLabel="Mascotas del Cliente"
            className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-25"
            overlayClassName="fixed inset-0"
        >
            <div className="bg-gray-300 p-4 rounded-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-4xl w-full relative">
                <button onClick={cerrar} className="absolute top-2 right-2 bg-red-600 text-white hover:bg-red-700 text-2xl p-1 rounded">X</button>
                <h2 className="text-xl font-bold mb-4">Mascotas de: {nombreCliente}</h2>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mb-4"
                    onClick={() => abrirModal('agregar')}
                >
                    Agregar Mascota
                </button>
                <AgregarMascota
                    isOpen={modalIsOpen}
                    cerrar={cerrarModal}
                    guardarMascota={guardarMascota}
                    mascota={mascotaEditando}
                    modo={modo}
                    tiposMascota={tiposMascota}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {mascotasActuales.map((mascota) => (
                        <div key={mascota.ID_Mascota} className="flex items-center w-full h-full bg-amber-700 bg-opacity-90 border border-black p-4 rounded-md">
                            <div className="w-full h-full">
                                <img
                                    src={mascota.FotoURL ? `${URL_Hosting}${mascota.FotoURL}` : Cliente}
                                    alt={mascota.Nombre}
                                    onError={(event) => event.target.src = Cliente}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col justify-between p-4 w-full">
                                <div className="w-full">
                                    <div className="flex items-center mb-2">
                                        <div className="font-bold mr-2">Nombre:</div>
                                        <div className="bg-white p-1 rounded flex-grow">{mascota.Nombre}</div>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <div className="font-bold mr-2">Raza:</div>
                                        <div className="bg-white p-1 rounded flex-grow">{mascota.Raza}</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="font-bold mr-2">Tamaño:</div>
                                        <div className="bg-white p-1 rounded flex-grow">
                                            {mascota.ID_TipoMascota === 1 ? "Grande" : "Pequeño"}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-2">
                                    <div className="flex w-full space-x-2 mt-4">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md flex-1"
                                            onClick={() => abrirModal('editar', mascota)} 
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button
                                            className="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-4 rounded-md flex-1"
                                            onClick={() => manejarEliminar(mascota.ID_Mascota)}
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4">
              <nav>
                <ul className="flex items-center">
                  <li className="mr-6">
                    <button
                      onClick={manejarAnterior}
                      className={`px-4 py-1 text-xl bg-white text-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none ${paginaActual === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                      disabled={paginaActual === 1}
                    >
                      &laquo;
                    </button>
                  </li>
                  {paginasVisibles.map((numero) => (
                    <li key={numero} className="cursor-pointer mx-1">
                      <button
                        onClick={() => paginar(numero)}
                        className={`px-4 py-1 text-xl ${paginaActual === numero ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-md hover:bg-blue-600 hover:text-white focus:outline-none`}
                      >
                        {numero}
                      </button>
                    </li>
                  ))}
                  <li className="ml-6">
                    <button
                      onClick={manejarSiguiente}
                      className={`px-4 py-1 text-xl bg-white text-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none ${paginaActual === numerosDePagina.length ? 'cursor-not-allowed opacity-50' : ''}`}
                      disabled={paginaActual === numerosDePagina.length}
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            </div>
        </Modal>
    );
};

MostrarMascota.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    mascotas: PropTypes.array.isRequired,
    nombreCliente: PropTypes.string.isRequired,
    cedula: PropTypes.string.isRequired,
    agregarMascota: PropTypes.func.isRequired,
    actualizarMascota: PropTypes.func.isRequired,
    eliminarCliente: PropTypes.func.isRequired,
    cerrar: PropTypes.func.isRequired,
};

export default MostrarMascota;

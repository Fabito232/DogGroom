import { useEffect, useState } from 'react';
import { URL_Hosting } from '../services/api';
import Cliente from '../assets/img_perro.jpg';
import { actualizarMascota, borrarMascota } from '../services/mascotaService';
import { notificarError, notificarExito } from '../utilis/notificaciones';
import AgregarMascota from './AgregarMascota';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { obtenerTipoMascotas } from '../services/tipoAnimal';
import { actualizarCliente } from '../services/clienteService';

Modal.setAppElement('#root');

const MostrarMascota = ({ isOpen, cerrar, clienteSeleccionado, cargarClientes }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modo, setModo] = useState('agregar');
    const [tiposMascota, setTiposMascota] = useState([]);
    const [paginaActual, setPaginaActual] = useState(0);

    const [mascotaEditando, setMascotaEditando] = useState(null);

    const MASCOTAS_POR_PAGINA = 2;

    const manejarCambioEntradaEdicion = (e) => {
        if (!mascotaEditando) return;
        const { name, value } = e.target;
        setMascotaEditando({ ...mascotaEditando, [name]: value });
    };

    const manejarGuardar = async (mascota) => {
        try {
            await actualizarMascota(mascota, mascota.ID_Mascota);
            setMascotaEditando(null);
            cargarClientes();
        } catch (error) {
            console.error('Error al actualizar la mascota:', error);
        }
    };

    const manejarEliminar = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de eliminar esta mascota?');
        if (confirmacion) {
            try {
                await borrarMascota(id);
                setMascotaEditando(null);
                cargarClientes();
            } catch (error) {
                console.error('Error al eliminar la mascota:', error);
            }
        }
    };

    const abrirModal = (modo) => {
        setModo(modo);
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

    const agregarMascota = async (mascota) => {
        try {
            const nuevaMascota = {
                fotoURL: mascota.FotoURL,
                nombre: mascota.nombre,
                raza: mascota.raza,
                tipoMascota: mascota.tipoMascota.ID_TipoMascota,
            };

            const mascotasActuales = clienteSeleccionado.mascotas || [];
            const mascotasActualizadas = [...mascotasActuales, nuevaMascota];
            clienteSeleccionado.mascotas = mascotasActualizadas;

            const resCliente = await actualizarCliente(clienteSeleccionado, clienteSeleccionado.id);

            if (resCliente.ok) {
                setModalIsOpen(false);
                notificarExito(resCliente.message);
            } else {
                notificarError(resCliente.message);
            }
        } catch (error) {
            notificarError(error);
        }
    };

    const totalPaginas = Math.ceil((clienteSeleccionado?.mascotas?.length || 0) / MASCOTAS_POR_PAGINA);

    const irAPagina = (numeroPagina) => {
        if (numeroPagina >= 0 && numeroPagina < totalPaginas) {
            setPaginaActual(numeroPagina);
        }
    };

    const mascotasPaginadas = clienteSeleccionado?.mascotas?.slice(
        paginaActual * MASCOTAS_POR_PAGINA,
        (paginaActual + 1) * MASCOTAS_POR_PAGINA
    ) || [];

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={cerrar}
            contentLabel="Mascotas del Cliente"
            className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-25"
            overlayClassName="fixed inset-0"
        >
            <div className="bg-gray-300 p-4 rounded-lg max-w-6xl w-full relative">
                <button onClick={cerrar} className="absolute top-2 right-2 bg-red-600 text-white hover:bg-red-700 text-2xl p-1 rounded">X</button>
                <h2 className="text-xl font-bold mb-4">Mascotas de: {clienteSeleccionado ? clienteSeleccionado.nombre : ''}</h2>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mb-4"
                    onClick={() => abrirModal('agregar')}
                >
                    Agregar Mascota
                </button>
                <AgregarMascota
                    isOpen={modalIsOpen}
                    cerrar={cerrarModal}
                    agregarMascota={agregarMascota}
                    mascota={null}
                    modo={modo}
                    tiposMascota={tiposMascota}
                />
                <div className="grid grid-cols-2 gap-4">
                    {mascotasPaginadas.map((mascota) => (
                        <div key={mascota.ID_Mascota} className="flex items-center w-full h-full bg-amber-700 bg-opacity-90 border border-black p-4 rounded-md">
                            <div className="w-full h-full">
                                <img
                                    src={mascota.FotoURL ? `${URL_Hosting}${mascota.FotoURL}` : Cliente}
                                    alt={mascota.Nombre}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col justify-between p-4 w-full">
                                <div className="w-full">
                                    <div className="flex items-center mb-2">
                                        <div className="font-bold mr-2">Nombre:</div>
                                        {mascotaEditando && mascotaEditando.ID_Mascota === mascota.ID_Mascota ? (
                                            <input
                                                type="text"
                                                name="Nombre"
                                                value={mascotaEditando.Nombre}
                                                onChange={manejarCambioEntradaEdicion}
                                                className="block w-full p-1 border border-gray-300 rounded"
                                            />
                                        ) : (
                                            <div className="bg-white p-1 rounded flex-grow">{mascota.Nombre}</div>
                                        )}
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <div className="font-bold mr-2">Raza:</div>
                                        {mascotaEditando && mascotaEditando.ID_Mascota === mascota.ID_Mascota ? (
                                            <input
                                                type="text"
                                                name="Raza"
                                                value={mascotaEditando.Raza}
                                                onChange={manejarCambioEntradaEdicion}
                                                className="block w-full p-1 border border-gray-300 rounded"
                                            />
                                        ) : (
                                            <div className="bg-white p-1 rounded flex-grow">{mascota.Raza}</div>
                                        )}
                                    </div>
                                    <div className="flex items-center">
                                        <div className="font-bold mr-2">Tamaño:</div>
                                        {mascotaEditando && mascotaEditando.ID_Mascota === mascota.ID_Mascota ? (
                                            <select
                                                name="ID_TipoMascota"
                                                value={mascotaEditando.ID_TipoMascota}
                                                onChange={manejarCambioEntradaEdicion}
                                                className="block w-full p-1 border border-gray-300 rounded"
                                            >
                                                <option value={1}>Grande</option>
                                                <option value={2}>Pequeño</option>
                                            </select>
                                        ) : (
                                            <div className="bg-white p-1 rounded flex-grow">
                                                {mascota.ID_TipoMascota === 1 ? "Grande" : "Pequeño"}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-2">
                                    {mascotaEditando && mascotaEditando.ID_Mascota === mascota.ID_Mascota ? (
                                        <div className="flex w-full space-x-2">
                                            <button
                                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex-1"
                                                onClick={() => manejarGuardar(mascotaEditando)}
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex-1"
                                                onClick={() => setMascotaEditando(null)}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex w-full space-x-2">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex-1"
                                                onClick={() => setMascotaEditando({ ...mascota })}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md flex-1"
                                                onClick={() => manejarEliminar(mascota.ID_Mascota)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-4 w-full">
                    <button
                        onClick={() => irAPagina(paginaActual - 1)}
                        disabled={paginaActual === 0}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => irAPagina(paginaActual + 1)}
                        disabled={paginaActual === totalPaginas - 1}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </Modal>
    );
};

MostrarMascota.propTypes = {
    isOpen: PropTypes.bool,
    cerrar: PropTypes.func,
    clienteSeleccionado: PropTypes.object,
    cargarClientes: PropTypes.func
};

export default MostrarMascota;

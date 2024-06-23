import React, { useState } from 'react';
import { URL_Hosting } from '../services/api';
import Cliente from '../assets/img_perro.jpg';
import { crearMascota, actualizarMascota, borrarMascota } from '../services/mascotaService';
import AgregarMascota from './AgregarMascota';
import { notificarError, notificarExito } from '../utilis/notificaciones';

const MostrarMascota = ({ mascotas, onClose, cargarClientes, nombreCliente }) => {
    const [agregarNuevaMascota, setAgregarNuevaMascota] = useState([]);
    const [mascotaEditando, setMascotaEditando] = useState(null);
    const [clienteActual, setClienteActual] = useState(null);
    const [paginaActual, setPaginaActual] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modo, setModo] = useState('agregar');
    const [tiposMascota, setTiposMascota] = useState([]);

    const MASCOTAS_POR_PAGINA = 4;

    const manejarCambioEntradaEdicion = (e) => {
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

    const mascotasPaginadas = mascotas.slice(
        paginaActual * MASCOTAS_POR_PAGINA,
        (paginaActual + 1) * MASCOTAS_POR_PAGINA
    );

    const abrirModal = (modo, cliente = null) => {
        setModo(modo);
        setClienteActual(cliente);
        setModalIsOpen(true);
    };

    const cerrarModal = () => {
        setModalIsOpen(false);
    };

    const agregarMascota = async (mascota) => {
        try {
            const nuevaMascota = {
                nombre: mascota.nombre,
                raza: mascota.raza,
                tipoMascota: mascota.tipoMascota.ID_TipoMascota,
                foto: mascota.FotoURL
            }

            const resMascota = await crearMascota(nuevaMascota);

            if (resMascota.ok) {
                const nuevaMascota = {
                    id: resMascota.data.ID_Mascota,
                    ...mascota
                };
                setAgregarNuevaMascota([...agregarNuevaMascota, nuevaMascota]);
                setModalIsOpen(false);
                notificarExito(resMascota.message);
            } else {
                notificarError(resMascota);
            }
        } catch (error) {
            notificarError(error);
        }
    }

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-gray-300 p-4 rounded-md shadow-lg max-w-6xl relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-white hover:bg-red-500 text-2xl p-1 rounded">X</button>
                <h2 className="text-xl font-bold mb-4">Mascotas del Cliente: {nombreCliente}</h2>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mb-4"
                    onClick={() => abrirModal('agregar')} // Aquí puedes implementar la lógica para agregar una nueva mascota
                >
                    Agregar Mascota
                </button>
                <AgregarMascota
                    isOpen={modalIsOpen}
                    cerrar={cerrarModal}
                    agregarMascota={agregarMascota}
                    mascota={clienteActual}
                    modo={modo}
                    tiposMascota={tiposMascota}
                />
                <div className="grid grid-cols-2 gap-4">
                    {mascotasPaginadas.map((mascota) => (
                        <div key={mascota.ID_Mascota} className="flex items-center w-full h-full bg-amber-700 bg-opacity-90 border border-black p-4 rounded-md">
                            <div className="w-full h-full">
                                <img
                                    src={mascota.FotoURL ? URL_Hosting + mascota.FotoURL : Cliente}
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
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex-1"
                                                onClick={() => manejarGuardar(mascotaEditando)}
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md flex-1"
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
                        onClick={() => setPaginaActual(Math.max(paginaActual - 1, 0))}
                        disabled={paginaActual === 0}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => setPaginaActual(paginaActual + 1)}
                        disabled={(paginaActual + 1) * MASCOTAS_POR_PAGINA >= mascotas.length}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MostrarMascota;
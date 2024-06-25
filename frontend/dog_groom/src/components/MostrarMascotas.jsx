
import { useEffect, useState } from 'react';
import { URL_Hosting } from '../services/api';
import Cliente from '../assets/img_perro.jpg';
import { notificarError } from '../utilis/notificaciones';
import AgregarMascota from './AgregarMascota';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { obtenerTipoMascotas } from '../services/tipoAnimal';

Modal.setAppElement('#root');

const MostrarMascota = ({ isOpen, mascotas, nombreCliente,cedula, agregarMascota,actualizarMascota,eliminarCliente, cerrar}) => {
    const [mascotaEditando, setMascotaEditando] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modo, setModo] = useState('agregar');
    const [tiposMascota, setTiposMascota] = useState([]);
    const MASCOTAS_POR_PAGINA = 2;
    const paginaActual = 0;

    const manejarEliminar = async (id) => {
        eliminarCliente(id)
    };

    const abrirModal = (modo, mascota = null) => {
        setModo(modo);
        setMascotaEditando(mascota)
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
    }

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
        }
        if(modo === 'agregar'){
            agregarMascota(nuevaMascota)
        }else if(modo === "editar"){
            console.log(nuevaMascota,mascota.ID_Mascota )
            actualizarMascota(nuevaMascota, mascota.ID_Mascota)
        } 
    };

    const mascotasPaginadas = mascotas && mascotas.length > 0 ?
        mascotas.slice(paginaActual * MASCOTAS_POR_PAGINA, (paginaActual + 1) * MASCOTAS_POR_PAGINA) : [];

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={cerrar}
            contentLabel="Mascotas del Cliente"
            className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-25"
            overlayClassName="fixed inset-0 "
        >
            <div className="bg-gray-300 p-4 rounded-lg max-w-6xl w-full relative">
                <button onClick={cerrar} className="absolute top-2 right-2 text-gray-500 hover:text-white hover:bg-red-500 text-2xl p-1 rounded">X</button>
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
                    mascota={mascotaEditando}  // Ajusta según tu implementación de AgregarMascota
                    modo={modo}
                    tiposMascota={tiposMascota}  // Ajusta según tus tipos de mascota
                />
                <div className="grid grid-cols-2 gap-4">
                    {mascotasPaginadas.map((mascota) => (
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
                                        <div className="flex w-full space-x-2">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex-1"
                                                onClick={() => abrirModal('editar', mascota)}
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-4 w-full">
                    <button
                        onClick={() => console.log("Anterior")}  // Ajusta según necesidades
                        disabled={paginaActual === 0}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => console.log("Siguiente")}  // Ajusta según necesidades
                        disabled={(paginaActual + 1) * MASCOTAS_POR_PAGINA >= mascotas.length}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </Modal>
    );
};

MostrarMascota.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    mascotas: PropTypes.array,
    agregarMascota: PropTypes.func.isRequired,
    actualizarMascota: PropTypes.func.isRequired,
    eliminarCliente: PropTypes.func.isRequired,
    nombreCliente: PropTypes.string.isRequired,
    cedula: PropTypes.string.isRequired,
    cerrar: PropTypes.func.isRequired,
};

export default MostrarMascota;

import { useState, useEffect } from "react";
import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement('#root');

const VerMascotas = ({ isOpen, cerrar, verMascotas, modo, mascotas }) => {
    const [mascotasInfo, setMascotasInfo] = useState([]);

    useEffect(() => {
        if (modo === 'ver' && mascotas) {
            setMascotasInfo(mascotas);
        } else {
            console.error("Error: Modo no es 'ver' o mascotas están indefinidas.");
        }
    }, [modo, mascotas]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={cerrar}
            contentLabel="Ver Mascotas"
            className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-4">Mascotas del Cliente</h2>
                {mascotasInfo.map((mascota, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Mascota {index + 1}</h3>
                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">Nombre:</label>
                            <p>{mascota.Nombre}</p>
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">Raza:</label>
                            <p>{mascota.Raza}</p>
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">Tipo de Mascota:</label>
                            <p>{mascota.ID_TipoMascota}</p>
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">Foto:</label>
                            {mascota.FotoURL ? (
                                <img src={mascota.FotoURL} alt={`Foto de ${mascota.Nombre}`} className="rounded-lg" style={{ maxWidth: '100%' }} />
                            ) : (
                                <p>No hay foto disponible</p>
                            )}
                        </div>
                    </div>
                ))}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={cerrar}
                        className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

VerMascotas.propTypes = {
    isOpen: PropTypes.bool,
    cerrar: PropTypes.func,
    verMascotas: PropTypes.func,
    modo: PropTypes.string,
    mascotas: PropTypes.arrayOf(PropTypes.object)
};

export default VerMascotas;

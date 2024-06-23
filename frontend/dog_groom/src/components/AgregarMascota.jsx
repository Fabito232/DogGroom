import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement('#root');

const AgregarMascota = ({ isOpen, cerrar, agregarMascota, mascota, modo, tiposMascota, overlayClassName }) => {
    const [nuevaMascota, setNuevaMascota] = useState({ nombre: '', raza: '', tipo: {}, foto: '' });

    useEffect(() => {
        if (modo === 'agregar' && mascota) {
            setNuevaMascota(mascota);
        } else {
            setNuevaMascota({ nombre: '', raza: '', tipo: {}, foto: '' });
        }
    }, [modo, mascota]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaMascota(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeSelect = (e) => {
        const { name, value } = e.target;
        const tipoMascotaSeleccionado = tiposMascota.find(tipo => tipo.ID_TipoMascota === parseInt(value, 10));
        setNuevaMascota(prevState => ({
            ...prevState,
            [name]: tipoMascotaSeleccionado || {}
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modo === 'agregar') {
            agregarMascota(nuevaMascota);
            setNuevaMascota({ nombre: '', raza: '', tipo: {}, foto: '' });
        }
        cerrar();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={cerrar}
            contentLabel="Agregar Mascota"
            className="bg-white p-6 rounded-md shadow-md w-full"
            overlayClassName={overlayClassName}
        >
            <h2 className="text-xl mb-4">{modo === 'agregar' ? 'Agregar Mascota' : 'Editar Mascota'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={nuevaMascota.nombre}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="raza" className="block text-gray-700">Raza</label>
                    <input
                        type="text"
                        id="raza"
                        name="raza"
                        value={nuevaMascota.raza}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="tipo" className="block text-gray-700">Tipo de Mascota</label>
                    <select
                        id="tipo"
                        name="tipo"
                        value={nuevaMascota.tipo.ID_TipoMascota || ''}
                        onChange={handleChangeSelect}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        required
                    >
                        <option value="">Selecciona un tipo de mascota</option>
                        {tiposMascota.map(tipo => (
                            <option key={tipo.ID_TipoMascota} value={tipo.ID_TipoMascota}>
                                {tipo.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="foto" className="block text-gray-700">Foto</label>
                    <input
                        type="text"
                        id="foto"
                        name="foto"
                        value={nuevaMascota.foto}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={cerrar}
                        className="bg-gray-500 text-white p-2 rounded mr-2"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        {modo === 'agregar' ? 'Agregar' : 'Guardar'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

AgregarMascota.propTypes = {
    isOpen: PropTypes.bool,
    cerrar: PropTypes.func,
    agregarMascota: PropTypes.func,
    mascota: PropTypes.object,
    modo: PropTypes.string,
    tiposMascota: PropTypes.array,
    overlayClassName: PropTypes.string
};

export default AgregarMascota;

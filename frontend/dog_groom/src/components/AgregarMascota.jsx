import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement('#root');

const AgregarMascota = ({ isOpen, cerrar, agregarMascota, mascota, modo, tiposMascota }) => {
    const [nuevaMascota, setNuevaMascota] = useState({ nombre: '', raza: '', tipoMascota: {}, fotoURL: '' });

    useEffect(() => {
        if (modo === 'editar' && mascota) {
            setNuevaMascota(mascota);
        } else {
            setNuevaMascota({ nombre: '', raza: '', tipoMascota: {}, fotoURL: '' });
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
        agregarMascota(nuevaMascota);
        setNuevaMascota({ nombre: '', raza: '', tipoMascota: {}, fotoURL: '' });
        cerrar();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={cerrar}
            contentLabel="Agregar Mascota"
            className="fixed inset-0 flex items-center justify-center p-4"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-30"
        >
            <div className="bg-slate-200 rounded-lg p-6 w-full max-w-lg mx-4">
                <button onClick={cerrar} className="absolute top-2 right-2 text-gray-500 hover:text-white hover:bg-red-500 text-2xl p-1 rounded">X</button>
                <h2 className="text-xl font-bold mb-4">{modo === 'agregar' ? 'Agregar Mascota' : 'Editar Mascota'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-black-700">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={nuevaMascota.nombre}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-500 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="raza" className="block text-gray-700">Raza</label>
                        <input
                            type="text"
                            name="raza"
                            value={nuevaMascota.raza}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-500 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tipo de Mascota</label>
                        <select
                            className="w-full p-2 border border-gray-500 rounded mt-1"
                            value={nuevaMascota.tipoMascota.ID_TipoMascota || ''}
                            onChange={handleChangeSelect}
                            name="tipoMascota"
                            required
                        >
                            <option value="">Selecciona un tipo de mascota</option>
                            {tiposMascota.map((tipo) => (
                                <option key={tipo.ID_TipoMascota} value={tipo.ID_TipoMascota}>
                                    {tipo.Descripcion}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="foto" className="block text-gray-700">Foto</label>
                        <input
                            type="text"
                            name="foto"
                            value={nuevaMascota.fotoURL}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-500 rounded mt-1"
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={cerrar}
                            className="mr-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {modo === 'agregar' ? 'Agregar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

AgregarMascota.propTypes = {
    isOpen: PropTypes.bool,
    cerrar: PropTypes.func,
    agregarMascota: PropTypes.func,
    mascota: PropTypes.object,
    modo: PropTypes.string,
    tiposMascota: PropTypes.array
};

export default AgregarMascota;

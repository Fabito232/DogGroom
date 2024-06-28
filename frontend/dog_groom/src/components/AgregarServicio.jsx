import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement('#root'); // Esto es necesario para la accesibilidad

const AgregarServicio = ({ isOpen, cerrar, agregarServicio, editarServicio, servicio, modo, tiposMascota }) => {
    const [servicioInfo, setServicioInfo] = useState({ descripcion: '', precio: 0, tipoMascota: {} });

    useEffect(() => {
        if (modo === 'editar' && servicio) {
            setServicioInfo(servicio);
        } else {
            setServicioInfo({ descripcion: '', precio: '', tipoMascota: {} });
        }
    }, [modo, servicio]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServicioInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeSelect = (e) => {
        const { name, value } = e.target;
        const tipoMascotaSeleccionado = tiposMascota.find(tipo => tipo.ID_TipoMascota === parseInt(value, 10));
        setServicioInfo(prevState => ({
            ...prevState,
            [name]: tipoMascotaSeleccionado || {}
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modo === 'agregar') {
            agregarServicio(servicioInfo);
            setServicioInfo({ descripcion: '', precio: '', tipoMascota: {} });
        } else if (modo === 'editar') {
            editarServicio(servicioInfo);
        }
        cerrar();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={cerrar}
            contentLabel="Agregar Servicio"
            className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
        >
            <div className="bg-slate-200 rounded-lg p-6 w-full max-w-lg mx-4 opacity-90">
                <h2 className="text-2xl font-semibold mb-4">{modo === 'agregar' ? 'Agregar Servicio' : 'Editar Servicio'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Descripción:</label>
                        <input
                            type="text"
                            name="descripcion"
                            value={servicioInfo.descripcion}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Precio:</label>
                        <input
                            type="number"
                            name="precio"
                            value={servicioInfo.precio}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Tipo Animal:</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            id="custom-select"
                            value={servicioInfo.tipoMascota.ID_TipoMascota || ''}
                            onChange={handleChangeSelect}
                            name="tipoMascota"
                            required
                        >
                            <option value="">Seleccionar Tipo de Animal</option>
                            {tiposMascota.map((tipo) => (
                                <option key={tipo.ID_TipoMascota} value={tipo.ID_TipoMascota}>
                                    {tipo.Descripcion}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={cerrar}
                            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-500"
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

AgregarServicio.propTypes = {
    isOpen: PropTypes.bool,
    cerrar: PropTypes.func,
    agregarServicio: PropTypes.func,
    editarServicio: PropTypes.func,
    servicio: PropTypes.object,
    modo: PropTypes.string,
    tiposMascota: PropTypes.array
};

export default AgregarServicio;

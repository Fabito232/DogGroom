import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import FloatingLabelInput from '../formulario/FloatingLabelInput';


Modal.setAppElement('#root'); // Esto es necesario para la accesibilidad

const AgregarServicio = ({ isOpen, cerrar, agregarServicio, editarServicio, servicio, modo, tiposMascota }) => {
    const [servicioInfo, setServicioInfo] = useState({ descripcion: '', precio: 0, tipoMascota: {} });

    useEffect(() => {
        if (modo === 'editar' && servicio) {
            setServicioInfo(servicio);
        } else {
            setServicioInfo({ descripcion: '', precio: '', tipoMascota: {} });
        }
    }, [modo, servicio,cerrar]);

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
                <h2 className="text-center text-2xl font-semibold mb-4">{modo === 'agregar' ? 'Agregar Servicio' : 'Editar Servicio'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <FloatingLabelInput
                            type="text"
                            name="descripcion"
                            label="Descripcion"
                            value={servicioInfo.descripcion}
                            onChange={handleChange}
                            required             
                       />
                    </div>
                    <div className="mb-4">
                        <FloatingLabelInput
                            type="number"
                            name="precio"
                            label="Precio"
                            value={servicioInfo.precio}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <select
                        className="p-3 text-lg border h-12 border-gray-500  bg-slate-200 rounded-md w-full text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        id="custom-select"
                            value={servicioInfo.tipoMascota.ID_TipoMascota || ''}
                            onChange={handleChangeSelect}
                            name="tipoMascota"
                            required
                        >
                            <option value="">Tamaño de la Mascota</option>
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
                            className="mr-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-500"
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

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { URL_Hosting } from '../../services/api';
import FloatingLabelInput from '../formulario/FloatingLabelInput'


import PropTypes from 'prop-types';

Modal.setAppElement('#root');

const AgregarMascota = ({ isOpen, cerrar, guardarMascota, mascota, modo, tiposMascota }) => {
    const [nuevaMascota, setNuevaMascota] = useState({ nombre: '', raza: '', tipoMascota: {}, fotoURL: {} });
    const [fotoUrl, setFotoUrl] = useState();
    const [mostrarFoto, setMostrarFoto] = useState(false)

    useEffect(() => {
        if (modo === 'editar' && mascota) {
            const mascotaActualizar = {
                nombre: mascota.Nombre,
                ID_Cliente: mascota.ID_Cliente,
                tipoMascota: mascota.TipoMascotum,
                raza: mascota.Raza,
                ID_Mascota: mascota.ID_Mascota,
                ID_TipoMascota: mascota.ID_TipoMascota,
                fotoURL: mascota.FotoURL,
                TipoMascota: mascota.TipoMascotum
            }
            console.log(mascota)
            setMostrarFoto(true)
            setNuevaMascota(mascotaActualizar);
        } else {
            setNuevaMascota({ nombre: '', raza: '', tipoMascota: {}, fotoURL: {} });
        }
    }, [modo, mascota, cerrar]);

    const handleChange = (e) => {
        const { name, value} = e.target;
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const { name } = e.target
        console.log(name, file)
        if (file) {
            setNuevaMascota(prevState => ({
                ...prevState,
                [name]: file
            }));
            setMostrarFoto(false)
            setFotoUrl(URL.createObjectURL(file));
        }
        if(modo ==='agregar'){
            setMostrarFoto(true)
        }
        console.log(nuevaMascota)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(nuevaMascota)
        guardarMascota(nuevaMascota);
        setNuevaMascota({ nombre: '', raza: '', tipoMascota: {}, fotoURL: {} });
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
                <h2 className="text-2xl text-center font-bold mb-4">{modo === 'agregar' ? 'Agregar Mascota' : 'Editar Mascota'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <FloatingLabelInput
                            type="text"
                            name="nombre"
                            label="Nombre de la Mascota"
                            value={nuevaMascota.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <FloatingLabelInput
                            type="text"
                            name="raza"
                            label="Raza de la Mascota"
                            value={nuevaMascota.raza}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <select
                        className="p-3 text-lg border h-12 border-gray-500  bg-slate-200 rounded-md w-full text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        value={nuevaMascota.tipoMascota.ID_TipoMascota || ''}
                            onChange={handleChangeSelect}
                            name="tipoMascota"
                            required
                        >
                            <option value="">Seleccionar Tamaño</option>
                            {tiposMascota.map((tipo) => (
                                <option key={tipo.ID_TipoMascota} value={tipo.ID_TipoMascota}>
                                    {tipo.Descripcion}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-center items-center mb-6">
                            <input
                                type="file"
                                id="imagenMascota"
                                className="hidden"
                                name='fotoURL'
                                onChange={handleImageChange}
                            />
                            <label htmlFor="imagenMascota" className="cursor-pointer p-4 bg-gray-100 rounded-lg shadow-md text-center ">
                                <span className="text-lg text-gray-700">Seleccionar Imagen de la Mascota</span>
                            </label>
                                {modo==='editar' && (
                                <img src={mostrarFoto ? `${URL_Hosting}${mascota.FotoURL}` : fotoUrl} alt="Imagen de la mascota" className="h-40 w-40 object-cover mt-4 ml-4 rounded-3xl" />
                                )}
                                {(modo==='agregar' && mostrarFoto) && (
                                <img src={fotoUrl} alt="Imagen de la mascota" className="h-40 w-40 object-cover mt-4 ml-4 rounded-lg" />
                                )}
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
    guardarMascota: PropTypes.func,
    mascota: PropTypes.object,
    modo: PropTypes.string,
    tiposMascota: PropTypes.array
};

export default AgregarMascota;
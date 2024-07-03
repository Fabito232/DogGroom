import { useEffect, useState } from "react";
import { notificarExito, notificarError } from "../../utilis/notificaciones";
import { crearCliente } from "../../services/clienteService";
import { obtenerTipoMascotas } from "../../services/tipoAnimal";
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import FloatingLabelInput from '../formulario/FloatingLabelInput';
import { validarCedula,validarTelefono,validarString } from "../../utilis/validaciones";

function AgregarCliente({ isOpen, cerrar }) {
    const [cedulaCliente, setCedulaCliente] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [telefonoCliente, setTelefonoCliente] = useState('');
    const [nombreMascota, setNombreMascota] = useState('');
    const [razaMascota, setRazaMascota] = useState('');
    const [tamanoMascota, setTamanoMascota] = useState({ ID_TipoMascota: 0, Descripcion: '' });
    const [fotosMascota, setFotosMascota] = useState([]);
    const [fotoActual, setFotoActual] = useState({});
    const [fotoUrl, setFotoUrl] = useState('');
    const [mascotas, setMascotas] = useState([]);
    const [tipoMascota, setTipoMascota] = useState([]);

    useEffect(() => {
        cargarTipoMascota();
    }, []);

    useEffect(() => {
        return () => {
            setCedulaCliente('');
            setNombreCliente('');
            setTelefonoCliente('');
            setNombreMascota('');
            setRazaMascota('');
            setTamanoMascota({ ID_TipoMascota: 0, Descripcion: '' });
            setFotosMascota([]);
            setFotoActual('');
            setFotoUrl('');
            setMascotas([]);
        };
    }, [isOpen]);

    const cargarTipoMascota = async () => {
        const resTipoAnimal = await obtenerTipoMascotas();
        if (resTipoAnimal.ok) {
            setTipoMascota(resTipoAnimal.data);
        }
    };

    const handleAgregarCliente = async (e) => {
        e.preventDefault();
        
        if(validarDatos()){
            
        
        if(nombreMascota && razaMascota && tamanoMascota.ID_TipoMascota !== 0){
            await agregarMascota();
        }
        const listaMascotas = mascotas.map((mascota) => ({
            nombre: mascota.nombre,
            raza: mascota.raza,
            cedula: cedulaCliente,
            ID_TipoMascota: mascota.tipoMascota.ID_TipoMascota,
        }));
        const formData = new FormData();
        if (!listaMascotas.length) {
            const mascota = [{
                nombre: nombreMascota,
                raza: razaMascota,
                cedula: cedulaCliente,
                ID_TipoMascota: tamanoMascota.ID_TipoMascota,
            }];
            formData.append('mascotas', JSON.stringify(mascota));
            formData.append('images', fotoActual);
        } else {
            formData.append('mascotas', JSON.stringify(listaMascotas));
            fotosMascota.forEach((file) => {
                formData.append('images', file);
            });
        }
        formData.append('cedula', cedulaCliente);
        formData.append('nombre', nombreCliente);
        formData.append('telefono', telefonoCliente);
        try {
            const resCliente = await crearCliente(formData);
            if (resCliente.ok) {
                notificarExito("Cliente creado con éxito");
                cerrar();
            } else {
                notificarError(resCliente.message);
            }
        } catch (error) {
            notificarError(error.message);
        }
    }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

        if (file && fileTypes.includes(file.type)) {
            setFotoActual(file);
            setFotoUrl(URL.createObjectURL(file));
        } else {
            notificarError('Solo se permiten archivos de imagen!');
            e.target.value = null;
        }
    };

    const agregarMascota = async () => {
        if(nombreMascota && razaMascota && tamanoMascota.ID_TipoMascota !== 0){
        const mascota = {
            nombre: nombreMascota,
            raza: razaMascota,
            cedula: cedulaCliente,
            tipoMascota: tamanoMascota,
        };
        setFotosMascota([...fotosMascota, fotoActual]);
        setMascotas([...mascotas, mascota]);
        setNombreMascota('');
        setRazaMascota('');
        setTamanoMascota({ ID_TipoMascota: 0, Descripcion: '' });
        setFotoActual({});
        setFotoUrl('');
        } else {
            notificarError("Los campos de la mascota no pueden estar vacios")
        }
    };

    const validarDatos = () =>{
        if(!validarCedula(cedulaCliente)){
            notificarError("La cedula es invalida")
            return false;
        }
        if(!validarTelefono(telefonoCliente)){
            notificarError("Numero de telefono invalido")
            return false;
        }
        if(!validarString(nombreMascota) || !validarString(razaMascota)){
            notificarError("Los datos de la mascota deber tener como minimo 3 caracteres")
            return false;
        }
        
        return true
    }

    const handleChangeSelect = (e) => {
        const { value } = e.target;
        const tipoMascotaSeleccionado = tipoMascota.find(tipo => tipo.ID_TipoMascota === parseInt(value, 10));
        setTamanoMascota(tipoMascotaSeleccionado);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={cerrar}
            contentLabel="Agregar Cliente y Mascotas"
            className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75 overflow-y-auto"
        >
      <div className="relative w-auto max-w-6xl rounded-3xl p-4 md:p-8 bg-slate-200 overflow-hidden max-h-full overflow-y-auto shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Agregar Cliente y Mascotas</h2>
                <form onSubmit={handleAgregarCliente} className="space-y-4 w-full">
                    <div className="grid md:grid-cols-3 gap-6">
                        <FloatingLabelInput
                            type="text"
                            id="Cedula"
                            name="cedula"
                            label="Cédula"
                            value={cedulaCliente}
                            onChange={(e) => setCedulaCliente(e.target.value)}
                            required
                        />
                        <FloatingLabelInput
                            type="text"
                            id="NombreCliente"
                            label="Nombre del Cliente"
                            value={nombreCliente}
                            onChange={(e) => setNombreCliente(e.target.value)}
                            required
                        />
                        <FloatingLabelInput
                            type="text"
                            id="telefono"
                            label="Teléfono"
                            value={telefonoCliente}
                            onChange={(e) => setTelefonoCliente(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <FloatingLabelInput
                            type="text"
                            id="NombrePerro"
                            label="Nombre de la Mascota"
                            value={nombreMascota}
                            onChange={(e) => setNombreMascota(e.target.value)}
                            required={mascotas.length === 0}
                        />
                        <FloatingLabelInput
                            type="text"
                            id="raza"
                            label="Raza"
                            value={razaMascota}
                            onChange={(e) => setRazaMascota(e.target.value)}
                            required={mascotas.length === 0}
                        />
                        <select
                        className="p-3 text-lg border h-12 border-gray-500  bg-slate-200 rounded-md w-full text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        id="tamanno"
                        value={tamanoMascota.ID_TipoMascota}
                        onChange={handleChangeSelect}
                        required={mascotas.length === 0}
                        >
                        <option value="">Seleccionar Tamaño</option>
                        {tipoMascota.map((tipo) => (
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
                            onChange={handleImageChange}
                        />
                        <label htmlFor="imagenMascota" className="cursor-pointer p-4 bg-gray-100 rounded-lg shadow-md">
                            <span className="text-lg text-gray-700">Seleccionar Imagen de la Mascota</span>
                        </label>
                        {fotoUrl && (
                            <img src={fotoUrl} alt="Imagen de la mascota" className="h-40 w-40 object-cover mt-4 ml-4 rounded-lg" />
                        )}
                    </div>

                    <div className="flex justify-center items-center mb-6">
                        <button
                            type="button"
                            onClick={agregarMascota}
                            className="p-4 bg-blue-500 text-white text-lg rounded-lg shadow-md w-full"
                        >
                            Agregar Mascota
                        </button>
                    </div>

                    {mascotas.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Mascotas Agregadas</h3>
                            <ul className="list-disc pl-5">
                                {mascotas.map((mascota, index) => (
                                    <li key={index} className="text-gray-700">
                                        {mascota.nombre} - {mascota.raza} ({mascota.tipoMascota.Descripcion})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex justify-between items-center mb-6">
                        <button
                            type="submit"
                            className="p-4 bg-green-500 text-white text-lg rounded-lg shadow-md w-1/2 mr-2"
                        >
                            Crear Cliente
                        </button>
                        <button
                            type="button"
                            onClick={cerrar}
                            className="p-4 bg-red-500 text-white text-lg rounded-lg shadow-md w-1/2 ml-2"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>

        </Modal>
    );
}

AgregarCliente.propTypes = {
    isOpen: PropTypes.bool,
    cerrar: PropTypes.func,
};

export default AgregarCliente;
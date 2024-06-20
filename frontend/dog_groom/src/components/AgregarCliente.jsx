import Header from "./Header";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { crearCliente } from "../services/clienteService";
import { validarCliente } from "./validaciones";
import { obtenerTipoMascotas } from "../services/tipoAnimal";

function AgregarCliente() {
    const [cedulaCliente, setCedulaCliente] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [telefonoCliente, setTelefonoCliente] = useState('');
    const [nombreMascota, setNombreMascota] = useState('');
    const [razaMascota, setRazaMascota] = useState('');
    const [tamanoMascota, setTamanoMascota] = useState({ ID_TipoMascota: 0, Descripcion: '' });
    const [fotosMascota, setFotosMascota] = useState('');
    const [fotoActual, setFotoActual] = useState({});
    const [fotoUrl, setFotoUrl] = useState('');
    const [mascotas, setMascotas] = useState([]);
    const [tipoMascota, setTipoMascota] = useState([]);

    useEffect(() => {
        cargarTipoMascota();
    }, [])

    const cargarTipoMascota = async () => {
        const resTipoAnimal = await obtenerTipoMascotas();
        console.log(resTipoAnimal)
        if (resTipoAnimal.ok) {
            setTipoMascota(resTipoAnimal.data)
        }
    }

    const navigate = useNavigate();

    const handleAgregarCliente = async (e) => {
        e.preventDefault()

        const listaMascotas = mascotas.map((mascota) => ({
            nombre: mascota.nombre,
            raza: mascota.raza,
            cedula: mascota.cedula,
            ID_TipoMascota: mascota.tipoMascota.ID_TipoMascota,
        }))

        const formData = new FormData();
        formData.append('cedula', cedulaCliente);
        formData.append('nombre', nombreCliente);
        formData.append('telefono', telefonoCliente);
        formData.append('mascotas', JSON.stringify(listaMascotas));
        console.log("fotosMascota:", fotosMascota)
        fotosMascota.forEach((file) => {
            formData.append('images', file);
        });

        try {
            const resCliente = await crearCliente(formData);
            if (resCliente.ok) {
                toast.success("Cliente creado con éxito", { autoClose: 1500, theme: "colored" });
                navigate('/clientes');
            } else {
                toast.error(resCliente.message, { autoClose: 1500, theme: "colored" });
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 1500, theme: "colored" });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            setFotoActual(file);
            setFotoUrl(URL.createObjectURL(file));
            console.log(fotosMascota)
        }
    };

    const manejarCancelar = () => {
        navigate('/clientes');
    };

    const agregarMascota = () => {
        const mascota = {
            nombre: nombreMascota,
            raza: razaMascota,
            cedula: cedulaCliente,
            tipoMascota: tamanoMascota,
        }

        setFotosMascota([...fotosMascota, fotoActual]);
        setMascotas([...mascotas, mascota])
    }

    const handleChangeSelect = (e) => {
        const { value } = e.target;
        const tipoMascotaSeleccionado = tipoMascota.find(tipo => tipo.ID_TipoMascota === parseInt(value, 10));
        setTamanoMascota(tipoMascotaSeleccionado)
    };


    return (
        <div className="relative flex flex-col min-h-screen bg-primary bg-agregarCliente bg-cover">
            <Header />
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-yellow-800 bg-opacity-95 rounded-3xl p-10 m-6 flex items-center justify-center">
                    <form onSubmit={handleAgregarCliente} className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <input
                                className="p-4 text-lg border border-gray-300 rounded mb-4"
                                type="text"
                                id="cedula"
                                placeholder="Cédula"
                                value={cedulaCliente}
                                onChange={(e) => setCedulaCliente(e.target.value)}
                                required
                            />
                            <input
                                className="p-4 text-lg border border-gray-300 rounded-md w-full mb-4"
                                type="text"
                                id="NombreCliente"
                                placeholder="Nombre del Cliente"
                                value={nombreCliente}
                                onChange={(e) => setNombreCliente(e.target.value)}
                                required
                            />
                            <input
                                className="p-4 text-lg border border-gray-300 rounded-md w-full mb-4"
                                type="text"
                                id="telefono"
                                placeholder="Teléfono"
                                value={telefonoCliente}
                                onChange={(e) => setTelefonoCliente(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <input
                                className="p-4 text-lg border border-gray-300 rounded-md w-full mb-4"
                                type="text"
                                id="NombrePerro"
                                placeholder="Nombre del Perro"
                                value={nombreMascota}
                                onChange={(e) => setNombreMascota(e.target.value)}
                                required
                            />
                            <input
                                className="p-4 text-lg border border-gray-300 rounded-md w-full mb-4"
                                type="text"
                                id="raza"
                                placeholder="Raza"
                                value={razaMascota}
                                onChange={(e) => setRazaMascota(e.target.value)}
                                required
                            />
                            <select
                                className="p-4 text-lg border border-gray-300 rounded-md w-full mb-4"
                                id="tamanno"
                                placeholder="Tamaño"
                                value={tamanoMascota.ID_TipoMascota}
                                onChange={handleChangeSelect}
                                required
                            >
                                <option value="">Tamaño</option>
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
                                required
                            />
                            <label
                                htmlFor="imagenMascota"
                                className="w-80 h-48 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer bg-gray-100 hover:bg-gray-200 focus:outline-none"
                            >
                                {fotoUrl ? (
                                    <img src={fotoUrl} alt="Imagen de la Mascota" className="rounded-lg w-full h-full object-cover" />
                                ) : (
                                    <span className="text-lg text-gray-600">Haz clic para subir una imagen</span>
                                )}
                            </label>
                        </div>

                        <div className="flex justify-center space-x-4 mb-6">
                            <button
                                className="p-4 text-lg bg-blue-600 rounded-md text-black font-bold hover:bg-blue-700 focus:outline-none"
                                type="button"
                                onClick={agregarMascota}
                            >
                                Agregar Mascota
                            </button>
                            <button
                                className="p-4 text-lg bg-green-600 rounded-md text-black font-bold hover:bg-green-700 focus:outline-none"
                                type="submit"
                            >
                                Guardar Cliente y Mascotas
                            </button>
                            <button
                                className="p-4 text-lg bg-red-600 rounded-md text-black font-bold hover:bg-red-700 focus:outline-none"
                                type="button"
                                onClick={manejarCancelar}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                    <div className="w-full md:w-1/2 bg-amber-800 bg-opacity-90 rounded-3xl p-8 m-4 overflow-hidden">
                        <div className="overflow-y-auto" style={{ maxHeight: '400px', scrollbarWidth: 'none' }}>
                            <h2 className="text-2xl font-bold text-center mb-4">Mascotas Agregadas</h2>
                            {mascotas.length === 0 && (
                                <p className="text-center text-gray-500">No se han agregado mascotas aún.</p>
                            )}
                            {mascotas.map((mascota, index) => (

                                <div key={index} className="bg-black my-2 p-2 rounded-md text-white cursor-pointer">
                                    <p><strong>Nombre:</strong> {mascota.nombre}</p>
                                    <p><strong>Raza:</strong> {mascota.raza}</p>
                                    <p><strong>Tamaño:</strong> {mascota.tipoMascota.Descripcion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgregarCliente;

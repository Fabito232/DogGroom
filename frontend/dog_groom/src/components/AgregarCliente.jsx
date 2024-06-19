import Header from "./Header";
import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { crearCliente } from "../services/clienteService";
import { crearMascota } from "../services/mascotaService";
import { validarCliente, validarMascota } from "./validaciones";

function AgregarCliente() {
    const [cedulaCliente, setCedulaCliente] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [telefonoCliente, setTelefonoCliente] = useState('');

    const [nombreMascota, setNombreMascota] = useState('');
    const [razaMascota, setRazaMascota] = useState('');
    const [tamanoMascota, setTamanoMascota] = useState('');
    const [fotoMascota, setFotoMascota] = useState(null);
    const [fotoUrl, setFotoUrl] = useState('');

    const [mascotas, setMascotas] = useState([]);

    const navigate = useNavigate();

    const handleAgregarMascota = () => {
        const mascota = {
            nombre: nombreMascota,
            raza: razaMascota,
            tamano: tamanoMascota,
            image: fotoMascota,
        };

        if (!validarMascota(mascota)) {
            toast.error("Todos los campos de la mascota son obligatorios", { autoClose: 1500, theme: "colored" });
            return;
        }

        setMascotas([...mascotas, mascota]);
        limpiarCamposMascota();
    };

    const limpiarCamposMascota = () => {
        setNombreMascota('');
        setRazaMascota('');
        setTamanoMascota('');
        setFotoMascota(null);
        setFotoUrl('');
    };

    const handleAgregarCliente = async (e) => {
        e.preventDefault();

        const cliente = {
            cedula: cedulaCliente,
            nombre: nombreCliente,
            telefono: telefonoCliente
        };

        if (!validarCliente(cliente)) {
            toast.error("Todos los campos del cliente son obligatorios", { autoClose: 1500, theme: "colored" });
            return;
        }

        if (mascotas.length === 0) {
            toast.error("Debe agregar al menos una mascota", { autoClose: 1500, theme: "colored" });
            return;
        }

        try {
            const resCliente = await crearCliente(cliente);

            if (resCliente.ok) {
                const promises = mascotas.map(mascota => {
                    const nuevaMascota = {
                        nombre: mascota.nombre,
                        raza: mascota.raza,
                        tamano: mascota.tamano,
                        image: mascota.image,
                        cedula: cedulaCliente,
                        ID_TipoMascota: 1
                    };
                    return crearMascota(nuevaMascota);
                });

                const resultadosMascotas = await Promise.all(promises);
                const errores = resultadosMascotas.filter(res => !res.ok);

                if (errores.length === 0) {
                    toast.success("Se guardó con éxito el cliente y las mascotas", { autoClose: 1500, theme: "colored" });
                    navigate('/clientes'); // Redirige al usuario después de guardar correctamente
                } else {
                    errores.forEach(error => {
                        console.error('Error al guardar mascota:', error.message);
                    });
                    toast.error("Error al guardar algunas mascotas", { autoClose: 1500, theme: "colored" });
                }
            } else {
                toast.error(resCliente.message, { autoClose: 1500, theme: "colored" });
            }
        } catch (error) {
            console.error('Error al guardar cliente:', error.message);
            toast.error(error.message, { autoClose: 1500, theme: "colored" });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFotoMascota(file);
            setFotoUrl(URL.createObjectURL(file));
        }
    };

    const manejarCancelar = () => {
        navigate('/clientes');
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
                                required={mascotas.length === 0}
                            />
                            <input
                                className="p-4 text-lg border border-gray-300 rounded-md w-full mb-4"
                                type="text"
                                id="raza"
                                placeholder="Raza"
                                value={razaMascota}
                                onChange={(e) => setRazaMascota(e.target.value)}
                                required={mascotas.length === 0}
                            />
                            <select
                                className="p-4 text-lg border border-gray-300 rounded-md w-full mb-4"
                                id="tamanno"
                                placeholder="Tamaño"
                                value={tamanoMascota}
                                onChange={(e) => setTamanoMascota(e.target.value)}
                                required={mascotas.length === 0}
                            >
                                <option value="" disabled>Selecciona el tamaño</option>
                                <option value="pequeño">Pequeño</option>
                                <option value="grande">Grande</option>
                            </select>
                        </div>

                        <div className="flex justify-center items-center mb-6">
                            <input
                                type="file"
                                id="imagenMascota"
                                className="hidden"
                                onChange={handleImageChange}
                                required={mascotas.length === 0}
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
                                onClick={handleAgregarMascota}
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
                                    <p><strong>Tamaño:</strong> {mascota.tamano}</p>
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

import { useState } from "react";
import Header from "./Header";

function AgregarCliente() {
    const [cliente, setCliente] = useState([]);

    const [cedulaCliente, setCedulaCliente] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [telefonoCliente, setTelefonoCliente] = useState('');

    const [nombreMascota, setNombreMascota] = useState('');
    const [razaMascota, setRazaMascota] = useState('');
    const [tamanoMascota, setTamanoMascota] = useState('');
    const [fotoMascota, SetFotoMascota] = useState(null);
    const [fotoUrl, setFotoUrl] = useState('');

    const handleAgregarCliente = (e) => {
        e.preventDefault();
        // Crear la lógica para agregarlo
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            SetFotoMascota(file);
            setFotoUrl(URL.createObjectURL(file));
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col bg-primary bg-citas bg-cover bg-fondo1">
            <Header />
            <div className="flex flex-grow items-center justify-center">
                <div className="bg-customGreen rounded-3xl p-10 m-6 flex items-center justify-center w-3/4">
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
                                className="p-4 text-lg border border-gray-300 rounded w-full mb-4"
                                type="text"
                                id="NombreCliente"
                                placeholder="Nombre del Cliente"
                                value={nombreCliente}
                                onChange={(e) => setNombreCliente(e.target.value)}
                                required
                            />
                            <input
                                className="p-4 text-lg border border-gray-300 rounded w-full mb-4"
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
                                className="p-4 text-lg border border-gray-300 rounded w-full mb-4"
                                type="text"
                                id="NombrePerro"
                                placeholder="Nombre del Perro"
                                value={nombreMascota}
                                onChange={(e) => setNombreMascota(e.target.value)}
                                required
                            />
                            <input
                                className="p-4 text-lg border border-gray-300 rounded w-full mb-4"
                                type="text"
                                id="raza"
                                placeholder="Raza"
                                value={razaMascota}
                                onChange={(e) => setRazaMascota(e.target.value)}
                                required
                            />
                            <select
                                className="p-4 text-lg border border-gray-300 rounded w-full mb-4"
                                id="tamanno"
                                placeholder="Tamaño"
                                value={tamanoMascota}
                                onChange={(e) => setTamanoMascota(e.target.value)}
                                required
                            >
                                <option value="" disabled>Tamaño</option>
                                <option value="pequeño">Pequeño</option>
                                <option value="mediano">Mediano</option>
                                <option value="grande">Grande</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-6 mb-6">
                            <div className="flex justify-center">
                                <input
                                    type="file"
                                    id="imagenMascota"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <label
                                    htmlFor="imagenMascota"
                                    className="p-4 text-lg bg-sky-600 rounded-md text-black hover:bg-sky-700 focus:outline-none cursor-pointer"
                                >
                                    Subir Imagen
                                </label>
                            </div>
                            <div className="flex justify-center">
                                {fotoUrl && (
                                    <img src={fotoUrl} alt="Imagen de la Mascota" className="rounded-lg w-72 h-40 object-cover" />
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center space-x-4 mb-6">
                            <button
                                className="p-4 text-lg bg-green-600 rounded-md text-black hover:bg-green-700 focus:outline-none"
                                type="button"
                            >
                                Agregar
                            </button>
                            <button
                                className="p-4 text-lg bg-yellow-600 rounded-md text-black hover:bg-yellow-700 focus:outline-none"
                                type="button"
                            >
                                Editar
                            </button>
                            <button
                                className="p-4 text-lg bg-red-600 rounded-md text-black hover:bg-red-700 focus:outline-none"
                                type="button"
                            >
                                Eliminar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AgregarCliente;

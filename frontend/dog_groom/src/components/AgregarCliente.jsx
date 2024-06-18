import Header from "./Header";
import { useState } from "react";
import Header from "./Header";
import { toast } from 'react-toastify';
import { crearCliente } from "../services/clienteService";
import { crearMascota } from "../services/mascotaService";
import { useConfirm } from './ModalConfirmacion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { crearCliente } from "../services/clienteService";
import { crearMascota } from "../services/mascotaService";
import { validarCliente, validarMascota } from "./validaciones";
import { useConfirm } from './ModalConfirmacion';

function AgregarCliente() {
    const [cliente, setCliente] = useState([]);
    const navigate = useNavigate();

    const [cedulaCliente, setCedulaCliente] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [telefonoCliente, setTelefonoCliente] = useState('');

    const [nombreMascota, setNombreMascota] = useState('');
    const [razaMascota, setRazaMascota] = useState('');
    const [tamanoMascota, setTamanoMascota] = useState('');
    const [fotoMascota, SetFotoMascota] = useState(null);
    const [fotoUrl, setFotoUrl] = useState('');

    const openConfirmModal = useConfirm();

    const handleAgregarCliente = async (e) => {
    const openConfirmModal = useConfirm();

    const handleAgregarCliente = async (e) => {
        e.preventDefault();

        const cliente = {
            cedula: cedulaCliente,
            nombre: nombreCliente,
            telefono: telefonoCliente
        }

        const mascota = {
            nombre: nombreMascota,
            raza: razaMascota,
            image: fotoMascota,
            cedula: cedulaCliente,
            ID_TipoMascota: 1
        }
        try {
            console.log(cliente, " \n", mascota )
            const resCliente = await crearCliente(cliente);
            console.log(resCliente)
            if(resCliente.ok){
                const resMascota = await crearMascota(mascota);
                if(resMascota.ok) {
                    toast.success("Se guardó con éxito el cliente", { autoClose: 1500, theme: "colored"});
                }else{
                    toast.error(resMascota.message, { autoClose: 1500, theme: "colored"});
                }
                console.log('MASCOTA:' , resMascota)   
            }else{
                toast.error(resCliente.message, { autoClose: 1500, theme: "colored"});
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 1500, theme: "colored"});
        }

        const cliente = {
            cedula: cedulaCliente,
            nombre: nombreCliente,
            telefono: telefonoCliente
        }

        const mascota = {
            nombre: nombreMascota,
            raza: razaMascota,
            image: fotoMascota,
            cedula: cedulaCliente,
            ID_TipoMascota: 1
        }

        if (validarCliente(cliente) && validarMascota(mascota)) {

            try {
                console.log(cliente, " \n", mascota)

                const resCliente = await crearCliente(cliente);
                
                console.log(resCliente)
                if (resCliente.ok) {
                    const resMascota = await crearMascota(mascota);
                    if (resMascota.ok) {
                        toast.success("Se guardó con éxito el cliente", { autoClose: 1500, theme: "colored" });
                    } else {
                        toast.error(resMascota.message, { autoClose: 1500, theme: "colored" });
                    }
                    console.log('MASCOTA:', resMascota)
                } else {
                    toast.error(resCliente.message, { autoClose: 1500, theme: "colored" });
                }
            } catch (error) {
                toast.error(error.message, { autoClose: 1500, theme: "colored" });
            }
            navigate('/clientes');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            SetFotoMascota(file);
            setFotoUrl(URL.createObjectURL(file));
        }
    };

    const manejarCancelar = () => {
        navigate('/clientes');
    };

    return (
        <div className="relaive flex flex-col min-h-screen bg-primary bg-agregarCliente bg-cover">
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
                                value={tamanoMascota}
                                onChange={(e) => setTamanoMascota(e.target.value)}
                                required
                            >
                                <option value="d" disabled>Tamaño</option>
                                <option value="d" disabled>Tamaño</option>
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
                                className="p-4 text-lg bg-green-600 rounded-md text-black font-bold hover:bg-green-700 focus:outline-none"
                                type="submit"
                            >
                                Agregar
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
                </div>
            </div>
        </div>
    )
}

export default AgregarCliente;
import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";
import {crearProducto} from '../services/productoService.js'

const AgregarProducto = () => {
    const navigate = useNavigate();

    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        marca: '',
        cantidad: '',
        descripcion: ''
    });

    const manejarCambioEntradaNuevo = (e) => {
        const { name, value } = e.target;
        setNuevoProducto({ ...nuevoProducto, [name]: value });
    };

    const manejarAgregarProducto = async () => {
        const { nombre, marca, cantidad, descripcion } = nuevoProducto;

        let mensajesError = [];
        if (!nombre) mensajesError.push('Nombre');
        if (!marca) mensajesError.push('Marca');
        if (!cantidad) mensajesError.push('Cantidad');

        if (mensajesError.length > 0) {
            toast.error(`Debe completar los siguientes campos: ${mensajesError.join(', ')}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        console.log('Producto: ', nuevoProducto)
        const resProducto = await crearProducto(nuevoProducto);
        console.log("Respuesta",resProducto)
        if(resProducto.ok){
            toast.success("Se guardó con éxito el producto", { autoClose: 1500, theme: "colored"});
        }else{
            toast.error(resProducto.message, { autoClose: 1500, theme: "colored"});
        }

        navigate('/productos');
    };

    const manejarCancelarAgregar = () => {
        navigate('/productos');
    };

    return (
        <div className="relative min-h-screen flex flex-col bg-primary bg-opacity-80 bg-fondo1 bg-cover">
            <Header />
            <div className="flex-grow flex items-center justify-center">
                <div className="relative z-10 bg-amber-800 bg-opacity-90 rounded-3xl p-16 shadow-lg w-3/4" style={{ overflowY: 'hidden' }}>
                    <div className="bg-white rounded-lg shadow-md p-8 mb-2 overflow-auto">
                        <h2 className="text-6xl font-bold text-center mb-12">Agregar Producto</h2>
                        <div className="mt-4">
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                value={nuevoProducto.nombre}
                                onChange={manejarCambioEntradaNuevo}
                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                                required
                            />
                            <input
                                type="text"
                                name="marca"
                                placeholder="Marca"
                                value={nuevoProducto.marca}
                                onChange={manejarCambioEntradaNuevo}
                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                                required
                            />
                            <input
                                type="number"
                                name="cantidad"
                                placeholder="Cantidad"
                                value={nuevoProducto.cantidad}
                                onChange={manejarCambioEntradaNuevo}
                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                                required
                            />
                            <input
                                type="text"
                                name="descripcion"
                                placeholder="Descripción"
                                value={nuevoProducto.descripcion}
                                onChange={manejarCambioEntradaNuevo}
                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                                required
                            />
                            <div className="flex justify-between mt-8">
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={manejarAgregarProducto}>Agregar</button>
                                <button className="bg-red-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded" onClick={manejarCancelarAgregar}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AgregarProducto;
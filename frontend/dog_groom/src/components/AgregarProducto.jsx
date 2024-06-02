import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";

const AgregarProducto = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { productos, setProductos } = location.state || { productos: [], setProductos: () => { } };

    const [nuevoProducto, setNuevoProducto] = useState({
        id: productos.length + 1,
        nombre: '',
        marca: '',
        cantidad: '',
        descripcion: ''
    });

    const manejarCambioEntradaNuevo = (e) => {
        const { name, value } = e.target;
        setNuevoProducto({ ...nuevoProducto, [name]: value });
    };

    const manejarAgregarProducto = () => {
        const { nombre, marca, cantidad, descripcion } = nuevoProducto;

        let mensajesError = [];
        if (!nombre) mensajesError.push('Nombre');
        if (!marca) mensajesError.push('Marca');
        if (!cantidad) mensajesError.push('Cantidad');
        if (!descripcion) mensajesError.push('Descripción');

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

        const nuevosProductos = [...productos, { ...nuevoProducto, id: productos.length + 1 }];
        setProductos(nuevosProductos);
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
                            />
                            <input
                                type="text"
                                name="marca"
                                placeholder="Marca"
                                value={nuevoProducto.marca}
                                onChange={manejarCambioEntradaNuevo}
                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="number"
                                name="cantidad"
                                placeholder="Cantidad"
                                value={nuevoProducto.cantidad}
                                onChange={manejarCambioEntradaNuevo}
                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="descripcion"
                                placeholder="Descripción"
                                value={nuevoProducto.descripcion}
                                onChange={manejarCambioEntradaNuevo}
                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";

const ListaProductos = () => {
    const [productos, setProductos] = useState([
        { id: 1, nombre: 'Producto 1', marca: 'Marca 1', cantidad: 10, descripcion: 'Descripción del Producto 1' },
        { id: 2, nombre: 'Producto 2', marca: 'Marca 2', cantidad: 20, descripcion: 'Descripción del Producto 2' },
        { id: 3, nombre: 'Producto 3', marca: 'Marca 3', cantidad: 30, descripcion: 'Descripción del Producto 3' },
        { id: 4, nombre: 'Producto 4', marca: 'Marca 4', cantidad: 40, descripcion: 'Descripción del Producto 4' },
        { id: 5, nombre: 'Producto 5', marca: 'Marca 5', cantidad: 50, descripcion: 'Descripción del Producto 5' },
        { id: 6, nombre: 'Producto 6', marca: 'Marca 6', cantidad: 60, descripcion: 'Descripción del Producto 6' },
        { id: 7, nombre: 'Producto 7', marca: 'Marca 7', cantidad: 70, descripcion: 'Descripción del Producto 7' }
    ]);

    const navigate = useNavigate();
    const [productoEditando, setProductoEditando] = useState(null);

    const manejarMostrarFormularioAgregar = () => {
        navigate('/agregarProducto');
    };

    const manejarEditar = (producto) => {
        setProductoEditando({ ...producto });
    };

    const manejarCambioEntradaEdicion = (e) => {
        const { name, value } = e.target;
        setProductoEditando({ ...productoEditando, [name]: value });
    };

    const manejarGuardar = () => {
        const productosActualizados = productos.map(producto => {
            if (producto.id === productoEditando.id) {
                return productoEditando;
            }
            return producto;
        });
        setProductos(productosActualizados);
        setProductoEditando(null);
    };

    const manejarCancelar = () => {
        setProductoEditando(null);
    };

    const manejarEliminar = (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            const productosActualizados = productos.filter(producto => producto.id !== id);
            setProductos(productosActualizados);
        }
    };

    return (
        <div className="relative min-h-screen flex items-start justify-center bg-primary bg-fondo bg-cover">
            <div className="relative z-10 shadow-lg w-full md:w-160 h-full md:h-auto">
            <Header />
                <div className="rounded-xl shadow-md p-20 mb-2 overflow-auto">
                    <div className="flex items-center mb-4">
                        <h1 className="bg-gray-300 rounded-lg text-6xl font-bold flex-1 text-center">Lista de Productos</h1>
                        <button className="bg-green-700 hover:bg-green-900 text-black font-bold py-3 px-12 rounded ml-8" onClick={manejarMostrarFormularioAgregar}>Agregar</button>
                    </div>
                    <div className="overflow-auto max-h-[650px] mt-8" style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none'}}>
                        <table className="w-full table-auto border-collapse" >
                            <thead>
                                <tr className="bg-gray-300">
                                    <th className="border border-gray-800 py-6 px-6">Nombre</th>
                                    <th className="border border-gray-800 py-6 px-6">Marca</th>
                                    <th className="border border-gray-800 py-6 px-6">Cantidad</th>
                                    <th className="border border-gray-800 py-6 px-6">Descripción</th>
                                    <th className="border border-gray-800 py-6 px-6">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto) => (
                                    <tr key={producto.id} className={producto.id % 2 === 0 ? 'bg-white' : "bg-amber-800"}>
                                        <td className="border border-gray-800 py-4 px-6">
                                            {productoEditando && productoEditando.id === producto.id ? (
                                                <input
                                                    type="text"
                                                    name="nombre"
                                                    value={productoEditando.nombre}
                                                    onChange={manejarCambioEntradaEdicion}
                                                    className="block w-full p-2 border border-gray-300 rounded"
                                                />
                                            ) : (
                                                producto.nombre
                                            )}
                                        </td>
                                        <td className="border border-gray-800 py-4 px-6">
                                            {productoEditando && productoEditando.id === producto.id ? (
                                                <input
                                                    type="text"
                                                    name="marca"
                                                    value={productoEditando.marca}
                                                    onChange={manejarCambioEntradaEdicion}
                                                    className="block w-full p-2 border border-gray-300 rounded"
                                                />
                                            ) : (
                                                producto.marca
                                            )}
                                        </td>
                                        <td className="border border-gray-800 py-4 px-6 text-center">
                                            {productoEditando && productoEditando.id === producto.id ? (
                                                <input
                                                    type="number"
                                                    name="cantidad"
                                                    value={productoEditando.cantidad}
                                                    onChange={manejarCambioEntradaEdicion}
                                                    className="block w-full p-2 border border-gray-300 rounded"
                                                />
                                            ) : (
                                                producto.cantidad
                                            )}
                                        </td>
                                        <td className="border border-gray-800 py-4 px-6">
                                            {productoEditando && productoEditando.id === producto.id ? (
                                                <input
                                                    type="text"
                                                    name="descripcion"
                                                    value={productoEditando.descripcion}
                                                    onChange={manejarCambioEntradaEdicion}
                                                    className="block w-full p-2 border border-gray-300 rounded"
                                                />
                                            ) : (
                                                producto.descripcion
                                            )}
                                        </td>
                                        <td className="border border-gray-800 py-4 px-6">
                                            {productoEditando && productoEditando.id === producto.id ? (
                                                <div className="flex flex-col space-y-2">
                                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={manejarGuardar}>Guardar</button>
                                                    <button className="bg-red-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded" onClick={manejarCancelar}>Cancelar</button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col space-y-2">
                                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold w-full py-2 px-4 rounded-md" onClick={() => manejarEditar(producto)}>Editar</button>
                                                    <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded" onClick={() => manejarEliminar(producto.id)}>Eliminar</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListaProductos;
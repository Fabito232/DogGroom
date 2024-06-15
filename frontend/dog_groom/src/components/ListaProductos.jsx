import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import { actualizarProducto, borrarProducto, obtenerProductos } from '../services/productoService.js';

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);
    const [productoEditando, setProductoEditando] = useState(null);
    const navigate = useNavigate();

    const cargarProducto = async () => {
        try {
            const resProducto = await obtenerProductos();
            console.log(resProducto);
            if (resProducto.ok) {
                const listaProducto = resProducto.data.map(producto => ({
                    id: producto.ID_Producto,
                    nombre: producto.Nombre,
                    marca: producto.Marca,
                    descripcion: producto.Descripcion,
                    cantidad: producto.Cantidad
                }));
                setProductos(listaProducto);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        cargarProducto();
    }, []);

    const manejarAgregar = () => {
        navigate('/agregarProducto');
    };

    const manejarEditar = (producto) => {
        console.log("producto editado", producto);
        setProductoEditando(producto);
    };

    const manejarCambioEntradaEdicion = (e) => {
        const { name, value } = e.target;
        setProductoEditando({ ...productoEditando, [name]: value });
    };

    const manejarGuardar = async () => {
        console.log(productoEditando);
        const producto = {
            nombre: productoEditando.nombre,
            marca: productoEditando.marca,
            descripcion: productoEditando.descripcion,
            cantidad: productoEditando.cantidad
        };
        console.log(producto);
        try {
            const resProducto = await actualizarProducto(producto, productoEditando.id);
            console.log(resProducto);
        } catch (error) {
            console.log(error);
        }

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

    const manejarEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            const resProducto = await borrarProducto(id);
            console.log(resProducto);
            const productosActualizados = productos.filter(producto => producto.id !== id);
            setProductos(productosActualizados);
        }
    };

    return (
        <div className="relative min-h-screen flex items-start justify-center bg-primary bg-fondo1 bg-cover">
            <div className="relative z-10 shadow-lg w-full md:w-160 h-full md:h-auto">
                <Header />
                <div className="rounded-xl shadow-md p-20 mb-2 overflow-auto">
                    <div className="flex items-center mb-4">
                        <h1 className="bg-gray-300 rounded-lg text-6xl font-bold flex-1 text-center">Lista de Productos</h1>
                        <button className="bg-green-700 hover:bg-green-900 text-black font-bold py-4 px-12 rounded ml-8" onClick={manejarAgregar}>Agregar</button>
                    </div>
                    <div className="overflow-auto max-h-[650px] mt-8" style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-lime-600">
                                    <th className="border border-gray-800 py-6 px-6">Nombre</th>
                                    <th className="border border-gray-800 py-6 px-6">Marca</th>
                                    <th className="border border-gray-800 py-6 px-6">Cantidad</th>
                                    <th className="border border-gray-800 py-6 px-6">Descripción</th>
                                    <th className="border border-gray-800 py-6 px-6">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto, index) => (
                                    <tr key={producto.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
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
                                                <div className="flex flex-row space-x-2">
                                                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full" onClick={manejarGuardar}>Guardar</button>
                                                    <button className="bg-red-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded w-full" onClick={manejarCancelar}>Cancelar</button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-row space-x-2">
                                                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full" onClick={() => manejarEditar(producto)}>Editar</button>
                                                    <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded w-full" onClick={() => manejarEliminar(producto.id)}>Eliminar</button>
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

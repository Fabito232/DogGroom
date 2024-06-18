import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";
import { actualizarProducto, borrarProducto, obtenerProductos } from '../services/productoService.js';

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);
    const [productoEditando, setProductoEditando] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroMarca, setFiltroMarca] = useState('');
    const [filtroOrden, setFiltroOrden] = useState('');

    const productosPorPagina = 5; // Mostrar 5 productos por página
    const navigate = useNavigate();

    useEffect(() => {
        cargarProducto();
    }, []);

    const cargarProducto = async () => {
        try {
            const resProducto = await obtenerProductos();
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

    // Función para buscar productos por nombre
    const buscarProducto = (e) => {
        const valorBusqueda = e.target.value.toLowerCase();
        setFiltroNombre(valorBusqueda);
        setPaginaActual(1); // Reiniciar la paginación al realizar una búsqueda
    };

    // Función para ordenar productos
    const ordenarProductos = (tipoOrden) => {
        setFiltroOrden(tipoOrden);
    };

    // Filtrar y ordenar los productos según los filtros activos
    let productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(filtroNombre) &&
        producto.marca.toLowerCase().includes(filtroMarca)
    );

    if (filtroOrden === 'nombreAsc') {
        productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (filtroOrden === 'nombreDesc') {
        productosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
    } else if (filtroOrden === 'cantidadAsc') {
        productosFiltrados.sort((a, b) => a.cantidad - b.cantidad);
    } else if (filtroOrden === 'cantidadDesc') {
        productosFiltrados.sort((a, b) => b.cantidad - a.cantidad);
    }

    // Obtener productos actuales según la página actual
    const indexUltimoProducto = paginaActual * productosPorPagina;
    const indexPrimerProducto = indexUltimoProducto - productosPorPagina;
    const productosActuales = productosFiltrados.slice(indexPrimerProducto, indexUltimoProducto);

    // Número de páginas
    const numeroPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    const manejarAgregar = () => {
        navigate('/agregarProducto');
    };

    const manejarEditar = (producto) => {
        setProductoEditando(producto);
    };

    const manejarCambioEntradaEdicion = (e) => {
        const { name, value } = e.target;
        setProductoEditando({ ...productoEditando, [name]: value });
    };

    const manejarGuardar = async () => {
        if (!productoEditando.marca.trim() & !productoEditando.nombre.trim()) {
            toast.error("La marca y el nombre estan vacios.");
            return;
        }
        
        if (!productoEditando.nombre.trim()) {
            toast.error("El nombre esta vacio.");
            return;
        }
        if (!productoEditando.marca.trim()) {
            toast.error("La marca esta vacia.");
            return;
        }

        if (productoEditando.cantidad === "" || isNaN(productoEditando.cantidad) || productoEditando.cantidad < 0) {
            productoEditando.cantidad = 0;
        }

        const producto = {
            nombre: productoEditando.nombre,
            marca: productoEditando.marca,
            descripcion: productoEditando.descripcion,
            cantidad: productoEditando.cantidad
        };

        try {
            const resProducto = await actualizarProducto(producto, productoEditando.id);
            console.log(resProducto);
        } catch (error) {
            console.log(error);
        }

        const productosActualizados = productos.map(p => (p.id === productoEditando.id ? productoEditando : p));
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
            const productosActualizados = productos.filter(p => p.id !== id);
            setProductos(productosActualizados);
        }
    };

    const reducirCantidad = async (producto) => {
        if (producto.cantidad > 0) {
            const nuevaCantidad = producto.cantidad - 1;
            const productoActualizado = { ...producto, cantidad: nuevaCantidad };
            try {
                const resProducto = await actualizarProducto(productoActualizado, producto.id);
                console.log(resProducto);
            } catch (error) {
                console.log(error);
            }
            const productosActualizados = productos.map(p => (p.id === producto.id ? productoActualizado : p));
            setProductos(productosActualizados);
        }
    };

    return (
        <div className="relative min-h-screen flex items-start justify-center bg-primary bg-fondo1 bg-cover">
            <div className="relative z-10 shadow-lg w-full md:w-160 h-full md:h-auto">
                <Header />
                <div className="rounded-xl shadow-md p-10 mb-2 overflow-auto">
                    <div className="flex items-center mb-4">
                        <h1 className="bg-gray-300 rounded-lg text-6xl font-bold flex-1 text-center">Lista de Productos</h1>
                        <button className="bg-green-700 hover:bg-green-900 text-black font-bold py-4 px-12 rounded ml-8" onClick={manejarAgregar}>Agregar</button>
                    </div>
                    <div className="space-x-4 bg-lime-600 py-4 px-6">
                        <select
                            className="p-2 border border-black rounded text-black"
                            value={filtroOrden}
                            onChange={(e) => ordenarProductos(e.target.value)}
                        >
                            <option value="">Ordenar por...</option>
                            <option value="nombreAsc">Nombre (A-Z)</option>
                            <option value="nombreDesc">Nombre (Z-A)</option>
                            <option value="cantidadAsc">Cantidad (menor a mayor)</option>
                            <option value="cantidadDesc">Cantidad (mayor a menor)</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            className="p-2 border border-black rounded text-black"
                            value={filtroNombre}
                            onChange={buscarProducto}
                        />
                    </div>
                    <div className="max-h-[500px]">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-lime-600 text-lg">
                                    <th className="border border-gray-800 py-4 px-4">Nombre</th>
                                    <th className="border border-gray-800 py-4 px-4">Marca</th>
                                    <th className="border border-gray-800 py-4 px-4">Cantidad</th>
                                    <th className="border border-gray-800 py-4 px-4">Descripción</th>
                                    <th className="border border-gray-800 py-4 px-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosActuales.map((producto, index) => (
                                    <tr key={producto.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                                        <td className="border border-gray-800 py-6 px-8">
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mr-4"
                                                onClick={() => reducirCantidad(producto)}> -
                                            </button>
                                            {productoEditando && productoEditando.id === producto.id ? (
                                                <input
                                                    type="text"
                                                    name="nombre"
                                                    value={productoEditando.nombre}
                                                    onChange={manejarCambioEntradaEdicion}
                                                    className="p-2 border border-gray-300 rounded w-3/4"
                                                />
                                            ) : (
                                                <span>{producto.nombre}</span>
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
                                                    min="0"
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
                    {/* Paginación */}
                    <div className="flex-grow flex justify-center items-end mt-4">
                        <button
                            className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 px-6 rounded mr-8"
                            onClick={() => setPaginaActual(prev => prev - 1)}
                            disabled={paginaActual === 1}
                        >
                            &larr; Anterior
                        </button>
                        <div className="flex space-x-2">
                            {Array.from({ length: numeroPaginas }, (_, index) => (
                                <button
                                    key={index + 1}
                                    className={`bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 px-6 rounded ${paginaActual === index + 1 ? 'bg-blue-400' : ''}`}
                                    onClick={() => setPaginaActual(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 px-6 rounded ml-8"
                            onClick={() => setPaginaActual(prev => prev + 1)}
                            disabled={paginaActual === numeroPaginas}
                        >
                            Siguiente &rarr;
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ListaProductos;
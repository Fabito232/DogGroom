import React, { useState } from 'react';
import '../styles/lista_productos.css';

const ListaProductos = () => {
    const [productos, setProductos] = useState([
        { id: 1, nombre: 'Producto 1', marca: 'Marca 1', cantidad: 10, descripcion: 'Descripción del Producto 1' },
        { id: 2, nombre: 'Producto 2', marca: 'Marca 2', cantidad: 20, descripcion: 'Descripción del Producto 2' },
        { id: 3, nombre: 'Producto 3', marca: 'Marca 3', cantidad: 30, descripcion: 'Descripción del Producto 3' },
    ]);
    const [productoEditando, setProductoEditando] = useState(null);
    const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);
    const [nuevoProducto, setNuevoProducto] = useState({
        id: productos.length + 1,
        nombre: '',
        marca: '',
        cantidad: 0,
        descripcion: ''
    });

    const manejarEditar = (producto) => {
        setProductoEditando({ ...producto });
    };

    const manejarEliminar = (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            const productosActualizados = productos.filter(producto => producto.id !== id);
            setProductos(productosActualizados);
        }
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

    const manejarCambioEntradaEdicion = (e) => {
        const { name, value } = e.target;
        setProductoEditando({ ...productoEditando, [name]: value });
    };

    const manejarCambioEntradaNuevo = (e) => {
        const { name, value } = e.target;
        setNuevoProducto({ ...nuevoProducto, [name]: value });
    };

    const manejarAgregarProducto = () => {
        setProductos([...productos, { ...nuevoProducto, id: productos.length + 1 }]);
        setMostrarFormularioAgregar(false);
        setNuevoProducto({
            id: productos.length + 1,
            nombre: '',
            marca: '',
            cantidad: 0,
            descripcion: ''
        });
    };

    const manejarMostrarFormularioAgregar = () => {
        setMostrarFormularioAgregar(true);
    };

    const manejarCancelarAgregar = () => {
        setMostrarFormularioAgregar(false);
        setNuevoProducto({
            id: productos.length + 1,
            nombre: '',
            marca: '',
            cantidad: 0,
            descripcion: ''
        });
    };

    return (
        <div className="contenedor">
            <div className="cabecera">
                <h1>Lista de Productos</h1>
                <button className="boton-agregar" onClick={manejarMostrarFormularioAgregar}>Agregar</button>
            </div>

            {mostrarFormularioAgregar && (
                <div className="formulario-agregar-producto">
                    <h2>Agregar Nuevo Producto</h2>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={nuevoProducto.nombre}
                        onChange={manejarCambioEntradaNuevo}
                    />
                    <input
                        type="text"
                        name="marca"
                        placeholder="Marca"
                        value={nuevoProducto.marca}
                        onChange={manejarCambioEntradaNuevo}
                    />
                    <input
                        type="number"
                        name="cantidad"
                        placeholder="Cantidad"
                        value={nuevoProducto.cantidad}
                        onChange={manejarCambioEntradaNuevo}
                    />
                    <input
                        type="text"
                        name="descripcion"
                        placeholder="Descripción"
                        value={nuevoProducto.descripcion}
                        onChange={manejarCambioEntradaNuevo}
                    />
                    <button className="boton-guardar" onClick={manejarAgregarProducto}>Guardar</button>
                    <button className="boton-cancelar" onClick={manejarCancelarAgregar}>Cancelar</button>
                </div>
            )}

            <div className="contenedor-tabla-productos">
                <table className="tabla-productos">
                    <thead>
                        <tr>
                            <th style={{ width: '150px' }}>Nombre</th>
                            <th style={{ width: '120px' }}>Marca</th>
                            <th style={{ width: '80px' }}>Cantidad</th>
                            <th style={{ width: '300px' }}>Descripción</th>
                            <th style={{ width: '80px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>
                                    {productoEditando && productoEditando.id === producto.id ? (
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={productoEditando.nombre}
                                            onChange={manejarCambioEntradaEdicion}
                                            className="formulario-editar-producto"
                                        />
                                    ) : (
                                        producto.nombre
                                    )}
                                </td>
                                <td>
                                    {productoEditando && productoEditando.id === producto.id ? (
                                        <input
                                            type="text"
                                            name="marca"
                                            value={productoEditando.marca}
                                            onChange={manejarCambioEntradaEdicion}
                                            className="formulario-editar-producto"
                                        />
                                    ) : (
                                        producto.marca
                                    )}
                                </td>
                                <td>
                                    {productoEditando && productoEditando.id === producto.id ? (
                                        <input
                                            type="number"
                                            name="cantidad"
                                            value={productoEditando.cantidad}
                                            onChange={manejarCambioEntradaEdicion}
                                            className="formulario-editar-producto"
                                        />
                                    ) : (
                                        producto.cantidad
                                    )}
                                </td>
                                <td>
                                    {productoEditando && productoEditando.id === producto.id ? (
                                        <input
                                            type="text"
                                            name="descripcion"
                                            value={productoEditando.descripcion}
                                            onChange={manejarCambioEntradaEdicion}
                                            className="formulario-editar-producto"
                                        />
                                    ) : (
                                        producto.descripcion
                                    )}
                                </td>
                                <td>
                                    {productoEditando && productoEditando.id === producto.id ? (
                                        <div className="botones-editar">
                                            <button className="boton-guardar" onClick={manejarGuardar}>Guardar</button>
                                            <button className="boton-cancelar" onClick={manejarCancelar}>Cancelar</button>
                                        </div>
                                    ) : (
                                        <>
                                            <button className="boton-editar" onClick={() => manejarEditar(producto)}>Editar</button>
                                            <button className="boton-eliminar" onClick={() => manejarEliminar(producto.id)}>Eliminar</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListaProductos;






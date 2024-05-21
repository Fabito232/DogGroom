import React from 'react';
import './lista_productos.css';

const Lista_productos = () => {
    const products = [
        { id: 1, name: 'Producto 1', brand: 'Marca 1', quantity: 10, description: 'Descripción del Producto 1' },
        { id: 2, name: 'Producto 2', brand: 'Marca 2', quantity: 20, description: 'Descripción del Producto 2' },
        { id: 3, name: 'Producto 3', brand: 'Marca 3', quantity: 30, description: 'Descripción del Producto 3' },
        // Agrega más productos según sea necesario
    ];

    return (
        <div className="container">
            <div className="header">
                <h1>Lista de Productos</h1>
                <button className="add-button">Agregar</button>
            </div>
            <table className="product-table">
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
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.quantity}</td>
                            <td>{product.description}</td>
                            <td>
                                <button className="edit-button">Editar</button>
                                <button className="delete-button">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Lista_productos;
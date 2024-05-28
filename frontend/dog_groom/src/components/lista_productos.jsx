import React, { useState } from 'react';
import '../styles/lista_productos.css';

const Lista_productos = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Producto 1', brand: 'Marca 1', quantity: 10, description: 'Descripción del Producto 1' },
        { id: 2, name: 'Producto 2', brand: 'Marca 2', quantity: 20, description: 'Descripción del Producto 2' },
        { id: 3, name: 'Producto 3', brand: 'Marca 3', quantity: 30, description: 'Descripción del Producto 3' },
    ]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        id: products.length + 1,
        name: '',
        brand: '',
        quantity: 0,
        description: ''
    });

    const handleEdit = (product) => {
        setEditingProduct({ ...product });
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            const updatedProducts = products.filter(product => product.id !== id);
            setProducts(updatedProducts);
        }
    };

    const handleSave = () => {
        const updatedProducts = products.map(product => {
            if (product.id === editingProduct.id) {
                return editingProduct;
            }
            return product;
        });
        setProducts(updatedProducts);
        setEditingProduct(null);
    };

    const handleCancel = () => {
        setEditingProduct(null);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct({ ...editingProduct, [name]: value });
    };

    const handleNewInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = () => {
        setProducts([...products, { ...newProduct, id: products.length + 1 }]);
        setShowAddForm(false);
        setNewProduct({
            id: products.length + 1,
            name: '',
            brand: '',
            quantity: 0,
            description: ''
        });
    };

    const handleShowAddForm = () => {
        setShowAddForm(true);
    };

    const handleCancelAdd = () => {
        setShowAddForm(false);
        setNewProduct({
            id: products.length + 1,
            name: '',
            brand: '',
            quantity: 0,
            description: ''
        });
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Lista de Productos</h1>
                <button className="add-button" onClick={handleShowAddForm}>Agregar</button>
            </div>

            {showAddForm && (
                <div className="add-product-form">
                    <h2>Agregar Nuevo Producto</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={newProduct.name}
                        onChange={handleNewInputChange}
                    />
                    <input
                        type="text"
                        name="brand"
                        placeholder="Marca"
                        value={newProduct.brand}
                        onChange={handleNewInputChange}
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Cantidad"
                        value={newProduct.quantity}
                        onChange={handleNewInputChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Descripción"
                        value={newProduct.description}
                        onChange={handleNewInputChange}
                    />
                    <button className="save-button" onClick={handleAddProduct}>Guardar</button>
                    <button className="cancel-button" onClick={handleCancelAdd}>Cancelar</button>
                </div>
            )}

            <div className="product-table-container">
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
                                <td>
                                    {editingProduct && editingProduct.id === product.id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editingProduct.name}
                                            onChange={handleEditInputChange}
                                            className="edit-product-form"
                                        />
                                    ) : (
                                        product.name
                                    )}
                                </td>
                                <td>
                                    {editingProduct && editingProduct.id === product.id ? (
                                        <input
                                            type="text"
                                            name="brand"
                                            value={editingProduct.brand}
                                            onChange={handleEditInputChange}
                                            className="edit-product-form"
                                        />
                                    ) : (
                                        product.brand
                                    )}
                                </td>
                                <td>
                                    {editingProduct && editingProduct.id === product.id ? (
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={editingProduct.quantity}
                                            onChange={handleEditInputChange}
                                            className="edit-product-form"
                                        />
                                    ) : (
                                        product.quantity
                                    )}
                                </td>
                                <td>
                                    {editingProduct && editingProduct.id === product.id ? (
                                        <input
                                            type="text"
                                            name="description"
                                            value={editingProduct.description}
                                            onChange={handleEditInputChange}
                                            className="edit-product-form"
                                        />
                                    ) : (
                                        product.description
                                    )}
                                </td>
                                <td>
                                    {editingProduct && editingProduct.id === product.id ? (
                                        <div className="edit-buttons">
                                            <button className="save-button" onClick={handleSave}>Guardar</button>
                                            <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
                                        </div>
                                    ) : (
                                        <>
                                            <button className="edit-button" onClick={() => handleEdit(product)}>Editar</button>
                                            <button className="delete-button" onClick={() => handleDelete(product.id)}>Eliminar</button>
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

export default Lista_productos





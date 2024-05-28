import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/editar_producto.css';

const Editar_producto = ({ product, onSave, onClose }) => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');

    // Llenar los campos con la información del producto cuando se monta el componente
    useEffect(() => {
        if (product) {
            setName(product.name);
            setBrand(product.brand);
            setQuantity(product.quantity);
            setDescription(product.description);
        }
    }, [product]);

    const handleSave = () => {
        // Lógica para guardar los cambios del producto editado
        const editedProduct = {
            id: product.id,
            name,
            brand,
            quantity,
            description
        };
        onSave(editedProduct);
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Editar Producto</h1>
            </div>
            <div className="form-container">
                <label>
                    Nombre:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Marca:
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </label>
                <label>
                    Cantidad:
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </label>
                <label>
                    Descripción:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </label>
            </div>
            <div className="buttons">
                <button className="save-button" onClick={handleSave}>Guardar Cambios</button>
                <button className="exit-button" onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default Editar_producto;


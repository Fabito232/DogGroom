import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/agregar_producto.css';

const Agregar_producto = ({ onClose }) => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');

    const handleSave = () => {
        // Lógica para guardar el producto
        console.log({ name, brand, quantity, description });
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Agregar Producto</h1>
            </div>
            <div className="form-container">
                <label>
                    <input placeholder="Nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    <input placeholder="Marca" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </label>
                <label>
                    <input placeholder="Cantidad" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </label>
                <label>
                    <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </label>
            </div>
            <div className="buttons">
                <button className="save-button" onClick={handleSave}>Guardar</button>
                <Link to="/">
                    <button className="exit-button">Salir</button>
                </Link>
            </div>
        </div>
    );
};

export default Agregar_producto;

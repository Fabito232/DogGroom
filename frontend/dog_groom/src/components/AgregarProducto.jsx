import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement('#root'); // Esto es necesario para la accesibilidad

const AgregarProducto = ({ isOpen, cerrar, agregarProducto, editarProducto, producto, modo }) => {
  const [productoInfo, setProductoInfo] = useState({
    nombre: '',
    marca: '',
    cantidad: '',
    descripcion: ''});

  useEffect(() => {
    if (modo === 'editar' && producto) {
      setProductoInfo(producto);
    } else {
      setProductoInfo({
        nombre: '',
        marca: '',
        cantidad: '',
        descripcion: ''});
    }
  }, [modo, producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modo === 'agregar') {
      agregarProducto(productoInfo);
      setProductoInfo({
        nombre: '',
        marca: '',
        cantidad: '',
        descripcion: ''});
    } else if (modo === 'editar') {
      editarProducto(productoInfo);
    }
    cerrar();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={cerrar} 
      contentLabel="Agregar Producto" 
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <h2 className="text-2xl font-semibold mb-4">{modo === 'agregar' ? 'Agregar Producto' : 'Editar Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre:</label>
            <input 
              type="text" 
              name="nombre" 
              value={productoInfo.nombre} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Marca:</label>
            <input 
              type="text" 
              name="marca" 
              value={productoInfo.marca} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Cantidad:</label>
            <input 
              type="number" 
              name="cantidad" 
              value={productoInfo.cantidad} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Descripcion:</label>
            <input 
              type="text" 
              name="descripcion" 
              value={productoInfo.descripcion} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={cerrar} 
              className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {modo === 'agregar' ? 'Agregar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

AgregarProducto.propTypes = {
    isOpen: PropTypes.bool.isRequired, 
    cerrar: PropTypes.func.isRequired,
    agregarProducto: PropTypes.func.isRequired,
    editarProducto: PropTypes.func.isRequired,
    producto: PropTypes.object,
    modo: PropTypes.string.isRequired
};

export default AgregarProducto;

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement('#root'); // Esto es necesario para la accesibilidad

const AgregarGasto = ({ isOpen, cerrar, agregarGasto, editarGasto, gasto, modo }) => {
  const [gastoInfo, setGastoInfo] = useState({ descripcion: '', fecha: '', monto: '' });

  useEffect(() => {
    if (modo === 'editar' && gasto) {
      setGastoInfo(gasto);
    } else {
      setGastoInfo({ descripcion: '', fecha: '', monto: '' });
    }
  }, [modo, gasto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGastoInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modo === 'agregar') {
      agregarGasto(gastoInfo);
      setGastoInfo({ descripcion: '', fecha: '', monto: '' });
    } else if (modo === 'editar') {
      editarGasto(gastoInfo);
    }
    cerrar();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={cerrar}
      contentLabel="Agregar Gasto"
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <h2 className="text-2xl font-semibold mb-4">{modo === 'agregar' ? 'Agregar Gasto' : 'Editar Gasto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Descripción:</label>
            <input
              type="text"
              name="descripcion"
              value={gastoInfo.descripcion}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={gastoInfo.fecha}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Monto:</label>
            <input
              type="number"
              name="monto"
              value={gastoInfo.monto}
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

AgregarGasto.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  cerrar: PropTypes.func.isRequired,
  agregarGasto: PropTypes.func.isRequired,
  editarGasto: PropTypes.func.isRequired,
  gasto: PropTypes.object,
  modo: PropTypes.string.isRequired
};

export default AgregarGasto;

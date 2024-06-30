import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import FloatingLabelInput from '../fomulario/FloatingLabelInput';

Modal.setAppElement('#root'); // Esto es necesario para la accesibilidad

const AgregarGasto = ({ isOpen, cerrar, agregarGasto, editarGasto, gasto, modo }) => {
  const [gastoInfo, setGastoInfo] = useState({ descripcion: '', fecha: '', monto: '' });

  useEffect(() => {
    if (modo === 'editar' && gasto) {
      setGastoInfo(gasto);
    } else {
      console.log("Hola M")
      setGastoInfo({ descripcion: '', fecha: '', monto: '' });
    }
  }, [modo, gasto, cerrar]);

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
    <div className="bg-slate-200 text-center rounded-lg p-6 w-full max-w-lg mx-4 opacity-90">
        <h2 className="text-2xl font-semibold mb-4">{modo === 'agregar' ? 'Agregar Gasto' : 'Editar Gasto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <FloatingLabelInput
              type="text"
              name="descripcion"
              label="Descripcion"
              value={gastoInfo.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <FloatingLabelInput
              type="date"
              name="fecha"
              label="Fecha"
              value={gastoInfo.fecha}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <FloatingLabelInput
              type="number"
              name="monto"
              label="Monto"
              value={gastoInfo.monto}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={cerrar}
              className="mr-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-500"
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
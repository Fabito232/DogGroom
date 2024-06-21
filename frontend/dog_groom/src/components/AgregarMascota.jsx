import React, { useState } from 'react';
import { agregarMascota } from '../services/mascotaService'; // Asumiendo que existe un servicio para agregar mascotas

const AgregarMascota = ({ clienteCedula, onClose, onMascotaAgregada }) => {
  const [nombreMascota, setNombreMascota] = useState('');
  const [razaMascota, setRazaMascota] = useState('');
  const [tamanoMascota, setTamanoMascota] = useState({ ID_TipoMascota: 0, Descripcion: '' });

  const manejarAgregarMascota = async () => {
    // Lógica para agregar la mascota
    const mascota = {
      nombre: nombreMascota,
      raza: razaMascota,
      tamano: tamanoMascota,
      fotoURL: 'Cliente.jpg', // Imagen fija según tu requerimiento
      cedulaCliente: clienteCedula // Asignar la cédula del cliente al que se le agregará la mascota
    };

    try {
      const res = await agregarMascota(mascota);
      if (res.ok) {
        // Llamar a la función de retorno para indicar que se agregó la mascota
        onMascotaAgregada();
        onClose(); // Cerrar el modal después de agregar la mascota
      } else {
        // Manejar errores si es necesario
        console.error('Error al agregar la mascota:', res.error);
      }
    } catch (error) {
      console.error('Error en la solicitud para agregar la mascota:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg z-50">
        <h2 className="text-2xl font-bold mb-4">Agregar Mascota</h2>
        <div className="mb-4">
          <label htmlFor="nombreMascota" className="block text-sm font-medium text-gray-700">Nombre de la Mascota</label>
          <input
            type="text"
            id="nombreMascota"
            value={nombreMascota}
            onChange={(e) => setNombreMascota(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="razaMascota" className="block text-sm font-medium text-gray-700">Raza de la Mascota</label>
          <input
            type="text"
            id="razaMascota"
            value={razaMascota}
            onChange={(e) => setRazaMascota(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tamanoMascota" className="block text-sm font-medium text-gray-700">Tamaño de la Mascota</label>
          <input
            type="text"
            id="tamanoMascota"
            value={tamanoMascota.Descripcion}
            onChange={(e) => setTamanoMascota({ ...tamanoMascota, Descripcion: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={manejarAgregarMascota}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Agregar Mascota
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgregarMascota;

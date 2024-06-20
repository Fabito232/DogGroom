import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { borrarCita, actualizarCita } from '../services/citaServices'; // Asegúrate de ajustar la ruta correcta

function formatFechaHora(fechaHora) {
    const fecha = new Date(fechaHora);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${anio} - ${horas}:${minutos}`;
  }
function ResumenCita() {
  const location = useLocation();
  const navigate = useNavigate();

  const [editando, setEditando] = useState(false);
  const [citaEditada, setCitaEditada] = useState({});
  const { cita } = location.state || {};

  if (!cita) {
    return <div>No hay datos de la cita disponible.</div>;
  }

  const {
    id,
    start,
    end,
    cedula,
    title,
    descripcion,
    estado,
    montoTotal,
    montoAdicional,
    cliente,
    servicio
  } = cita;
  console.log("Ayuda",cita)
  const total = parseFloat(montoTotal) + parseFloat(montoAdicional);

  const manejarEditar = () => {
    setEditando(true);
    setCitaEditada({
      //id,
      fechaYHora: start,
      cedula,
      descripcion,
      estado,
      montoTotal,
      montoAdicional,
      Cedula: cliente.Cedula,
      ID_Servicio: servicio.id_servicio
    });
  };
 

  const manejarGuardar = async () => {
    try {
      await actualizarCita(citaEditada, id); // Llamada a la función de actualización con el ID de la cita
      setEditando(false);
      navigate('/citas', { state: { actualizar: true } });
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
    }
  };
 

  const manejarCancelar = () => {
    setEditando(false);
    setCitaEditada({});
  };

  const manejarEliminar = async () => {
    const confirmacion = window.confirm('¿Estás seguro de eliminar esta cita?');
    if (confirmacion) {
      try {
        await borrarCita(id); // Llamada a la función de eliminación con el ID de la cita
        navigate('/citas', { state: { actualizar: true } });
      } catch (error) {
        console.error('Error al eliminar la cita:', error);
      }
    }
  };
  const manejarSalir = () => {
    navigate('/citas');
  };

  return (
    <div className="flex items-start justify-center w-full bg-fondo1 bg-cover">
    
      <div className="bg-lime-800 rounded-3xl p-8 m-4 space-y-8 md:flex md:items-start md:space-x-8">

        <div className="space-y-8">
          <label className="block text-gray-900 text-sm font-bold mb-2">Fecha y Hora:</label>
          <input
            type="text"
            readOnly={!editando}
            className="p-3 border border-gray-300 rounded w-80"
            value={editando ? citaEditada.fechaYHora : formatFechaHora(start)}
            onChange={(e) => setCitaEditada({ ...citaEditada, fechaYHora: e.target.value })}
          />
          {cliente.mascotas[0].fotoURL && (
            <img
              src={cliente.mascotas[0].fotoURL}
              alt="Mascota"
              className="w-48 h-48 object-cover rounded-md"
            />
          )}
            <div className="mt-4">
                <button
                    className="bg-red-700 hover:bg-red-900 text-white font-bold w-40 h-12 rounded-md"
                    onClick={manejarSalir}
                    >
                    Salir
                </button>

            </div>
          
        </div>
        
            
        <div className="flex-1 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">Nombre:</label>
              <input
                type="text"
                readOnly
                className="p-3 border border-gray-300 rounded w-64"
                value={cliente.nombre}
              />
            </div>
            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">Cédula:</label>
              <input
                type="text"
                readOnly
                className="p-3 border border-gray-300 rounded w-64"
                value={cliente.cedula}
              />
            </div>
            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">Teléfono:</label>
              <input
                type="text"
                readOnly
                className="p-3 border border-gray-300 rounded w-64"
                value={cliente.telefono}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">Mascota:</label>
              <input
                type="text"
                readOnly
                className="p-3 border border-gray-300 rounded w-64"
                value={cliente.mascotas[0].nombre}
              />
            </div>
            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">Raza:</label>
              <input
                type="text"
                readOnly
                className="p-3 border border-gray-300 rounded w-64"
                value={cliente.mascotas[0].raza}
              />
            </div>
            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">Tamaño:</label>
              <input
                type="text"
                readOnly
                className="p-3 border border-gray-300 rounded w-64"
                value={cliente.mascotas[0].tipoMascota}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <table className="min-w-40 divide-y divide-gray-200 border-collapse mt-4">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border border-gray-200">Servicio</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border border-gray-200">Precio</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="bg-white border border-gray-200">
                  <td className="px-4 py-2 whitespace-nowrap border border-gray-200">{servicio.descripcion}</td>
                  <td className="px-4 py-2 whitespace-nowrap border border-gray-200">{servicio.precio.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 justify-end">
            <div className="text-right">
              <label className="block text-gray-900 text-sm font-bold mb-2">Estado:</label>
              <select
                className="p-3 border border-gray-300 rounded w-64"
                readOnly={!editando}
                disabled={!editando}
                value={editando ? citaEditada.estado : estado}
                onChange={(e) => setCitaEditada({ ...citaEditada, estado: e.target.value })}
                
              >
                <option value=""disabled>Seleccionar</option>
                <option value="True">En proceso</option>
                <option value="False">Finalizado</option>
              </select>

              
              <label className="block text-gray-900 text-sm font-bold mb-2">Monto Adicional:</label>
              <input
                type="text"
                
                readOnly={!editando}
                className="p-3 border border-gray-300 rounded w-64"
                value={editando ? citaEditada.montoAdicional : montoAdicional}
                onChange={(e) => setCitaEditada({ ...citaEditada, montoAdicional: e.target.value })}
              />
            </div>
            <div className="text-right">
              <label className="block text-gray-900 text-sm font-bold mb-2">Total:</label>
              <input
                type="text"
                readOnly
                className="p-3 border border-gray-300 rounded w-64"
                value={total.toFixed(2)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            {!editando ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-40 h-12 rounded-md"
                onClick={manejarEditar}
              >
                Editar
              </button>
            ) : (
              <>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                  onClick={manejarGuardar}
                >
                  Guardar
                </button>
                <button
                  className="bg-red-700 hover:bg-red-900 text-white font-bold w-40 h-12 rounded-md"
                  onClick={manejarCancelar}
                >
                  Cancelar
                </button>
              </>
            )}
            <button
              className="bg-red-700 hover:bg-gray-400 text-black font-bold w-40 h-12 rounded-md"
              onClick={manejarEliminar}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumenCita;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { borrarCita, actualizarCita } from '../services/citaServices';
import { notificarError, notificarExito } from '../utilis/notificaciones';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { URL_Hosting } from '../services/api';

function formatFechaHora(fechaHora) {
  const fecha = dayjs(fechaHora).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  return fecha;
}

function ResumenCita() {
  const location = useLocation();
  const navigate = useNavigate();

  const [editando, setEditando] = useState(false);
  const [citaEditada, setCitaEditada] = useState({});
  const [montoTotal, setMontoTotal] = useState(0); // Estado para manejar montoTotal
  const [montoAdicionalInicial, setMontoAdicionalInicial] = useState(0);
  const { cita } = location.state || {};
  console.log("Hola", cita)
  useEffect(() => {
    if (cita) {
      setCitaEditada({
        fechaYHora: formatFechaHora(cita.start),
        cedula: cita.cedula,
        descripcion: cita.descripcion,
        estado: cita.estado,
        montoTotal: cita.montoTotal,
        montoAdicional: cita.montoAdicional,
        Cedula: cita.cliente.Cedula,
        ID_Servicio: cita.servicio.id_servicio,
        ID_Mascota: cita.mascotas.id
      });
      setMontoTotal(parseFloat(cita.montoTotal)); // Inicializar montoTotal con el valor actual de la cita
      setMontoAdicionalInicial(parseFloat(cita.montoAdicional));
    }
  }, [cita]);
  console.log(cita)
  

  if (!cita) {
    return <div>No hay datos de la cita disponible.</div>;
  }

  const { id, cliente, servicio, mascota } = cita;

  const manejarEditar = () => {
    setEditando(true);
  };

  const manejarGuardar = async () => {
    try {
      const fechaHoraISO = dayjs(citaEditada.fechaYHora).toISOString();
      const estadoString = citaEditada.estado ? "True" : "False";
      const montoTotalActualizado = parseFloat(cita.montoTotal) + (parseFloat(citaEditada.montoAdicional) - montoAdicionalInicial);
      await actualizarCita({ ...citaEditada, estado: estadoString, fechaYHora: fechaHoraISO, montoTotal: montoTotalActualizado }, id);
      setEditando(false);
      notificarExito('Se editó la cita');
      navigate('/citas', { state: { actualizar: true } });
    } catch (error) {
      notificarError(error);
      console.error('Error al actualizar la cita:', error);
    }
  };

  const manejarCancelar = () => {
    setEditando(false);
    setCitaEditada({});
  };

  const manejarEliminar = async () => {
    const resultado = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
      try {
        await borrarCita(id);
        toast.success('Se eliminó la cita', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/citas', { state: { actualizar: true } });
      } catch (error) {
        toast.error(`Error al eliminar la cita: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error('Error al eliminar la cita:', error);
      }
    }
  };

  const manejarSalir = () => {
    navigate('/citas');
  };

  const manejarCambioMontoAdicional = (e) => {
    const nuevoMontoAdicional = parseFloat(e.target.value) || 0;
    const diferencia = nuevoMontoAdicional - montoAdicionalInicial;
    const nuevoMontoTotal = parseFloat(cita.montoTotal) + diferencia;
    setCitaEditada({ ...citaEditada, montoAdicional: nuevoMontoAdicional });
    setMontoTotal(nuevoMontoTotal); // Actualizar montoTotal en el estado local
  };

  return (
    <div className="min-h-screen bg-primary bg-opacity-80 bg-fondo1 bg-cover flex items-center justify-center">
      <div className="bg-lime-800 object-center rounded-3xl p-8 m-4 space-y-14 w-full max-w-5xl">
        <div className="flex flex-col md:flex-row md:space-x-8 justify-center">
          <div className="flex-1 space-y-8">
            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">Fecha y Hora:</label>
              <input
                type="text"
                readOnly={!editando}
                className="p-3 border border-gray-300 rounded w-full md:w-80"
                value={editando ? new Date(citaEditada.fechaYHora).toString() : formatFechaHora(cita.start)}
                onChange={(e) => setCitaEditada({ ...citaEditada, fechaYHora: new Date(e.target.value).toISOString() })}
              />
            </div>
            {cita.mascotas.fotoURL && (
              <div>
                <img
                  src={URL_Hosting + cita.mascotas.fotoURL}
                  alt="Mascota"
                  className="w-48 h-48 object-cover rounded-md"
                />
              </div>
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
                  className="p-3 border border-gray-300 rounded w-full"
                  value={cliente.nombre}
                />
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-bold mb-2">Cédula:</label>
                <input
                  type="text"
                  readOnly
                  className="p-3 border border-gray-300 rounded w-full"
                  value={cliente.cedula}
                />
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-bold mb-2">Teléfono:</label>
                <input
                  type="text"
                  readOnly
                  className="p-3 border border-gray-300 rounded w-full"
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
                  className="p-3 border border-gray-300 rounded w-full"
                  value={cita.mascotas.nombre}
                />
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-bold mb-2">Raza:</label>
                <input
                  type="text"
                  readOnly
                  className="p-3 border border-gray-300 rounded w-full"
                  value={cita.mascotas.raza}
                />
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-bold mb-2">Tamaño:</label>
                <input
                  type="text"
                  readOnly
                  className="p-3 border border-gray-300 rounded w-full"
                  value={cita.mascotas.tipoMascota}
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
            <div className="grid grid-cols-1 gap-6 justify-end">
              <div className="text-right">
                <label className="block text-gray-900 text-sm font-bold mb-2">Estado:</label>
                <select
                  className="p-3 border border-gray-300 rounded w-full md:w-64"
                  readOnly={!editando}
                  disabled={!editando}
                  value={editando ? (citaEditada.estado ? "True" : "False") : (cita.estado ? "True" : "False")}
                  onChange={(e) => setCitaEditada({ ...citaEditada, estado: e.target.value === "True" })}
                >
                  <option value="" disabled>Seleccionar</option>
                  <option value="True">En proceso</option>
                  <option value="False">Finalizado</option>
                </select>
                <label className="block text-gray-900 text-sm font-bold mb-2">Monto Adicional:</label>
                <input
                  type="text"
                  readOnly={!editando}
                  className="p-3 border border-gray-300 rounded w-full md:w-64"
                  value={editando ? citaEditada.montoAdicional : cita.montoAdicional}
                  onChange={manejarCambioMontoAdicional}
                />
              </div>
              <div className="text-right">
                <label className="block text-gray-900 text-sm font-bold mb-2">Total:</label>
                <input
                  type="text"
                  readOnly
                  className="p-3 border border-gray-300 rounded w-full md:w-64"
                  value={montoTotal.toFixed(2)}
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
    </div>
  );
}

export default ResumenCita;

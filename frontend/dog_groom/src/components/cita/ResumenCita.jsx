import { useState, useEffect } from 'react';
import { actualizarCita, borrarCita } from '../../services/citaServices';
import { notificarError, notificarExito } from '../../utilis/notificaciones';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { URL_Hosting } from '../../services/api';
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import FloatingLabelInput from '../formulario/FloatingLabelInput';
import { faXmark, FontAwesomeIcon, faTrashCan, faPenToSquare } from '../../utilis/iconos';
import ImgMascota from '../../assets/img_perro.jpg';

function formatFechaHora(fechaHora) {
  const fecha = dayjs(fechaHora).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  return fecha;
}

function ResumenCita({isOpen, cerrar, cita}) {

  const [editando, setEditando] = useState(false);
  const [citaEditada, setCitaEditada] = useState({});
  const [montoTotal, setMontoTotal] = useState(0);
  const [montoAdicional, setMontoAdicional] = useState(0);
  const [montoAdicionalInicial, setMontoAdicionalInicial] = useState(0);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (cita && isOpen) {
      const { start, montoTotal, montoAdicional} = cita;
      setCitaEditada({
        
        fechaYHora: formatFechaHora(start),
        cedula: cita.cedula,
        descripcion: cita.descripcion,
        estado: cita.estado,
        montoTotal: cita.montoTotal,
        montoAdicional: montoAdicional || 0, 
        Cedula: cita.cliente.Cedula,
        ID_Servicio: cita.servicio.id_servicio,
        ID_Mascota: cita.mascotas.id

      });
      setMontoTotal(parseFloat(montoTotal));
      setMontoAdicional(parseFloat(montoAdicional) || 0);
      setMontoAdicionalInicial(parseFloat(montoAdicional) || 0);
      setFecha(dayjs(start).format('YYYY-MM-DD'));
      setHora(dayjs(start).format('HH:mm'));
      setDescripcion(cita.descripcion);
    }
  }, [cita, isOpen]);

  if (!cita) {
    return ;
  }

  const { id, cliente, servicio } = cita;
  console.log(cita)

  const manejarCambioFecha = (e) => {
    const nuevaFecha = e.target.value;
    setFecha(nuevaFecha);
    actualizarFechaYHora(nuevaFecha, hora);
  };

  const manejarCambioHora = (e) => {
    const nuevaHora = e.target.value;
    setHora(nuevaHora);
    actualizarFechaYHora(fecha, nuevaHora);
  };

  const actualizarFechaYHora = (fecha, hora) => {
    const nuevaFechaYHora = dayjs(`${fecha}T${hora}`).toISOString();
    setCitaEditada({ ...citaEditada, fechaYHora: nuevaFechaYHora });
  };

  const limitanteTiempo = () => {
    const times = [];
    for (let h = 8; h < 18; h++) {
      times.push(`${String(h).padStart(2, '0')}:00`);
      times.push(`${String(h).padStart(2, '0')}:30`);
    }
    return times;
  };

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
      cerrar()
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
        cerrar()
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

  const manejarCambioMontoAdicional = (e) => {
    const nuevoMontoAdicional = parseFloat(e.target.value) || 0;
    const diferencia = nuevoMontoAdicional - montoAdicionalInicial;
    const nuevoMontoTotal = parseFloat(cita.montoTotal) + diferencia;
    setCitaEditada({ ...citaEditada, montoAdicional: nuevoMontoAdicional });
    setMontoTotal(nuevoMontoTotal);
    setMontoAdicional(nuevoMontoAdicional);
  };
  const manejarCambioDescripcion = (e) => {
    const nuevaDescripccion = e.target.value || "";
    setCitaEditada({ ...citaEditada, descripcion: nuevaDescripccion });
  };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={cerrar}
    contentLabel="Resumen Cita"
    className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-30"
    overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-30"
    >
    {cita && (
    <div className="relative w-full max-w-6xl rounded-3xl p-4 md:p-8 bg-slate-200 overflow-hidden max-h-full overflow-y-auto shadow-xl">
      <button onClick={cerrar} className="absolute top-2 right-4  text-gray-500 hover:bg-red-700 text-2xl p-1 rounded"><FontAwesomeIcon icon={faXmark} /></button>

      <div className=" object-center rounded-3xl p-8 space-y-14 w-full ">
        <div className="flex flex-col md:flex-row md:space-x-8 justify-center">
          <div className="flex-1 space-y-6">
            <h1 className='text-center text-black font-bold mb-4'>Datos del Cliente</h1>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <FloatingLabelInput
                    type="text"
                    readOnly
                    disabled={true}
                    name={'Cliente'}
                    label={'Cliente'}
                    value={cliente.nombre}
                  />
                </div>
                <div>
                  <FloatingLabelInput
                    type="text"
                    readOnly
                    disabled={true}
                    name={'Cedula'}
                    label={'Cédula'}
                    value={cliente.cedula}
                  />
                </div>
                <div>
                  <FloatingLabelInput
                    type="text"
                    readOnly
                    disabled={true}
                    name={'Telefono'}
                    label={'Teléfono'}
                    value={cliente.telefono}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <FloatingLabelInput
                    type="text"
                    readOnly
                    disabled={true}
                    name={'Mascota'}
                    label={'Mascota'}
                    value={cita.mascotas.nombre}
                  />
                </div>
                <div>
                  <FloatingLabelInput
                    type="text"
                    readOnly
                    disabled={true}
                    name={'Raza'}
                    label={'Raza'}
                    value={cita.mascotas.raza}
                  />
                </div>
                <div>
                  <FloatingLabelInput
                    type="text"
                    readOnly
                    disabled={true}
                    name={'Tamano'}
                    label={'Tamaño'}
                    value={cita.mascotas.tipoMascota}
                  />
                </div>
              </div>

              {cita.mascotas.fotoURL ? (
                <div className='flex justify-center m-5'>
                  <img
                    src={URL_Hosting + cita.mascotas.fotoURL}
                    alt="Mascota"
                    className="w-60 h-60 object-cover rounded-md"
                  />
                </div>
              ) : (
                <div className='flex justify-center m-5'>
                  <img
                    src={ImgMascota}
                    alt="Mascota"
                    className="w-60 h-60 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          <div className="flex-1 space-y-6">
            <h1 className='text-center text-black font-bold mb-4 '>Datos de la Cita</h1>
            <div>
                {editando ? (
                  <FloatingLabelInput
                    type="date"
                    value={fecha}
                    name={'Fecha'}
                    label={'Fecha'}
                    onChange={manejarCambioFecha}
                  />
                ) : (
                  <FloatingLabelInput
                    type="text"
                    readOnly
                    disabled={true}
                    name={'Fecha'}
                    label={'Fecha'}
                    value={dayjs(cita.start).format('DD/MM/YYYY')}

                  />
                )}
              </div>
              <div >
                {editando ? (
                  <>
                  <label className="block text-gray-900 text-sm font-bold mb-2">Hora:</label>
                  <select
                    className="p-3 text-lg border h-12 border-gray-500  bg-slate-200 rounded-md w-full text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                    value={hora}
                    onChange={manejarCambioHora}
                  >
                    {limitanteTiempo().map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  </>
                ) : (
                  <FloatingLabelInput
                    type="text"
                    readOnly
                    disabled={true}
                    name={'Hora'}
                    label={'Hora'}
                    value={dayjs(cita.start).format('H:mm a')}
                  />
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <table className="min-w-40 divide-y divide-gray-200 border-collapse mt-4 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs text-black font-bold uppercase border border-gray-200">Servicio</th>
                      <th className="px-4 py-2 text-left text-xs text-black font-bold uppercase border border-gray-200">Precio</th>
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
                  <FloatingLabelInput
                      type="text"
                      name={'descripcion'}
                      label={'Descripcion'}
                      readOnly={!editando}
                      value={editando ? citaEditada.descripcion : cita.descripcion || ""}
                      onChange={manejarCambioDescripcion}
                    />
                  </div>

                <div className="text-right">
                  <FloatingLabelInput
                      type="text"
                      name={'montoAdicional'}
                      label={'Monto Adicional'}
                      readOnly={!editando}
                      value={editando ? citaEditada.montoAdicional : cita.montoAdicional || 0}
                      onChange={manejarCambioMontoAdicional}
                    />
                  </div>
                <div className="text-right">
                  <FloatingLabelInput
                    type="text"
                    name={'total'}
                    label={'Total'}
                    readOnly
                    value={montoTotal.toFixed(2)}
                  />
                </div>
                <div className="text-center my-4">
                  <div className="border border-gray-500 rounded-lg p-4">
                    <label className="block text-gray-900 text-sm font-bold mb-2 text-center">Estado</label>
                    <div className="flex items-center justify-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-6 w-6 text-blue-600 checked:bg-green-500"
                          checked={editando ? citaEditada.estado : cita.estado}
                          onChange={(e) => setCitaEditada({ ...citaEditada, estado: e.target.checked })}
                          disabled={!editando}
                          readOnly={!editando}
                        />
                        <span className="ml-2 text-lg text-gray-900 dark:text-white">En proceso</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-6 w-6 text-blue-600 checked:bg-red-500"
                          checked={editando ? !citaEditada.estado : !cita.estado}
                          onChange={(e) => setCitaEditada({ ...citaEditada, estado: !e.target.checked })}
                          disabled={!editando}
                          readOnly={!editando}
                        />
                        <span className="ml-2 text-lg text-gray-900 dark:text-white">Finalizado</span>
                      </label>
                    </div>
                  </div>
                </div>

              </div>
              <div className="flex justify-center space-x-4 mt-4">
                {!editando ? (
                  <>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-40 h-12 rounded-md"
                    onClick={manejarEditar}
                  >
                   <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                   <button
                   className="bg-red-700 hover:bg-gray-400 text-white font-bold w-40 h-12 rounded-md"
                   onClick={manejarEliminar}
                 >
                   <FontAwesomeIcon icon={faTrashCan} />
                 </button>
                 </>
                ) : (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold w-40 h-12  rounded-md"
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
               
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </Modal>
  );
}

ResumenCita.propTypes = {
  isOpen: PropTypes.bool,
  cerrar: PropTypes.func,
  cita: PropTypes.object,
  agregarCita: PropTypes.func
}

export default ResumenCita;

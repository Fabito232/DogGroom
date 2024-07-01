import { useState, useEffect } from 'react';
import { obtenerClientes } from '../../services/clienteService';
import { crearCita} from '../../services/citaServices'; // Asegúrate de importar obtenerCitas
import { notificarExito, notificarError, notificarInfo} from '../../utilis/notificaciones';
import { obtenerServicios } from '../../services/paqueteServices';
import imgPerro from '../../assets/img_perro.jpg';
import { URL_Hosting } from '../../services/api';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import FloatingLabelInput from '../formulario/FloatingLabelInput'
import { faChevronRight,FontAwesomeIcon,faSearch } from '../../utilis/iconos.js'

function AgendarCita({isOpen, cerrar, fechaInicial}) {
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [mascotasCliente, setMascotasCliente] = useState([]);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [nombreCliente, setNombreCliente] = useState('');
  const [cedulaCliente, setCedulaCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [id_servicio, setIDServicio] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [montoAdicional, setMontoAdicional] = useState('');
  const [montoTotal, setMontoTotal] = useState('');
  const [filtroCliente, setFiltroCliente] = useState('');

  const handleFiltroClienteChange = (e) => {
    setFiltroCliente(e.target.value);
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(filtroCliente.toLowerCase())
  );

  const resetForm = () => {
    setMascotasCliente([]);
    setMascotaSeleccionada(null);
    setNombreCliente('');
    setCedulaCliente('');
    setTelefonoCliente('');
    setFecha('');
    setHora('');
    setIDServicio('');
    setPrecio('');
    setDescripcion('');
    setEstado('');
    setMontoAdicional('');
    setMontoTotal('');
    setFiltroCliente('');
  };

  useEffect(() => {
    resetForm();
  }, [cerrar]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resClientes = await obtenerClientes();
        const resServicios = await obtenerServicios();
        if(resServicios.ok){
          setServicios(resServicios.data);
        }
        const listaClientes = resClientes.data.map(cliente => ({
          id: cliente.Cedula,
          cedula: cliente.Cedula,
          nombre: cliente.Nombre,
          telefono: cliente.Telefono,
          mascotas: cliente.Mascota.map(mascota => ({
            id: mascota.ID_Mascota,
            nombre: mascota.Nombre,
            raza: mascota.Raza,
            tamano: mascota.TipoMascotum.Descripcion,
            fotoURL: mascota.FotoURL,
            ID_TipoMascota: mascota.ID_TipoMascota,
          }))
        }));
        setClientes(listaClientes);
        setFecha(dayjs(fechaInicial).format('YYYY-MM-DD'))
      } catch (error) {
        console.log("Hola")
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, [fechaInicial]);

  const handleSelectCliente = (cliente) => {
    setNombreCliente(cliente.nombre);
    setCedulaCliente(cliente.cedula);
    setTelefonoCliente(cliente.telefono);
    console.log(cliente.mascotas)
    
    if(cliente.mascotas.length !== 0){
      setMascotasCliente(cliente.mascotas);
    }else{
      notificarError("Este cliente no tiene registrado ninguna mascota")
    }

    if (cliente.mascotas.length > 0) {
      setMascotaSeleccionada();
    } else {
      setMascotaSeleccionada(null);
    }
  };

  const handleServicioChange = (e) => {
    const idServicio = e.target.value;
    const servicio = servicios.find(serv => serv.ID_Servicio === parseInt(idServicio));
    setIDServicio(idServicio);
    setPrecio(servicio?.Precio || '');
    calcularMontoTotal(servicio?.Precio || 0, montoAdicional);
  };

  const handleMontoAdicionalChange = (e) => {
    const nuevoMontoAdicional = e.target.value;
    setMontoAdicional(nuevoMontoAdicional);
    calcularMontoTotal(precio, nuevoMontoAdicional);
  };

  const calcularMontoTotal = (precioServicio, montoAdicional) => {
    const total = parseFloat(precioServicio || 0) + parseFloat(montoAdicional || 0);
    setMontoTotal(total.toFixed(2));
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let h = 8; h < 18; h++) {
      times.push(`${String(h).padStart(2, '0')}:00`);
      times.push(`${String(h).padStart(2, '0')}:30`);
    }
    return times;
  };

  const handleAgendaCita = async (e) => {
    e.preventDefault();
    if(cedulaCliente && mascotaSeleccionada){
    const fechaYHoraCita = `${fecha}T${hora}`;
    const cita = {
      fechaYHora: fechaYHoraCita,
      estado: estado,
      montoTotal: montoTotal,
      descripcion: descripcion,
      cedula: cedulaCliente,
      montoAdicional: montoAdicional === '' ? null : parseFloat(montoAdicional),
      ID_Servicio: id_servicio,
      ID_Mascota: mascotaSeleccionada.id
    };
      try {
        const resCita = await crearCita(cita);
        if (resCita.ok) {
          notificarExito("Se agendó la cita con éxito", {
            autoClose: 1500,
            theme: "colored",
          });
          cerrar()
        } else {
          notificarError(resCita.message);
        }
      
      } catch (error) {
        notificarError(error.message);
      }
    }else{
      notificarInfo("Debe selecionar un cliente y su mascota")
    }
  }
 
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={cerrar}
      contentLabel="Agregar Servicio"
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
    >
      <div className="relative w-full max-w-6xl rounded-3xl p-4 md:p-8 bg-slate-200 overflow-hidden max-h-full overflow-y-auto shadow-xl">
        <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/3 bg-amber-800 bg-opacity-90 rounded-3xl p-4 md:p-8 m-2 md:m-4 overflow-y-auto">
          <h3 className="text-white text-center font-bold mb-4">Clientes</h3>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar cliente..."
                className="py-2 px-4 w-full text-white bg-gray-800 rounded-md focus:outline-none"
                value={filtroCliente}
                onChange={handleFiltroClienteChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
            </div>
          </div>
          <div className="overflow-y-auto max-h-96">
            {clientesFiltrados.length === 0 ? (
              <p className="text-white">No hay clientes disponibles.</p>
            ) : (
              <ul className="divide-y divide-gray-600">
                {clientesFiltrados.map((cliente) => (
                  <li
                    key={cliente.id}
                    className="py-2 px-4 cursor-pointer flex items-center justify-between hover:bg-gray-700"
                    onClick={() => handleSelectCliente(cliente)}
                  >
                    <div>
                      <p className="text-white">{cliente.nombre}</p>
                      <p className="text-gray-400 text-sm">{cliente.cedula}</p>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} className="text-white" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

          <div className="w-full md:w-2/3 rounded-3xl p-4 md:p-4 m-2 ">
            <form onSubmit={handleAgendaCita} className="space-y-4 w-full">
            {nombreCliente && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  type="text"
                  id="nombreCliente"
                  name="nombreCliente"
                  label="Nombre del Cliente"
                  value={nombreCliente}
                  disabled={true}
                  readOnly
                />
                <FloatingLabelInput
                  type="text"
                  id="cedula"
                  name="cedula"
                  label="Cédula"
                  value={cedulaCliente}
                  disabled={true}
                  readOnly
                />
                <FloatingLabelInput
                  type="text"
                  id="telefono"
                  name="telefono"
                  label="Teléfono"
                  value={telefonoCliente}
                  disabled={true}
                  readOnly
                />
                <select
                  className="p-3 text-lg border h-12 border-gray-500  bg-slate-200 rounded-md w-full text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  value={mascotaSeleccionada?.id || ''}
                  onChange={(e) => {
                    const mascota = mascotasCliente.find(m => m.id === parseInt(e.target.value));
                    setMascotaSeleccionada(mascota);
                  }}
                  required
                >
                  <option value="" disabled>Seleccione una mascota</option>
                  {mascotasCliente.map(mascota => (
                    <option key={mascota.id} value={mascota.id}>{mascota.nombre}</option>
                  ))}
                </select>
              </div>
                  )}
              {mascotaSeleccionada && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='grid grid-cols-1'>  
                    <FloatingLabelInput
                      type="text"
                      label="Nombre del Perro"
                      value={telefonoCliente}
                      readOnly
                      disabled={false}
                    />
                    <FloatingLabelInput
                      type="text"
                      label="Raza"
                      value={mascotaSeleccionada.raza}
                      readOnly
                      disabled={false}
                    />
                    <FloatingLabelInput
                      type="text"
                      label="Tamaño"
                      value={mascotaSeleccionada.tamano}
                      readOnly
                      disabled={false}
                    />
                    </div>
                    <div className='flex justify-center'>
                    {mascotaSeleccionada.fotoURL ? (
                      <img
                        src={URL_Hosting + mascotaSeleccionada.fotoURL || imgPerro}
                        alt="Mascota"
                        className="w-40 h-40 object-cover rounded-2xl items-center justify-center"
                      />
                    ) : (
                      <img
                        src={ imgPerro}
                        alt="Mascota"
                        className="w-40 h-40 object-cover rounded-2xl  items-center justify-center"
                      />
                    )}
                    </div>
                  </div>
           
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FloatingLabelInput
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
                <select
                  className="p-3 text-lg border h-12 border-gray-500  bg-slate-200 rounded-md w-full text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  id="hora"
                  name="hora"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Selecciona la hora
                  </option>
                  {generateTimeOptions().map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <select
                  className="p-3 text-lg border h-12 border-gray-500  bg-slate-200 rounded-md w-full text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  id="servicio"
                  name="servicio"
                  value={id_servicio}
                  onChange={handleServicioChange}
                  required
                >
                  <option value="" disabled>Seleccione un servicio</option>
                  {servicios.map(servicio => (
                    <option key={servicio.ID_Servicio} value={servicio.ID_Servicio}>{servicio.Descripcion}</option>
                  ))}
                </select>
                <FloatingLabelInput
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  label="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
                <select
                  className="p-3 text-lg border h-12 border-gray-500  bg-slate-200 rounded-md w-full text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  id="estado"
                  name="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Estado
                  </option>
                  <option value="true">En proceso</option>
                  <option value="false">Finalizar</option>
                </select>
                <FloatingLabelInput
                  type="text"
                  id="precio"
                  name="precio"
                  label="Precio"
                  value={precio}
                  readOnly
                  required
                />
                <FloatingLabelInput
                  type="text"
                  id="montoAdicional"
                  name="montoAdicional"
                  label="Monto Adicional"
                  value={montoAdicional}
                  onChange={handleMontoAdicionalChange}
                />
                <FloatingLabelInput
                  type="text"
                  id="montoTotal"
                  name="montoTotal"
                  label="Monto Total"
                  value={montoTotal}
                  readOnly
                  required
                />
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Agendar cita
                </button>
                <button
                  className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={cerrar}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

AgendarCita.propTypes = {
  isOpen: PropTypes.bool,
  cerrar: PropTypes.func,
  fechaInicial: PropTypes.string,
  
}

export default AgendarCita;
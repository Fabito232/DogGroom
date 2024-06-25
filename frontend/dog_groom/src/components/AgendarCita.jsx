import { useState, useEffect } from 'react';
import { obtenerClientes } from '../services/clienteService';
import { crearCita} from '../services/citaServices'; // Asegúrate de importar obtenerCitas
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { obtenerServicios } from '../services/paqueteServices';
import imgPerro from '../assets/img_perro.jpg';
import { URL_Hosting } from '../services/api';
import Header from "./Header";

function AgendarCita() {
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

  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resClientes = await obtenerClientes();
        const resServicios = await obtenerServicios();
        setServicios(resServicios.data);

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
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, []);

  const handleSelectCliente = (cliente) => {
    setNombreCliente(cliente.nombre);
    setCedulaCliente(cliente.cedula);
    setTelefonoCliente(cliente.telefono);
    setMascotasCliente(cliente.mascotas);

    if (cliente.mascotas.length > 0) {
      setMascotaSeleccionada(cliente.mascotas[0]);
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
        toast.success("Se agendó la cita con éxito", {
          autoClose: 1500,
          theme: "colored",
        });
        navigate('/citas');
      } else {
        toast.error(resCita.message, { autoClose: 1500, theme: "colored" });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 1500, theme: "colored" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-primary bg-opacity-80 bg-fondo1 bg-cover">
      <Header />
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-3xl p-8 m-4">
          <div className="w-full md:w-1/3 bg-amber-800 bg-opacity-90 rounded-3xl p-8 m-4 overflow-hidden">
            <div className="overflow-y-auto" style={{ maxHeight: '400px', scrollbarWidth: 'none' }}>
              <ul className="list-none p-0">
                {clientes.map((cliente) => (
                  <li
                    key={cliente.id}
                    className="bg-black my-2 p-2 rounded-md text-white cursor-pointer"
                    onClick={() => handleSelectCliente(cliente)}
                  >
                    <span>
                      {cliente.nombre} - {cliente.cedula}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full md:w-3/4 bg-sky-900 rounded-3xl p-8 m-4 flex items-center justify-center">
            <form onSubmit={handleAgendaCita} className="space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="nombreCliente"
                  name="nombreCliente"
                  placeholder="Nombre del Cliente"
                  value={nombreCliente}
                  readOnly
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded mb-2"
                  type="text"
                  id="cedula"
                  name="cedula"
                  placeholder="Cédula"
                  value={cedulaCliente}
                  readOnly
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="telefono"
                  name="telefono"
                  placeholder="Teléfono"
                  value={telefonoCliente}
                  readOnly
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <select
                  className="p-3 border border-gray-300 rounded w-full mb-2"
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

              {mascotaSeleccionada && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      className="p-3 border border-gray-300 rounded w-full mb-2"
                      type="text"
                      placeholder="Nombre del Perro"
                      value={mascotaSeleccionada.nombre}
                      readOnly
                    />
                    <input
                      className="p-3 border border-gray-300 rounded w-full mb-2"
                      type="text"
                      placeholder="Raza"
                      value={mascotaSeleccionada.raza}
                      readOnly
                    />
                    <input
                      className="p-3 border border-gray-300 rounded w-full mb-2"
                      type="text"
                      placeholder="Tamaño"
                      value={mascotaSeleccionada.tamano}
                      readOnly
                    />
                  </div>
                  <div className="mb-8 md:mr-8 md:mb-0">
                    {mascotaSeleccionada.fotoURL && (
                      <img
                        src={URL_Hosting + mascotaSeleccionada.fotoURL || imgPerro}
                        alt="Mascota"
                        className="w-48 h-48 object-cover rounded-md mt-4"
                      />
                    )}
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
                <select
                  className="p-3 border border-gray-300 rounded w-full mb-2"
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
                  className="p-3 border border-gray-300 rounded w-full mb-2"
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
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
                <select
                  className="p-3 border border-gray-300 rounded w-full mb-2"
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
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="precio"
                  name="precio"
                  placeholder="Precio"
                  value={precio}
                  readOnly
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="montoAdicional"
                  name="montoAdicional"
                  placeholder="Monto Adicional"
                  value={montoAdicional}
                  onChange={handleMontoAdicionalChange}
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="montoTotal"
                  name="montoTotal"
                  placeholder="Monto Total"
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgendarCita;

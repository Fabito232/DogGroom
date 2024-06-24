import { useState, useEffect } from 'react';

import { obtenerClientes } from '../services/clienteService'; // Importamos el servicio para obtener clientes
import Header from "./Header";
import { crearCita } from '../services/citaServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { obtenerServicios } from '../services/paqueteServices';
import imgPerro from '../assets/img_perro.jpg';
import { URL_Hosting } from '../services/api';
//import ListaServicios from './ListaServicios';




function AgendarCita() {
  const [clientes, setClientes] = useState([]);
  const [citas, setCitas] = useState([]);
  const [servicios, setServicios] =useState([]);
  const navigate = useNavigate();
  const [tipoMascota, setTipoMascota]=useState('');

  const [cedulaCliente, setCedulaCliente] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');

  const [nombreMascota, setNombreMascota] = useState('');
  const [razaMascota, setRazaMascota] = useState('');
  const [tamanoMascota, setTamanoMascota] = useState('');
  const [fotoMascota, SetFotoMascota] = useState(null);
  const [fotoUrl, setFotoUrl] = useState('');

  const [fechaYHora, setFechaYHora] = useState('');
  const [fecha, setFecha] = useState(' ');
  const [hora, setHora] = useState('');
  const [estado, setEstado] = useState('');
  const [montoTotal, setMontoTotal] = useState('');
  const [montoAdicional, setMontoAdicional]=useState('');
  const [descripcion, setDescripcion] = useState('');
  const [id_cedula, setIDCedula] = useState('');
  const [id_servicio, setIDServicio] = useState('');
  const [precio, setPrecio] = useState(' ');
  const [mascotasCliente, setMascotasCliente] = useState([]);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);



  useEffect(() => {
    const cargarClientes = async () => {
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
        console.log(listaClientes)
        
      } catch (error) {
        console.log(error);
      }
    };
    cargarClientes();
  }, []);
 
  //Va a cargar el cliente con las mascotas
  const handleSelectCliente = (cliente) => {
    setCedulaCliente(cliente.cedula);
    setNombreCliente(cliente.nombre);
    setTelefonoCliente(cliente.telefono);
    setMascotasCliente(cliente.mascotas);
    
    if (cliente.mascotas.length > 0) {
      const primeraMascota = cliente.mascotas[0];
      setMascotaSeleccionada(primeraMascota);
      actualizarServicioParaMascota(primeraMascota);
    } else {
      setMascotaSeleccionada(null);
    }
  };
  

  const actualizarServicioParaMascota = (mascota) => {
    const servicio = servicios.find(serv => serv.ID_TipoMascota === mascota.ID_TipoMascota);
    if (servicio) {
      setIDServicio(servicio.ID_Servicio);
      setPrecio(servicio.Precio);
      setMontoTotal(parseFloat(servicio.Precio) + parseFloat(montoAdicional || 0));
    } else {
      setIDServicio('');
      setPrecio('');
      setMontoTotal(parseFloat(montoAdicional || 0));
    }
  };

  const handleAgendaCita = async (e) => {
    e.preventDefault();
    
    const fechaYHora =  `${fecha}T${hora}`;
    const cita = {
      fechaYHora: fechaYHora,
      estado: estado,
      montoTotal: montoTotal,
      descripcion: descripcion,
      cedula: cedulaCliente,
      montoAdicional: montoAdicional,
      ID_Servicio: id_servicio,
      ID_Mascota: mascotaSeleccionada.id
    };
    console.log("Hola",cita)
    try {
      console.log(cita);
      const resCita = await crearCita(cita);
      console.log(resCita);
      if (resCita.ok) {
        setNombreCliente(resCita.data.nombreCliente);
        setCedulaCliente(resCita.data.Cedula);
        toast.success("Se agendó la cita con éxito", {
          autoClose: 1500,
          theme: "colored",
        });
        console.log(resCita.data)
        navigate('/citas', { state: { nuevaCita: resCita.data } });
        
        navigate('/citas');
      } else {
        toast.error(resCita.message, { autoClose: 1500, theme: "colored" });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 1500, theme: "colored" });
    }
  };
  
  
  

  const handleMontoAdicionalChange = (e)=>{
    const nuevoMontoAdicional = e.target.value;
    setMontoAdicional(nuevoMontoAdicional);
    setMontoTotal(parseFloat(precio || 0) + parseFloat(nuevoMontoAdicional || 0));
  }

  const generateTimeOptions = () => {
    const times = [];
    for (let h = 8; h < 18; h++) {
      times.push(`${String(h).padStart(2, '0')}:00`);
      times.push(`${String(h).padStart(2, '0')}:30`);
    }
    return times;
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
                  onChange={(e) => setNombreCliente(e.target.value)}
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded mb-2"
                  type="text"
                  id="cedula"
                  name="cedula"
                  placeholder="Cédula"
                  value={cedulaCliente}
                  onChange={(e) => setCedulaCliente(e.target.value)}
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="telefono"
                  name="telefono"
                  placeholder="Teléfono"
                  value={telefonoCliente}
                  onChange={(e) => setTelefonoCliente(e.target.value)}
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
                      actualizarServicioParaMascota(mascota);
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
                  <input
                    className="p-3 border border-gray-300 rounded w-full mb-2"
                    type="text"
                    id="servicio"
                    name="servicio"
                    placeholder="Servicio"
                    value={servicios.find(serv => serv.ID_Servicio === id_servicio)?.Descripcion || ''}
                    readOnly
                  />
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
                  <option value="false">Finalizadar</option>
                  
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
                  value ={montoTotal}
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
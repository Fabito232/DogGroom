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
  const [servicios, setServicios] = useState([]);
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
          mascota: cliente.Mascota.length > 0 ? cliente.Mascota[0].Nombre : '',
          raza: cliente.Mascota.length > 0 ? cliente.Mascota[0].Raza : '',
          tamano: cliente.Mascota.length > 0 ? cliente.Mascota[0].TipoMascotum.Descripcion : '',
          image: cliente.Mascota.length > 0 ? cliente.Mascota[0].FotoURL : imgPerro,
          ID_TipoMascota: cliente.Mascota.length > 0 ? cliente.Mascota[0].ID_TipoMascota : '',
          

        }));
        setClientes(listaClientes);
        console.log(listaClientes)
        
      } catch (error) {
        console.log(error);
      }
    };
    cargarClientes();
  }, []);

  const handleSelectCliente = (cliente) => {
    setCedulaCliente(cliente.cedula);
    setNombreCliente(cliente.nombre);
    setTelefonoCliente(cliente.telefono);
    setNombreMascota(cliente.mascota);
    setRazaMascota(cliente.raza);
    setTamanoMascota(cliente.tamano);
    SetFotoMascota(cliente.image);
    setFotoUrl(cliente.image );

    const servicio = servicios.find(serv => serv.ID_TipoMascota === cliente.ID_TipoMascota);
      if (servicio) {
        setIDServicio(servicio.ID_Servicio);
        setPrecio(servicio.Precio);
        setMontoTotal(parseFloat(servicio.Precio)+parseFloat(montoAdicional||0))
      }


  };

  const handleAgendaCita = async (e) => {
    e.preventDefault();
    
    const fechaYHora = `${fecha}T${hora}`;
    const cita = {
      fechaYHora: fechaYHora,
      estado: estado,
      montoTotal: montoTotal,
      descripcion: descripcion,
      cedula: cedulaCliente,
      montoAdicional: montoAdicional,
      ID_Servicio: id_servicio
      

    };
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
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="nombreMascota"
                  name="nombreMascota"
                  placeholder="Nombre del Perro"
                  value={nombreMascota}
                  onChange={(e) => setNombreMascota(e.target.value)}
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="raza"
                  name="raza"
                  placeholder="Raza"
                  value={razaMascota}
                  onChange={(e) => setRazaMascota(e.target.value)}
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="tamano"
                  name="tamano"
                  placeholder="Tamaño"
                  value={tamanoMascota}
                  onChange={(e) => setTamanoMascota(e.target.value)}
                  required
                />
                
              </div>

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

              <div className="mb-8 md:mr-8 md:mb-0">

                {fotoUrl && (
                  <img
                    src={URL_Hosting + fotoUrl || imgPerro}
                    alt="Mascota"
                    className="w-48 h-48 object-cover rounded-md mt-4"
                  />
                )}
              </div>

              <button
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Agendar Cita
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgendarCita;
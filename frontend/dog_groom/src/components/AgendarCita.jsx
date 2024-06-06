import { useState, useEffect } from 'react';
import Header from "./Header";
import { obtenerClientes } from '../services/clienteService';

function AgendarCita() {
  // Pruebas local
  const [clientes, setClientes] = useState([]);

  // Datos cliente
  const [nombreCliente, setNombreCliente] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');

  // Datos Mascota
  const [nombreMascota, setNombreMascota] = useState('');
  const [raza, setRaza] = useState('');
  const [tamanno, setTamanno] = useState('');

  // Datos Precio, Hora, Descripcion y Estado
  const [precio, setPrecio] = useState('');
  const [hora, setHora] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');

  const cargarClientes = async () => {
    try {
      const resClientes = await obtenerClientes();
      console.log(resClientes)
      const listaClientes = resClientes.data.map(cliente => ({
        id: cliente.Cedula,
        cedula: cliente.Cedula,
        nombreCliente: cliente.Nombre,
        telefono: cliente.Telefono,
        mascota: cliente.Mascota.length > 0 ? cliente.Mascota[0].Nombre : '-',
        raza: cliente.Mascota.length > 0 ? cliente.Mascota[0].Raza : '-',
        image: cliente.Mascota.length > 0 ? cliente.Mascota[0].FotoURL : '-',
        idMascota: cliente.Mascota.length > 0 ? cliente.Mascota[0].ID_Mascota : '-',
        ID_TipoMascota: cliente.Mascota.length > 0 ? cliente.Mascota[0].ID_TipoMascota : '-'
      }))
      setClientes(listaClientes)
      console.log(listaClientes)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    cargarClientes()
  }, [])

  const handleAgregarCliente = (e) => {
    e.preventDefault();
    const nuevoCliente = { id: clientes.length + 1, nombreCliente, cedula, telefono };
    setClientes([...clientes, nuevoCliente]);
    setNombreCliente('');
    setCedula('');
    setTelefono('');
  };

  const handleSeleccionarCliente = (cliente) => {
    setNombreCliente(cliente.nombreCliente);
    setCedula(cliente.cedula);
    setTelefono(cliente.telefono);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-primary bg-opacity-80 bg-fondo1 bg-cover">
      <Header />
      <div className="flex flex-grow items-center justify-center">
        {/* Contenedor principal */}
        <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-3xl p-8 m-4">
          {/* Contenedor de lista de clientes */}
          <div className="w-full md:w-1/3 bg-amber-800 bg-opacity-90 rounded-3xl p-8 m-4 overflow-hidden">
            <div className="overflow-y-auto" style={{ maxHeight: '400px', scrollbarWidth: 'none' }}>
              <ul className="list-none p-0">
                {clientes.map((cliente) => (
                  <li
                    key={cliente.id}
                    className="bg-black my-2 p-2 rounded-md text-white cursor-pointer"
                    onClick={() => handleSeleccionarCliente(cliente)}
                  >
                    {cliente.nombreCliente} - {cliente.cedula}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contenedor de formulario de cliente */}
          <div className="w-full md:w-3/4 bg-sky-900 rounded-3xl p-8 m-4 flex items-center justify-center">
            <form onSubmit={handleAgregarCliente} className="space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  className="p-3 border border-gray-300 rounded mb-2"
                  type="text"
                  id="cedula"
                  placeholder="Cédula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="NombreCliente"
                  placeholder="Nombre del Cliente"
                  value={nombreCliente}
                  onChange={(e) => setNombreCliente(e.target.value)}
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="telefono"
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="NombrePerro"
                  placeholder="Nombre del Perro"
                  value={nombreMascota}
                  onChange={(e) => setNombreMascota(e.target.value)}
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="raza"
                  placeholder="Raza"
                  value={raza}
                  onChange={(e) => setRaza(e.target.value)}
                  required
                />
                <select
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  id="tamanno"
                  placeholder="Tamaño"
                  value={tamanno}
                  onChange={(e) => setTamanno(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Tamaño
                  </option>
                  <option value="pequeño">Pequeño</option>
                  <option value="mediano">Mediano</option>
                  <option value="grande">Grande</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <select
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  id="servicios"
                  name="servicios"
                >
                  <option value="" disabled>
                    Servicio
                  </option>
                  <option value="paquete1">Paquete 1</option>
                  <option value="paquete2">Paquete 2</option>
                  <option value="baño">Baño</option>
                </select>
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="precio"
                  placeholder="Precio"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
                <button
                  className="p-3 bg-green-600 rounded-md text-white hover:bg-green-700 focus:outline-none mb-2"
                  type="submit"
                >
                  +
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="hora"
                  placeholder="Hora"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="descripcion"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="estado"
                  placeholder="Estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-wrap mb-4">
                <button
                  className="p-3 bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none"
                  type="submit"
                >
                  Agendar Cita
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

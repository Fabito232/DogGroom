import { useState, useEffect } from 'react';
import { crearCita, obtenerCitas } from '../services/citaServices.js';
import Header from "./Header";

function AgendarCita() {
  const [clientes, setClientes] = useState([]);
  const [citas, setCitas] = useState([]);

  const [formData, setFormData] = useState({
    nombreCliente: '',
    cedula: '',
    telefono: '',
    nombreMascota: '',
    raza: '',
    tamanno: '',
    fechaYHora: 'YYYY-MM-DDTHH:MM',
    descripcion: '',
    estado: '',
    montoTotal: ''
  });

  useEffect(() => {
    const fetchCitas = async () => {
      const citas = await obtenerCitas();
      setCitas(citas);
    };
    fetchCitas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAgendarCita = async (e) => {
    e.preventDefault();

    const nuevaCita = { ...formData };

    // Verificar si la hora ya está ocupada
    const existeCita = Array.isArray(citas) && citas.some(cita => cita.fechaYHora === formData.fechaYHora);
    if (existeCita) {
      alert('Ya existe una cita agendada a esa hora.');
      return;
    }

    const response = await crearCita(nuevaCita);
    if (response.id) {
      setCitas([...citas, response]);
      alert('Cita agendada con éxito');
    } else {
      alert('Error al agendar la cita');
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
                  <li key={cliente.id} className="bg-black my-2 p-2 rounded-md text-white">
                    <span>
                      {cliente.nombreCliente} - {cliente.cedula}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full md:w-3/4 bg-sky-900 rounded-3xl p-8 m-4 flex items-center justify-center">
            <form onSubmit={handleAgendarCita} className="space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="nombreCliente"
                  name="nombreCliente"
                  placeholder="Nombre del Cliente"
                  value={formData.nombreCliente}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded mb-2"
                  type="text"
                  id="cedula"
                  name="cedula"
                  placeholder="Cédula"
                  value={formData.cedula}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="telefono"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
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
                  value={formData.nombreMascota}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="raza"
                  name="raza"
                  placeholder="Raza"
                  value={formData.raza}
                  onChange={handleChange}
                  required
                />
                <select
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  id="tamanno"
                  name="tamanno"
                  value={formData.tamanno}
                  onChange={handleChange}
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
                  value={formData.servicios}
                  onChange={handleChange}
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
                  id="montoTotal"
                  name="montoTotal"
                  placeholder="Precio"
                  value={formData.montoTotal}
                  onChange={handleChange}
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
                  type="datetime-local"
                  id="fechaYHora"
                  name="fechaYHora"
                  value="2024-06-04T15:30"
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Descripción"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 border border-gray-300 rounded w-full mb-2"
                  type="text"
                  id="estado"
                  name="estado"
                  placeholder="Estado"
                  value={formData.estado}
                  onChange={handleChange}
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
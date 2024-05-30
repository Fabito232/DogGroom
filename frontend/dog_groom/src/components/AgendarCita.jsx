import React, { useState, useEffect } from 'react';
import '../styles/AgendarCita.css';

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

  // Datos Hora, Descripcion y Estado
  const [hora, setHora] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');


  useEffect(() => {
    // Aquí puedes cargar los datos desde una API o archivo local
    // Ejemplo con datos simulados
    const cargarClientes = async () => {
      // Simulando una llamada a una API con datos estáticos
      const datosSimulados = [
        { id: 1, nombreCliente: 'Juan Perez', cedula: '208270199' },
        { id: 2, nombreCliente: 'Fabiola Muñoz', cedula: '209010829' },
        { id: 3, nombreCliente: 'Marta Bolaños', cedula: '202810289' },
        { id: 4, nombreCliente: 'José Fernandez', cedula: '201920890' },
        { id: 5, nombreCliente: 'Junito Hernández', cedula: '208290882' },
        { id: 6, nombreCliente: 'Edgar Alvarado', cedula: '208290882' },
        { id: 7, nombreCliente: 'Allison Sumba', cedula: '208290882' },
        { id: 8, nombreCliente: 'Fabian Bolaños', cedula: '208290882' },
        { id: 9, nombreCliente: 'Javier Barrantes', cedula: '208290882' },
        { id: 10, nombreCliente: 'Allan Castro', cedula: '208290882' },
        { id: 11, nombreCliente: 'Antony Barrantes', cedula: '208290882' },
        { id: 12, nombreCliente: 'Iaac Villalobos', cedula: '208290882' },
        { id: 13, nombreCliente: 'Jesus Rodriguez', cedula: '208290882' },
        { id: 14, nombreCliente: 'Victoria Campos', cedula: '208290882' },
        { id: 15, nombreCliente: 'David Ramirez', cedula: '208290882' },
        { id: 16, nombreCliente: 'Larissa Camacho', cedula: '208290882' },
      ];

      // Simulando retraso de red
      await new Promise(res => setTimeout(res, 1000));

      setClientes(datosSimulados);
    };

    cargarClientes();
  }, []);

  const handleAgregarCliente = (e) => {
    e.preventDefault();
    const nuevoCliente = { id: clientes.length + 1, nombreCliente, cedula };
    setClientes([...clientes, nuevoCliente]);
    setNombreCliente('');
    setCedula('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary bg-opacity-80">
      {/* Contenedor de lista de clientes */}
      <div className="w-1/3 bg-amber-800 bg-opacity-90 rounded-3xl p-8 m-4 overflow-auto">
        <ul className="list-none p-0">
          {clientes.map((cliente) => (
            <li key={cliente.id} className="bg-black my-2 p-2 rounded-md text-white">
              <span>
                {cliente.id} - {cliente.nombreCliente} - {cliente.cedula}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contenedor de formulario de cliente */}
      <div className="bg-sky-900 rounded-3xl p-8 m-4 flex items-center justify-center">
        <form onSubmit={handleAgregarCliente} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
              id="telefono"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>

          <div className="fila-formulario">
            <div className="grupo-componentes">
              <input
                type="text"
                id="NombrePerro"
                placeholder="Nombre del Perro"
                value={nombreMascota}
                onChange={(e) => setNombreMascota(e.target.value)}
                required
              />
            </div>
            <div className="grupo-componentes">
              <input
                type="text"
                id="raza"
                placeholder="Raza"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                required
              />
            </div>
            <div className="grupo-componentes">
              {/* Hay que hacerlo select */}
              <input
                type="text"
                id="tamanno"
                placeholder="Tamaño"
                value={tamanno}
                onChange={(e) => setTamanno(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="fila-formulario">
            <div className="grupo-componentes">
              <select id="servicios" name="servicios">
                <option value="" selected>Opciones...</option>
                <option value="paquete1">Paquete 1</option>
                <option value="paquete2">Paquete 2</option>
                <option value="baño">Baño</option>
              </select>
            </div>
            <div className="grupo-componentes">
              <input
                type="text"
                id="precio"
                placeholder="Precio"
                value={tamanno}
                onChange={(e) => setTamanno(e.target.value)}
                required
              />
            </div>
            <div className="grupo-componentes">
              <button type="submit">+</button>
            </div>
          </div>

          <div className="fila-formulario">
            <table className="cliente-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Raza</th>
                  <th>Servicio</th>
                  <th>Tamaño</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {/* Aquí van las filas de la tabla dinámicamente */}
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tbody>
            </table>
          </div>

          <div className="fila-formulario">
            <div className="grupo-componentes">
              <input
                type="text"
                id="hora"
                placeholder="Hora"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
              />
            </div>
            <div className="grupo-componentes">
              <input
                type="text"
                id="descripcion"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>
            <div className="grupo-componentes">
              <input
                type="text"
                id="estado"
                placeholder="Estaddo"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="fila-formulario">
            <button type="submit">Agendar Cita</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgendarCita;
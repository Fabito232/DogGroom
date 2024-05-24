import React, { useState, useEffect } from 'react';
import '../styles/ClienteList.css';

const ClienteList = () => {
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
    <section className="principal-div">
      <div className="cliente-list-container">
        <div className='list-container'>
          <ul className="cliente-list">
            {clientes.map(cliente => (
              <li key={cliente.id} className="cliente-item">
                <span className="cliente-nombre">{cliente.id} - {cliente.nombreCliente} - {cliente.cedula}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="cliente-form-container">
        <form onSubmit={handleAgregarCliente}>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                id="NombreCliente"
                placeholder="Nombre del Cliente"
                value={nombreCliente}
                onChange={(e) => setNombreCliente(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="cedula"
                placeholder="Cédula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="telefono"
                placeholder="Telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                id="NombrePerro"
                placeholder="Nombre del Perro"
                value={nombreMascota}
                onChange={(e) => setNombreMascota(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="raza"
                placeholder="Raza"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
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

          <div className="form-row">
            <div className="form-group">
              <select id="servicios" name="servicios">
                <option value="" selected>Opciones...</option>
                <option value="paquete1">Paquete 1</option>
                <option value="paquete2">Paquete 2</option>
                <option value="baño">Baño</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="precio"
                placeholder="Precio"
                value={tamanno}
                onChange={(e) => setTamanno(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">+</button>
            </div>
          </div>

          <div className="form-row">
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

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                id="hora"
                placeholder="Hora"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="descripcion"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
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
          <div className="form-row">
            <button type="submit">Agendar Cita</button>
          </div>
        </form>


      </div>
    </section>


  );
};

export default ClienteList;

import { useState, useEffect } from 'react';
import AgregarGasto from './AgregarGasto';
import { obtenerGastos, crearGasto, actualizarGasto, borrarGasto } from '../services/finanzasServices';
import PropTypes from 'prop-types'
import { useConfirm } from './ModalConfirmacion';
import { notificarError, notificarExito } from '../utilis/notificaciones';
import { FontAwesomeIcon, faTrashCan, faPenToSquare} from '../utilis/iconos.js'
const ListaGastos = ({actualizarFinanzasAnuales}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [buscarPalabra, setBuscarPalabra] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);
  const [modo, setModo] = useState('agregar');
  const [gastoActual, setGastoActual] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [gastosPorPagina] = useState(5); // Cantidad de gastos por página

  const openConfirmModal = useConfirm();

  useEffect(() => {
    setGastosFiltrados(
      gastos.filter((gasto) =>
        gasto.descripcion.toLowerCase().includes(buscarPalabra.toLowerCase())
      )
    );
  }, [gastos, buscarPalabra]);

  useEffect(() => {
    cargarGastos();
  }, []);

  const cargarGastos = async () => {
    try {
      const resGasto = await obtenerGastos();

      if (resGasto.ok) {
        const listaGastos = resGasto.data.map(gasto => ({
          id: gasto.ID_Gasto,
          descripcion: gasto.Descripcion,
          monto: gasto.Monto,
          fecha: gasto.Fecha
        }));

        setGastos(listaGastos);
      } else {
        console.log(resGasto);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const abrirModal = (modo, gasto = null) => {
    setModo(modo);
    setGastoActual(gasto);
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
  };

  const agregarGasto = async (gasto) => {
    try {
      const resGasto = await crearGasto(gasto);
      if (resGasto.ok) {
        const nuevoGasto = {
          id: resGasto.data.ID_Gasto,
          ...gasto,
        };
        setGastos([...gastos, nuevoGasto]);
        setModalIsOpen(false);
        notificarExito(resGasto.message)
      } else {
        notificarError(resGasto)
      }
    } catch (error) {
      notificarError(error)
    }
    actualizarFinanzasAnuales();
  };

  const editarGasto = async (gastoEditado) => {
    try {
      console.log(gastoEditado);
      const resGasto = await actualizarGasto(gastoEditado, gastoEditado.id);
      if (resGasto.ok) {
        const updatedGastos = gastos.map((gasto) =>
          gasto.id === gastoEditado.id ? gastoEditado : gasto
        );
        setGastos(updatedGastos);
        setModalIsOpen(false);
        notificarExito(resGasto.message)
      }
    } catch (error) {
      console.log(error);
    }
    actualizarFinanzasAnuales();
  };

  const eliminarGasto = async (id) => {

    openConfirmModal('¿Estás seguro de que deseas eliminar este elemento?', async () => {
      try {
        const resGasto = await borrarGasto(id);
        if (resGasto.ok) {
          const updatedGastos = gastos.filter((gasto) => gasto.id !== id);
          setGastos(updatedGastos);
          notificarExito("Se borro existosamente el gasto")
        }
      } catch (error) {
        console.log(error);
      }
      actualizarFinanzasAnuales();
      console.log('Elemento eliminado');
    });

  };

  // Paginación
  const indiceUltimoGasto = paginaActual * gastosPorPagina;
  const indicePrimerGasto = indiceUltimoGasto - gastosPorPagina;
  const gastosActuales = gastosFiltrados.slice(indicePrimerGasto, indiceUltimoGasto);

  const numerosDePagina = [];
  for (let i = 1; i <= Math.ceil(gastosFiltrados.length / gastosPorPagina); i++) {
    numerosDePagina.push(i);
  }

  const paginar = (numeroDePagina) => setPaginaActual(numeroDePagina);
  const manejarAnterior = () => setPaginaActual((prev) => Math.max(prev - 1, 1));
  const manejarSiguiente = () => setPaginaActual((prev) => Math.min(prev + 1, numerosDePagina.length));

  const obtenerPaginasVisibles = () => {
    if (numerosDePagina.length <= 3) {
      return numerosDePagina;
    } else if (paginaActual <= 2) {
      return [1, 2, 3];
    } else if (paginaActual >= numerosDePagina.length - 1) {
      return [numerosDePagina.length - 2, numerosDePagina.length - 1, numerosDePagina.length];
    } else {
      return [paginaActual - 1, paginaActual, paginaActual + 1];
    }
  };

  const paginasVisibles = obtenerPaginasVisibles();

  return (
    <div className="p-6 bg-amber-800 bg-opacity-90 container rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Control de Gastos La Bandada {new Date().getFullYear()}</h1>
      <div className='flex justify-between mb-4'>
        <div>
          <input
            type="text"
            placeholder="Buscar gasto..."
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={buscarPalabra}
            onChange={(e) => setBuscarPalabra(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={() => abrirModal('agregar')}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Agregar Gasto
          </button>
          <AgregarGasto
            isOpen={modalIsOpen}
            cerrar={cerrarModal}
            agregarGasto={agregarGasto}
            editarGasto={editarGasto}
            gasto={gastoActual}
            modo={modo}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-lime-700 border-b border-gray-300 text-lg">
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Monto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {gastosActuales.map((gasto) => (
              <tr key={gasto.id} className="border-b border-gray-300">
                <td className="px-6 py-4 whitespace-nowrap">{gasto.descripcion}</td>
                <td className="px-6 py-4 whitespace-nowrap">${gasto.monto}</td>
                <td className="px-6 py-4 whitespace-nowrap">{gasto.fecha}</td>
                <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center space-x-2">
                  <button
                    className="px-4 py-1 bg-blue-600 text-white rounded-md mr-2 hover:bg-blue-700 focus:outline-none"
                    onClick={() => abrirModal('editar', gasto)}
                  >
                   <FontAwesomeIcon icon={faPenToSquare}/>
                  </button>
                  <button
                    className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                    onClick={() => eliminarGasto(gasto.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex items-center">
            <li>
              <button
                onClick={manejarAnterior}
                className={`px-3 py-1 bg-white text-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none ${paginaActual === 1 ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                disabled={paginaActual === 1}
              >
                &laquo;
              </button>
            </li>
            {paginasVisibles.map((numero) => (
              <li key={numero} className="cursor-pointer mx-1">
                <button
                  onClick={() => paginar(numero)}
                  className={`px-3 py-1 ${paginaActual === numero
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600'
                    } rounded-md hover:bg-blue-600 hover:text-white focus:outline-none`}
                >
                  {numero}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={manejarSiguiente}
                className={`px-3 py-1 bg-white text-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none ${paginaActual === numerosDePagina.length ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                disabled={paginaActual === numerosDePagina.length}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

ListaGastos.propTypes = {
  actualizarFinanzasAnuales: PropTypes.func
}

export default ListaGastos;

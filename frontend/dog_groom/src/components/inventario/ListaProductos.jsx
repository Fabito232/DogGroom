import { useState, useEffect } from 'react';
import AgregarProducto from './AgregarProducto.jsx';
import { actualizarProducto, borrarProducto, crearProducto, obtenerProductos } from '../../services/productoService.js';
import { notificarError, notificarExito } from '../../utilis/notificaciones.js';
import Header from '../Header.jsx';
import { FontAwesomeIcon, faTrashCan, faPenToSquare } from '../../utilis/iconos.js'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ListaProductos = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [buscarPalabra, setBuscarPalabra] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [modo, setModo] = useState('agregar');
  const [productoActual, setProductoActual] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [productosPorPagina] = useState(5); // Cantidad de productos por página
  const [orden, setOrden] = useState({ campo: 'nombre', direccion: 'asc', label: 'Nombre (A-Z)' });


  useEffect(() => {
    setProductosFiltrados(
      productos
        .filter((producto) =>
          producto.nombre.toLowerCase().includes(buscarPalabra.toLowerCase())
        )
        .sort((a, b) => {
          if (orden.campo === 'cantidad') {
            return orden.direccion === 'asc' ? a.cantidad - b.cantidad : b.cantidad - a.cantidad;
          } else {
            return orden.direccion === 'asc' ? a[orden.campo].localeCompare(b[orden.campo]) : b[orden.campo].localeCompare(a[orden.campo]);
          }
        })
    );
  }, [productos, buscarPalabra, orden]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const resProducto = await obtenerProductos();
      if (resProducto.ok) {
        const listaProducto = resProducto.data.map(producto => ({
          id: producto.ID_Producto,
          nombre: producto.Nombre,
          marca: producto.Marca,
          descripcion: producto.Descripcion,
          cantidad: producto.Cantidad
        }));
        setProductos(listaProducto);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const abrirModal = (modo, producto = null) => {
    setModo(modo);
    setProductoActual(producto);
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
  };

  const agregarProducto = async (producto) => {
    try {
      const resProducto = await crearProducto(producto);
      if (resProducto.ok) {
        const nuevoProducto = {
          id: resProducto.data.ID_Producto,
          ...producto,
        };
        setProductos([...productos, nuevoProducto]);
        setModalIsOpen(false);
        notificarExito("Se guardó con éxito el producto")
      } else {
        notificarError(resProducto)
      }
    } catch (error) {
      notificarError(error)
    }
  };

  const editarProducto = async (productoEditado) => {
    try {
      const { id, ...producto } = productoEditado;
      console.log(producto);
      const resProducto = await actualizarProducto(producto, productoEditado.id);
      if (resProducto.ok) {
        const updatedProductos = productos.map((producto) =>
          producto.id === productoEditado.id ? productoEditado : producto
        );
        setProductos(updatedProductos);
        setModalIsOpen(false);
        notificarExito("Se guardó con éxito el producto")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarProducto = async (id) => {
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
            await borrarProducto(id);
            toast.success('Se eliminó el producto', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const updatedProductos = productos.filter((producto) => producto.id !== id);
            setProductos(updatedProductos);
        } catch (error) {
            toast.error(`Error al eliminar el producto: ${error.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.error('Error al eliminar el producto:', error);
        }
    }
};

  const manejarOrden = (evento) => {
    const valor = evento.target.value;
    let nuevoOrden;
    switch (valor) {
      case 'nombre_asc':
        nuevoOrden = { campo: 'nombre', direccion: 'asc', label: 'Nombre (A-Z)' };
        break;
      case 'nombre_desc':
        nuevoOrden = { campo: 'nombre', direccion: 'desc', label: 'Nombre (Z-A)' };
        break;
      case 'cantidad_asc':
        nuevoOrden = { campo: 'cantidad', direccion: 'asc', label: 'Menor Cantidad' };
        break;
      case 'cantidad_desc':
        nuevoOrden = { campo: 'cantidad', direccion: 'desc', label: 'Mayor Cantidad' };
        break;
      default:
        nuevoOrden = { campo: 'nombre', direccion: 'asc', label: 'Nombre (A-Z)' };
    }
    setOrden(nuevoOrden);
  };

  const reducirCantidad = async (id) => {
    const producto = productos.find(p => p.id === id);
    if (producto && producto.cantidad > 0) {
      const productoEditado = { ...producto, cantidad: producto.cantidad - 1 };
      await editarProducto(productoEditado);
    }
  };

  // Paginación
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

  const numerosDePagina = [];
  for (let i = 1; i <= Math.ceil(productosFiltrados.length / productosPorPagina); i++) {
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
    <>
      <Header />
      <div className="bg-slate-400 bg-cover min-h-screen">
        <div className='md:container md:mx-auto p-5'>
          <div className="p-6 bg-amber-700 container bg-opacity-95 rounded-lg">
            <h1 className="text-3xl font-bold mb-4 text-center">Lista de Productos</h1>
            <div className='flex flex-col md:flex-row justify-between mb-4 items-center'>
              <div className="flex items-center mb-2 md:mb-0">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={buscarPalabra}
                  onChange={(e) => setBuscarPalabra(e.target.value)}
                />
              </div>
              <div className="flex items-center mb-2 md:mb-0 ml-0 md:ml-4">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  onChange={manejarOrden}
                  value={orden.campo + '_' + orden.direccion}
                >
                  <option value="nombre_asc">Nombre (A-Z)</option>
                  <option value="nombre_desc">Nombre (Z-A)</option>
                  <option value="cantidad_asc">Menor Cantidad</option>
                  <option value="cantidad_desc">Mayor Cantidad</option>
                </select>
              </div>
              <div className="ml-0 md:ml-auto">
                <button
                  onClick={() => abrirModal('agregar')}
                  className="mb-2 md:mb-0 px-4 py-2 font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"> Agregar Producto
                </button>
                <AgregarProducto
                  isOpen={modalIsOpen}
                  cerrar={cerrarModal}
                  agregarProducto={agregarProducto}
                  editarProducto={editarProducto}
                  producto={productoActual}
                  modo={modo}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-lime-600 border-b text-lg">
                    <th className="px-6 py-3 text-center text-base font-medium text-black uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-center text-base font-medium text-black uppercase tracking-wider">Marca</th>
                    <th className="px-6 py-3 text-center text-base font-medium text-black uppercase tracking-wider">Cantidad</th>
                    <th className="px-6 py-3 text-center text-base font-medium text-black uppercase tracking-wider">Descripción</th>
                    <th className="px-6 py-3 text-center text-base font-medium text-black uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody>                 
                  {productosActuales.map((producto, index) => (
                    <tr key={producto.id} className={`border-b border-gray-300 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                      <td className="px-6 py-4 text-center whitespace-nowrap items-start">
                        <button
                          className="px-3 py-1 bg-red-600 text-left text-white rounded-md mr-2 hover:bg-red-700 focus:outline-none"
                          onClick={() => reducirCantidad(producto.id)}>
                          -
                        </button>
                        {producto.nombre}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">{producto.marca}</td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">{producto.cantidad}</td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">{producto.descripcion}</td>
                      <td className="px-6 py-4 text-center whitespace-nowrap flex justify-center items-center space-x-2">
                        <button
                          className="px-3 py-1 bg-blue-600 w-24 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                          onClick={() => abrirModal('editar', producto)}>
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 w-24 text-white rounded-md hover:bg-red-700 focus:outline-none"
                          onClick={() => eliminarProducto(producto.id)}>
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {productosActuales.length === 0 ? (
            <h1 className="text-3xl font-bold m-5 text-center">Aún no se han agregado productos</h1>
          ) : (
            <div className="flex justify-center mt-4">
              <nav>
                <ul className="flex items-center">
                  <li className="mr-6">
                    <button
                      onClick={manejarAnterior}
                      className={`px-8 py-2 text-xl bg-white text-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none ${paginaActual === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                      disabled={paginaActual === 1}
                    >
                      &laquo;
                    </button>
                  </li>
                  {paginasVisibles.map((numero) => (
                    <li key={numero} className="cursor-pointer mx-1">
                      <button
                        onClick={() => paginar(numero)}
                        className={`px-4 py-2 text-xl ${paginaActual === numero ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-md hover:bg-blue-600 hover:text-white focus:outline-none`}
                      >
                        {numero}
                      </button>
                    </li>
                  ))}
                  <li className="ml-6">
                    <button
                      onClick={manejarSiguiente}
                      className={`px-8 py-2 text-xl bg-white text-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none ${paginaActual === numerosDePagina.length ? 'cursor-not-allowed opacity-50' : ''}`}
                      disabled={paginaActual === numerosDePagina.length}
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListaProductos;
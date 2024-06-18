import { useState, useEffect } from 'react';
import AgregarProducto from './AgregarProducto.jsx';
import { actualizarProducto, borrarProducto, crearProducto, obtenerProductos } from '../services/productoService.js';
import { useConfirm } from './ModalConfirmacion';
import { notificarError, notificarExito } from '../utilis/notificaciones';
import Header from './Header.jsx';

const ListaProductos = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [buscarPalabra, setBuscarPalabra] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [modo, setModo] = useState('agregar');
  const [productoActual, setProductoActual] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [productosPorPagina] = useState(5); // Cantidad de productos por página

  const openConfirmModal = useConfirm();

  useEffect(() => {
    setProductosFiltrados(
      productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(buscarPalabra.toLowerCase())
      )
    );
  }, [productos, buscarPalabra]);

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

    openConfirmModal('¿Estás seguro de que deseas eliminar este elemento?', async () => {
      try {
        const resProducto = await borrarProducto(id);
        if (resProducto.ok) {
          const updatedProductos = productos.filter((producto) => producto.id !== id);
          setProductos(updatedProductos);
          notificarExito("Se borro existosamente el producto")
        }
      } catch (error) {
        console.log(error);
      }
    });

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
      <Header></Header>
      <div className='md:container md:mx-auto p-5'>
        <div className="p-6 bg-gray-100 container">
          <h1 className="text-3xl font-bold mb-4">Lista de Productos</h1>
          <div className='flex justify-between mb-4'>
            <div>
              <input
                type="text"
                placeholder="Buscar producto..."
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
                Agregar Producto
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
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosActuales.map((producto) => (
                  <tr key={producto.id} className="border-b border-gray-300">
                    <td className="px-6 py-4 whitespace-nowrap">{producto.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{producto.marca}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{producto.cantidad}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{producto.descripcion}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded-md mr-2 hover:bg-red-700 focus:outline-none"
                        onClick={() => eliminarProducto(producto.id)}
                      >
                        Eliminar
                      </button>
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        onClick={() => abrirModal('editar', producto)}
                      >
                        Editar
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
                    className={`px-3 py-1 bg-white text-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none ${
                      paginaActual === 1 ? 'cursor-not-allowed opacity-50' : ''
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
                      className={`px-3 py-1 ${
                        paginaActual === numero
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
                    className={`px-3 py-1 bg-white text-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none ${
                      paginaActual === numerosDePagina.length ? 'cursor-not-allowed opacity-50' : ''
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
      </div>
    </>
  );
};

export default ListaProductos;
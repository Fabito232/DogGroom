import { useState, useEffect } from 'react';
import imgCliente from '../../assets/img_user.png';
import Header from "../Header";
import { obtenerClientes, actualizarCliente, borrarCliente } from '../../services/clienteService';
import { crearMascota, actualizarMascota, borrarMascota } from '../../services/mascotaService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import AgregarCliente from './AgregarCliente';
import MostrarMascotas from './MostrarMascotas';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { notificarError, notificarExito } from '../../utilis/notificaciones';
import { validarCedula, validarTelefono, validarString } from '../../utilis/validaciones';

const ListaClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [clientesPorPagina] = useState(8);
    const [clienteEditando, setClienteEditando] = useState(null);
    const [isGuardarDisabled, setIsGuardarDisabled] = useState(true);
    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpenMascotas, setModalIsOpenMascotas] = useState(false);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [mascotasSelecionadas, setMascotasSelecionadas] = useState([]);

    const abrirModal = () => {
        setModalIsOpen(true);
    };

    const cerrarModal = () => {
        setModalIsOpen(false);
    };

    const abrirModalMascotas = (cliente) => {
        setClienteSeleccionado({ cedula: cliente.cedula, nombre: cliente.nombre });
        setMascotasSelecionadas(cliente.mascotas)
        setModalIsOpenMascotas(true);
    };

    const cerrarModalMascotas = () => {
        setModalIsOpenMascotas(false);
        setClienteSeleccionado(null);
    };

    const cargarClientes = async () => {
        try {
            const resClientes = await obtenerClientes();
            const listaClientes = resClientes.data.map(cliente => ({
                id: cliente.Cedula,
                cedula: cliente.Cedula,
                nombre: cliente.Nombre,
                telefono: cliente.Telefono,
                mascotas: cliente.Mascota,
            }));
            listaClientes.reverse()
            setClientes(listaClientes);
        } catch (error) {
            notificarError("Error al cargar los clientes")
        }
    };

    useEffect(() => {
        cargarClientes();
    }, [modalIsOpen,isGuardarDisabled]);

    const editarMascota = async (mascota, ID_Mascota) => {
        const formData = new FormData();
        formData.append('nombre', mascota.Nombre);
        formData.append('raza', mascota.Raza);
        formData.append('cedula', mascota.ID_Cliente);
        formData.append('ID_TipoMascota', mascota.ID_TipoMascota);
        formData.append('image', mascota.Foto);

        try {
            const resMascota = await actualizarMascota(formData, ID_Mascota);
            if (resMascota) {
                const mascotaEditada = resMascota.data;
                mascotaEditada.TipoMascotum = mascota.TipoMascotum;

                const nuevaListaM = clientes.map(cliente => {
                    if (cliente.cedula === mascotaEditada.ID_Cliente) {
                        const nuevasMascotas = cliente.mascotas.map(mascota =>
                            mascota.ID_Mascota === ID_Mascota ? mascotaEditada : mascota
                        );
                        setMascotasSelecionadas(nuevasMascotas)
                        return { ...cliente, mascotas: nuevasMascotas };
                    }
                    return cliente;
                });
                setClientes(nuevaListaM);
                notificarExito("Se editó correctamente la mascota")
            }
        } catch (error) {
            notificarError("Error al editar la mascota")
        }
    };

    const agregarMascota = async (mascota) => {
        const formData = new FormData();
        formData.append('nombre', mascota.Nombre);
        formData.append('raza', mascota.Raza);
        formData.append('cedula', mascota.ID_Cliente);
        formData.append('ID_TipoMascota', mascota.ID_TipoMascota);
        formData.append('image', mascota.Foto);

        try {
            const resMascota = await crearMascota(formData);

            if (resMascota) {
                const nuevaMascota = resMascota.data;
                nuevaMascota.TipoMascotum = mascota.TipoMascotum
                const nuevaListaM = clientes.map(cliente => {
                    if (cliente.cedula === nuevaMascota.ID_Cliente) {
                        const nuevasMascotas = [...cliente.mascotas, nuevaMascota];
                        setMascotasSelecionadas(nuevasMascotas)
                        return { ...cliente, mascotas: nuevasMascotas };
                    }
                    return cliente;
                });
                setClientes(nuevaListaM)
                notificarExito("Se agregó correctamente la mascota")
            }
        } catch (error) {
            notificarError("Error al crear la mascota")
        }
    }

    const eliminarMascota = async (ID_Mascota) => {
        try {
            const resMascota = await borrarMascota(ID_Mascota);
            if(resMascota.ok){
                const nuevasMascotas = mascotasSelecionadas.filter(mascota => mascota.ID_Mascota !== ID_Mascota)
                const nuevaListaM = clientes.map(cliente => {
                    if (cliente.cedula === clienteSeleccionado.cedula) {
                        return { ...cliente, mascotas: nuevasMascotas };
                    }
                    return cliente;
                });
                setMascotasSelecionadas(nuevasMascotas);
                setClientes(nuevaListaM);
            } 
        } catch (error) {
            notificarError("Error al eliminar el cliente")
        }
    }
    const validarDatos = (cliente) =>{
        if(!validarCedula(cliente.cedula)){
            notificarError("La cedula es invalida")
            return false;
        }
        if(!validarTelefono(cliente.telefono)){
            notificarError("Numero de telefono invalido")
            return false;
        }

        if(!validarString(cliente.nombre)){
            notificarError("El nombre del cliente debe tener minimo 3 caracteres")
            return false;
        }
        
        return true
    }


    const manejarEditar = async (cliente) => {
        setClienteEditando(cliente);
    };

    const manejarGuardar = async () => {
        const cliente = {
            cedula: clienteEditando.cedula,
            nombre: clienteEditando.nombre,
            telefono: clienteEditando.telefono
        };
        if(validarDatos(cliente)){
            
            try {
                const resCliente = await actualizarCliente(cliente, clienteEditando.id);
                if (resCliente.ok) {
                    notificarExito("Cliente actualizadó correctamente")
                }
        
                if (isGuardarDisabled) return;
                setClientes(clientes.map(c => c.id === clienteEditando.id ? clienteEditando : c));
                setClienteEditando(null);
                
            } catch (error) {
                notificarError("Error al actualizar el cliente")
            }
        }
    };

    const manejarCancelar = () => {
        setClienteEditando(null);
    };

    const manejarCambioEntradaEdicion = (e) => {
        const { name, value } = e.target;
        setClienteEditando({ ...clienteEditando, [name]: value });
    };

    const manejarEliminar = async (cedula) => {
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
                await borrarCliente(cedula);
                toast.success('Se eliminó el cliente', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setClientes(clientes.filter(cliente => cliente.id !== cedula));
            } catch (error) {
                toast.error(`Error al eliminar el cliente: ${ error.message }`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.error('Error al eliminar el cliente:', error);
            }
        }
    };

    useEffect(() => {
        if (clienteEditando) {
            const { cedula, nombre, telefono } = clienteEditando;
            setIsGuardarDisabled(!cedula || !nombre || !telefono);
        } else {
            setIsGuardarDisabled(true);
        }
    }, [clienteEditando]);

    const manejarCambioBusqueda = (e) => {
        setTerminoBusqueda(e.target.value);
    };

    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        cliente.cedula.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );

    const indiceUltimoCliente = paginaActual * clientesPorPagina;
    const indicePrimerCliente = indiceUltimoCliente - clientesPorPagina;
    const clientesActuales = clientesFiltrados.slice(indicePrimerCliente, indiceUltimoCliente);

    const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);

    return (
        <div className="relative min-h-screen flex flex-col bg-slate-400 bg-cover ">
            <Header />
            <div className="md:container md:mx-auto p-5">
                <div className="shadow-lg w-full md:w-200 md:h-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                            <h1 className="bg-white rounded-lg text-3xl md:text-3xl text-black font-bold flex-1 text-center mb-4 md:mb-0 p-2 shadow-xl">Lista de Clientes</h1>
                            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 md:py-4 px-6 md:px-12 rounded-lg ml-8" onClick={abrirModal}>Agregar</button>
                            <AgregarCliente
                                isOpen={modalIsOpen}
                                cerrar={cerrarModal}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por Nombre de Cliente o Cédula"
                            value={terminoBusqueda}
                            onChange={manejarCambioBusqueda}
                            className="mb-4 p-2 border border-gray-300 rounded-xl w-full"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                            {clientesActuales.map(cliente => (
                                <div key={cliente.id} className="flex flex-col bg-amber-700 bg-opacity-90 border border-black w-full">
                                    <div className="relative p-4 w-full flex justify-center">
                                        <img
                                            src={imgCliente}
                                            alt={cliente.nombre}
                                            className="h-32 w-32 md:h-48 md:w-48 object-cover rounded-lg cursor-pointer"
                                            onClick={() => abrirModalMascotas(cliente)} // Abrir modal al hacer clic en la imagen
                                        />
                                        <MostrarMascotas
                                            isOpen={modalIsOpenMascotas}
                                            mascotas={mascotasSelecionadas}
                                            cargarClientes={cargarClientes}
                                            nombreCliente={clienteSeleccionado ? clienteSeleccionado.nombre : ''}
                                            cedula={clienteSeleccionado ? clienteSeleccionado.cedula : ''}
                                            agregarMascota={agregarMascota}
                                            actualizarMascota={editarMascota}
                                            eliminarCliente={eliminarMascota}
                                            setMascotasSelecionadas={setMascotasSelecionadas}
                                            cerrar={cerrarModalMascotas}
                                        />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between p-4">
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <div className="font-bold mr-2">Cédula:</div>
                                                {clienteEditando && clienteEditando.id === cliente.id ? (
                                                    <input
                                                        type="text"
                                                        name="cedula"
                                                        value={clienteEditando.cedula}
                                                        onChange={manejarCambioEntradaEdicion}
                                                        className="block w-full p-1 border border-gray-300 rounded"
                                                    />
                                                ) : (
                                                    <div className="bg-white p-1 rounded flex-grow">{cliente.cedula}</div>
                                                )}
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <div className="font-bold mr-2">Nombre:</div>
                                                {clienteEditando && clienteEditando.id === cliente.id ? (
                                                    <input
                                                        type="text"
                                                        name="nombre"
                                                        value={clienteEditando.nombre}
                                                        onChange={manejarCambioEntradaEdicion}
                                                        className="block w-full p-1 border border-gray-300 rounded"
                                                    />
                                                ) : (
                                                    <div className="bg-white p-1 rounded flex-grow">{cliente.nombre}</div>
                                                )}
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <div className="font-bold mr-2">Teléfono:</div>
                                                {clienteEditando && clienteEditando.id === cliente.id ? (
                                                    <input
                                                        type="text"
                                                        name="telefono"
                                                        value={clienteEditando.telefono}
                                                        onChange={manejarCambioEntradaEdicion}
                                                        className="block w-full p-1 border border-gray-300 rounded"
                                                    />
                                                ) : (
                                                    <div className="bg-white p-1 rounded flex-grow">{cliente.telefono}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-between space-x-4 mt-4">
                                            {clienteEditando && clienteEditando.id === cliente.id ? (
                                                <div className="flex w-full space-x-4">
                                                    <button className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex-1 ${isGuardarDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={manejarGuardar} disabled={isGuardarDisabled}>Guardar</button>
                                                    <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md flex-1" onClick={manejarCancelar}>Cancelar</button>
                                                </div>
                                            ) : (
                                                <div className="flex w-full space-x-4">
                                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-md flex-1" onClick={() => manejarEditar(cliente)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                    <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-4 rounded-md flex-1" onClick={() => manejarEliminar(cliente.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {clientesActuales.length === 0 ? (
                        <h1 className="text-3xl font-bold m-5 text-center">Aún no se han agregado clientes</h1> 
                        ) : (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => setPaginaActual(paginaActual - 1)}
                                disabled={paginaActual === 1}
                                className="mx-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded disabled:opacity-50"
                            >
                                Anterior
                            </button>
                            <button
                                onClick={() => setPaginaActual(paginaActual + 1)}
                                disabled={paginaActual === totalPaginas}
                                className="mx-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded disabled:opacity-50"
                            >
                                Siguiente
                            </button>
                        </div>
                          )}
                    
                </div>
            </div>
        </div>
    );
};

export default ListaClientes;

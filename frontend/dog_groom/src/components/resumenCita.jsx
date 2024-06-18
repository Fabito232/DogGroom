import { useState, useEffect } from 'react';

const ResumenCita = () => {
    const [appointments, setAppointments] = useState([]);
    const [isEditing, setIsEditing] = useState(null);

    useEffect(() => {
        // Cargar datos
        const cargarClientes = async () => {
            const datosSimulados = [
                { date: '29/09/2024', time: '10:00', cedula: '208270199', nombre: 'Juan Perez', telefono: '1234567890', animal: 'Perro', raza: 'Labrador', servicio: 'Corte', precio: '10,000',adicional: 'Uñas' ,total: '12,000' ,image: 'https://via.placeholder.com/150' },
            ];

            setAppointments(datosSimulados);
        };

        cargarClientes();
    }, []);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedAppointments = [...appointments];
        updatedAppointments[index] = { ...updatedAppointments[index], [name]: value };
        setAppointments(updatedAppointments);
    };

    const handleImageChange = (e, index) => {
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        const updatedAppointments = [...appointments];
        updatedAppointments[index] = { ...updatedAppointments[index], image: imageUrl };
        setAppointments(updatedAppointments);
    };

    const handleSaveClick = (index) => {
        setIsEditing(null);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-primary bg-opacity-80 bg-fondo bg-cover">
            <div className="bg-lime-900 shadow-md roundedrounded-s-3xl px-4 pt-2 pb-10 mb-4 max-w-4xl h-auto w-auto max-h-full max-w-full overflow-y-auto">
                {appointments.length === 0 ? (
                    <p>No hay citas agendadas.</p>
                ) : (
                    appointments.map((appointment, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 md:justify-between gap-4 mb-4">
                            <div className="col-span-1 space-y-2">
                                {isEditing === index ? (
                                    <>
                                        <input
                                            type="text"
                                            name="date"
                                            value={appointment.date}
                                            onChange={(e) => handleInputChange(e, index)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                        <input
                                            type="time"
                                            name="time"
                                            value={appointment.time}
                                            onChange={(e) => handleInputChange(e, index)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p><strong>Fecha:</strong> {appointment.date}</p>
                                        <p><strong>Hora:</strong> {appointment.time}</p>
                                    </>
                                )}
                                <div className="mb-8 md:mr-8 md:mb-0">
                                    {isEditing === index ? (
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, index)}
                                            className="w-48 h-48 object-cover rounded-md"
                                        />
                                    ) : (
                                        appointment.image && <img src={appointment.image} alt="Mascota" className="w-48 h-48 object-cover rounded-md" />
                                    )}
                                </div>
                                <div className="mb-4 space-x-2">
                                    {isEditing === null && (
                                        <>
                                            <button
                                                onClick={() => setIsEditing(index)}
                                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => setAppointments(appointments.filter((_, i) => i !== index))}
                                                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            >
                                                Eliminar
                                            </button>
                                        </>
                                    )}
                                    {isEditing === index && (
                                        <button
                                            onClick={() => handleSaveClick(index)}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                        >
                                            Guardar
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="col-span-2 p-2 w-full z-10 flex flex-col items-end">
                                <div className="space-y-2">
                                    {isEditing === index ? (
                                        <>
                                           <div className="flex flex-col space-y-4">
                                                <div className="flex items-center">
                                                    <label htmlFor="Cedula" className="w-24"><strong>Cedula:</strong></label>
                                                    <input
                                                        type="text"
                                                        id="cedula"
                                                        name="cedula"
                                                        value={appointment.cedula}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-y-4">
                                                <div className="flex items-center">
                                                    <label htmlFor="Nombre" className="w-24"><strong>Nombre:</strong></label>
                                                    <input
                                                        type="text"
                                                        id = "nombre"
                                                        name="nombre"
                                                        value={appointment.nombre}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  flex space-x-3"
                                                    />
                        
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col space-y-4">
                                                    <div className="flex items-center">
                                                        <label htmlFor="Telefono" className="w-24"><strong>Teléfono:</strong></label>
                                                        <input
                                                            type="text"
                                                            id="telefono"
                                                            name="telefono"
                                                            value={appointment.telefono}
                                                            onChange={(e) => handleInputChange(e, index)}
                                                            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex space-x-1"
                                                        />

                                                    </div>
                                            
                                            </div>
                                            <div className="flex flex-col space-y-4">
                                                <div className="flex items-center">
                                                        <label htmlFor="Animal" className="w-24"><strong>Animal:</strong></label>
                                                    <input
                                                        type="text"
                                                        id="animal"
                                                        name="animal"
                                                        value={appointment.animal}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                        className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  flex space-x-1 "
                                                    />  
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col space-y-4">
                                                <div className="flex items-center">
                                                        <label htmlFor="Raza" className="w-24"><strong>Raza:</strong></label>
                                                    <input
                                                        type="text"
                                                        id="raza"
                                                        name="raza"
                                                        value={appointment.raza}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  flex space-x-3"
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col space-y-4">
                                                <div className="flex items-center">
                                                        <label htmlFor="Servicio" className="w-24"><strong>Servicio:</strong></label>
                                                    <input
                                                        type="text"
                                                        id="servicio"
                                                        name="servicio"
                                                        value={appointment.servicio}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                        className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  flex space-x-3"
                                                    />
                                                </div>
                                            </div>
                                
                                           <div className="flex flex-col space-y-4 ">
                                             <div className="flex items-center">
                                                    <label htmlFor="Precio" className="w-24"><strong>Precio:</strong></label>
                                                    <input
                                                        type="text"
                                                        id="Precio"
                                                        name="precio"
                                                        value={appointment.precio}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                        className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  flex space-y-4"
                                                    />
                                                </div>
                                           </div>
                                            
                                        </>
                                    ) : (
                                        <>
                                            <p className= "bg-gray-100 p-2 rounded-md mb-2"><strong>Cédula:</strong> {appointment.cedula}</p>
                                            <p className= "bg-gray-100 p-2 rounded-md mb-2"><strong>Nombre:</strong> {appointment.nombre}</p>
                                            <p className= "bg-gray-100 p-2 rounded-md mb-2"><strong>Teléfono:</strong> {appointment.telefono}</p>
                                            <p className= "bg-gray-100 p-2 rounded-md mb-2"><strong>Animal:</strong> {appointment.animal}</p>
                                            <p className= "bg-gray-100 p-2 rounded-md mb-2"><strong>Raza:</strong> {appointment.raza}</p>
                                        </>
                                    )}
                                </div>
                                <table className="min-w-80 divide-y divide-gray-200 border-collapse mt-4">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Servicio</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr className="bg-white border border-gray-200">
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{appointment.servicio}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{appointment.precio}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <div className="space-y-2">
                                        {isEditing === index ? (
                                            <>
                                                <div className="flex flex-col space-y-4 ">
                                                    <div className="flex items-center">
                                                        <label htmlFor="Adicional" className="w-24"><strong>Adicional:</strong></label>
                                                        <input
                                                            type="text"
                                                            id="adicional"
                                                            name="adicional"
                                                            value={appointment.adional}
                                                            onChange={(e) => handleInputChange(e, index)}
                                                            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  flex space-y-4  mt-4"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col space-y-4 ">
                                                    <div className="flex items-center">
                                                        <label htmlFor="Total" className="w-24"><strong>Total:</strong></label>
                                                        <input
                                                            type="text"
                                                            id="total"
                                                            name="total"
                                                            value={appointment.total}
                                                            onChange={(e) => handleInputChange(e, index)}
                                                            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  flex space-y-4 "
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className= "bg-gray-100 p-2 rounded-md mb-2 mt-4"><strong>Adicional:</strong> {appointment.adicional}</p>
                                                <p className= "bg-gray-100 p-2 rounded-md mb-2"><strong>Total:</strong> {appointment.total}</p>
                                            </>
                                           
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button type="submit" className="  mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Finalizar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ResumenCita;






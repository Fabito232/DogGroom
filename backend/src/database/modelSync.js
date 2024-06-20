import sequelize from "./database.js";
import Cliente from "../models/clienteModel.js";
import TipoMascota from "../models/tipoMascota.js";
import Mascota from "../models/mascotaModel.js";
import Cita from "../models/citaModel.js";
import CitaDetalle from "../models/citaDetalleModel.js";
import Servicio from "../models/servicioModel.js";
import Empleado from "../models/empleadoModel.js";
import Producto from "../models/productoModel.js";
import Gasto from "../models/gastosModel.js";


async function Sync () {
    try {
        //await sequelize.sync(); // Esto crea la tabla si no existe (y no hace nada si ya existe)
    //    await sequelize.sync({force: true}); //Esto crea la tabla, eliminándola primero si ya existía.
    //await sequelize.sync({alter: true}); //Esto verifica cuál es el estado actual de la tabla en la base de datos (qué columnas tiene, cuáles son sus tipos de datos, etc.) y luego realiza los cambios necesarios en la tabla para que coincida con el modelo
        //await sequelize.drop();
        console.log("Tablas sincronizadas correctamente")  
    } catch (error) {
        console.log("Error en la sincronizacion de las tablas", error)  
    }
}

export default Sync;

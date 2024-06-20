import Empleado from '../models/empleadoModel.js'
import bcrypt from 'bcrypt';
import { SECRET } from '../config.js';
import { generarToken } from '../middleware/auth.js';

export const createEmpleado = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const contraHash = await bcrypt.hash(req.body.contrasena, salt);
        const empleado = await Empleado.create({
            Nombre: req.body.nombre,
            Correo: req.body.correo,
            Contrasena: contraHash,
        });
        return res.json({
            ok: true,
            status: 200,
            message: "Empleado creada correctamente",
            data: empleado
        });
    } catch (error) {
        console.error("Error al crear el Empleado:", error);
        return res.json({
            ok: false,
            status: 400,
            message: "Error al crear la Empleado"
        });
    }
}

export const loginEmpleado = async (req, res) => {
    try {

        const empleado = await Empleado.findOne({
            where: {
                Correo: req.body.correo
            }
        });
        console.log(empleado)
        if(empleado == null){
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "El correo no existe"
        })};

        const validarContra = await bcrypt.compare(req.body.contrasena, empleado.Contrasena);
        if(!validarContra){
            return res.status(401).json({
                ok: false,
                status: 401,
                message: "Contraseña incorrecta"
            });
        }
        
        
        const token =  generarToken({ id: empleado.ID_Empleado, correo: empleado.Correo });

        return res.json({
            token: token,
            ok: true,
            status: 200,
            message: "Inicio de sesión exitoso",
            data: {
                id: empleado.ID_Empleado,
                nombre: empleado.Nombre,
                correo: empleado.Correo,
            }
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al obtener el Empleado",
            error: error.message
        });
    }
};


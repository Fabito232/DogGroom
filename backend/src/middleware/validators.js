import Joi from 'joi';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const mascotaSchema = Joi.object({
    image: Joi.string().allow('', null).optional(),
    nombre: Joi.string().required(),
    raza: Joi.string().required(),
    cedula: Joi.string().required(),
    ID_TipoMascota: Joi.number().integer().positive().required()
});

const clienteSchema = Joi.object({
    cedula: Joi.string().required(),
    nombre: Joi.string().required(),
    telefono: Joi.string().required(),
});

const productoSchema = Joi.object({
    nombre: Joi.string().min(2).required(),
    marca: Joi.string().required(),
    descripcion: Joi.string().required(),
    cantidad: Joi.number().integer().min(0).required(),
});

const tipoMascotaSchema = Joi.object({
    descripcion: Joi.string().required()
});

const servicioSchema = Joi.object({
    descripcion: Joi.string().required(),
    ID_TipoMascota: Joi.number().integer().positive().required(),
    precio: Joi.number().integer().positive().required()
});

const empleadoSchema = Joi.object({
    nombre: Joi.string().required(),
    correo: Joi.string().email().required(),
    contrasena: Joi.string().min(4).max(30).required()
});

const citaSchema = Joi.object({
    
    //ID_Cliente: Joi.string().required(),
    FechaYHora: Joi.date().iso().required(),
    Descripcion: Joi.string().allow('', null).optional(),
    Estado:  Joi.boolean().required(),
    MontoTotal: Joi.number().precision(2).positive().required(),

    

    
});

const citaDetalleSchema = Joi.object({
    ID_Cita: Joi.string().required(),
    ID_Servicio: Joi.string().required(),
    montoAdicional: Joi.number().integer().min(0).required(),
});

const finanzasSchema = Joi.object({
    fechaInicio: Joi.date().required(),
    fechaFin: Joi.date().required(),
});

const listaCitasDSchema = Joi.array().items(citaDetalleSchema);

const validarDatosProducto = (req, res, next) => {
    const { error } = productoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validarDatosMascota = (req, res, next) => {
    const { error } = mascotaSchema.validate(req.body);
    if (error) {
        
        let fotoURL = null;
        if (req.file) {
          fotoURL = `/uploads/${req.file.filename}`;
          console.log("fotourl:", fotoURL)
        }
        const fotoPath = join(__dirname, '../public' + fotoURL);
        fs.unlink(fotoPath, (err) => {
            if (err) console.error("Error al eliminar la imagen:", err);
            console.log('Imagen eliminada');
        });
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validarDatosCliente = (req, res, next) => {
    const { error } = clienteSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validarDatosCita = (req, res, next) => {
    const { error } = citaSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();

};const validarDatosCitaD = (req, res, next) => {
    const { error } = listaCitasDSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validarDatosEmpleado = (req, res, next) => {
    const { error } = empleadoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validarDatosServicio = (req, res, next) => {
    const { error } = servicioSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validarDatosTipoMa = (req, res, next) => {
    const { error } = tipoMascotaSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validarFinanzas = (req, res, next) => {
    const { error } = finanzasSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export { 
    validarDatosProducto,
    validarDatosCita,
    validarDatosServicio,
    validarDatosCitaD,
    validarDatosCliente,
    validarDatosEmpleado,
    validarDatosMascota,
    validarDatosTipoMa,
    validarFinanzas
};
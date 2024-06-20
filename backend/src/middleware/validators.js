import Joi from 'joi';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const mascotaSchema = Joi.object({
    nombre: Joi.string().required(),
    raza: Joi.string().required(),
    cedula: Joi.string().required(),
    ID_TipoMascota: Joi.number().integer().positive().required(),
    images: Joi.any().optional() 
});

const clienteSchema = Joi.object({
    cedula: Joi.string().required(),
    nombre: Joi.string().required(),
    telefono: Joi.string().required(),
    mascotas: Joi.array().items(mascotaSchema).required(),
    images: Joi.any().optional() 
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
    
    cedula: Joi.string().required(),
    fechaYHora: Joi.date().iso().required(),
    descripcion: Joi.string().allow('', null).optional(),
    estado:  Joi.boolean().required(),
    montoTotal: Joi.number().precision(2).min(0).required(),
    montoAdicional: Joi.number().precision(2).min(0).required(),
    ID_Servicio: Joi.number().precision(2).positive().required()
    }  
);

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
   
    console.log(req.body)
    console.log(req.files)
    req.body.mascotas = JSON.parse(req.body.mascotas);
    const { error } = clienteSchema.validate(req.body);
    if (error) {

    const files = req.files; 
    let fotosURL = [];
  
    if (files && files.length > 0) {
      fotosURL = files.map(file => `/uploads/${file.filename}`);
    }
        if (fotosURL.length > 0) {
            fotosURL.forEach(fotoURL => {
              const fotoPath = join(__dirname, '../public' + fotoURL);
              fs.unlink(fotoPath, (err) => {
                if (err) console.error("Error al eliminar la imagen:", err);
                console.log('Imagen eliminada');
              });
            });
        }
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
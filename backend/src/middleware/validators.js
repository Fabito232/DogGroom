import Joi from 'joi';

const mascotaSchema = Joi.object({
    nombre: Joi.string().required(),
    raza: Joi.string().required(),
    cedula: Joi.number().integer().positive().required(),
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
    Descripcion: Joi.string().required(),
});

const servicioSchema = Joi.object({
    descripcion: Joi.string().required(),
    precio: Joi.number().integer().positive().required()
});

const empleadoSchema = Joi.object({
    nombre: Joi.string().required(),
    correo: Joi.string().email().required(),
    contrasena: Joi.string().min(4).max(30).required()
});

const citaSchema = Joi.object({
    fechaYHora: Joi.date().iso().required(),
    descripcion: Joi.string().allow('', null).optional(),
    estado: Joi.boolean().required(),
    montoTotal: Joi.number().precision(2).positive().required(),
    cedula: Joi.string().required()
});

const citaDetalleSchema = Joi.object({
    ID_Cita: Joi.string().required(),
    ID_Servicio: Joi.string().required(),
    montoAdicional: Joi.number().integer().min(0).required(),
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

export { 
    validarDatosProducto,
    validarDatosCita,
    validarDatosServicio,
    validarDatosCitaD,
    validarDatosCliente,
    validarDatosEmpleado,
    validarDatosMascota,
    validarDatosTipoMa,
};
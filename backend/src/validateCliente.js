import Joi from 'joi';

const clienteSchema = Joi.object({
    cedula: Joi.string().required(),
    nombre: Joi.string().required(),
    telefono: Joi.string().min(4).required()
});


const validarDatosCliente = (req, res, next) => {
    const { error } = clienteSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export { validarDatosCliente };
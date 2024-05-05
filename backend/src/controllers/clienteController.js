import  Cliente  from "../models/clienteModel.js"

export const crearCliente = async (req, res) => {
    try {
        const cliente = await Cliente.create({
            Nombre: req.body.nombre,
            Telefono: req.body.telefono
        });
        console.log(cliente)
        res.status(201).json({
            ok: true,
            status: 200,
            message: "Cliente creado correctamente"
        });
    } catch (error) {
        console.error("Error al crear el cliente:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al crear el cliente"
        });
    }
}
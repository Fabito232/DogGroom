import  Cliente  from "../models/clienteModel.js"

export const createCliente = async (req, res) => {
    try {
        const cliente = await Cliente.create({
            Nombre: req.body.nombre,
            Telefono: req.body.telefono
        });
        console.log(cliente)
        res.json({
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

export const getCliente = async (req, res) => {
    const id = req.params.id
    try {
        const cliente = await Cliente.findByPk(id);
        if (cliente !== null) {
            res.json({
                ok: true,
                status: 200,
                message: "Se obtuvo el cliente correctamente",
                data: cliente
            });
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontró el cliente con el ID proporcionado",
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al obtener el cliente",
            error: error.message
        });
    }
};


export const getListCliente = async (req, res) => {
    const id = req.params.id
    try {
        const cliente = await Cliente.findAll({
        })
        res.json({
            ok: true,
            status: 200,
            message: "Se obtuvo todos los cliente correctamente",
            data: cliente
        })
    } catch (error) {
        res.json({
            ok: false,
            status: 500,
            message: "No se encontro ningun cliente",
        })
    }
}

export const deleteCliente = async (req, res) => {
    const id = req.params.id
    try {
        const cliente = await Cliente.destroy({
            where:{
                Cedula: id
            }
        })
        res.json({
            ok: true,
            status: 200,
            message: "Se borro el cliente correctamente",
            data: cliente
        })
    } catch (error) {
        res.json({
            ok: false,
            status: 500,
            message: "No se borro el cliente",
        })
    }
}

export const updateCliente = async (req, res) => {
    const id = req.params.id
    console.log(id)
    console.log(req.body)
    try {
        const [filasActualizadas]  = await Cliente.update(
            {
                Cedula: req.body.cedula,
                Nombre: req.body.nombre,
                Telefono: req.body.telefono
            },
            {
                where:{
                    Cedula: id
                }
            })
            if (filasActualizadas > 0) {
                res.json({
                    ok: true,
                    status: 200,
                    message: "Se obtuvo el cliente correctamente",
                    data: filasActualizadas
                });
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    message: "No se encontró el cliente con el ID proporcionado",
                });
            }
    } catch (error) {
        res.json({
            ok: false,
            status: 500,
            message: "No se actualizo el cliente",
            error: error.message
        })
    }
}
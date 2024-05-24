import  Cliente  from "../models/clienteModel.js"

export const createCliente = async (req, res) => {

    try {
        const existencia = await Cliente.findByPk(req.body.cedula);
        if(existencia !== null) {
            return res.json({
                ok: false,
                status: 400,
                message: "Existe un Cliente con esa cedula"
            });
        }

        const cliente = await Cliente.create({
            Cedula: req.body.cedula,
            Nombre: req.body.nombre,
            Telefono: req.body.telefono
        });
        return res.json({
            ok: true,
            status: 200,
            message: "Cliente creado correctamente",
            data: cliente
        });
    } catch (error) {
        return res.json({
            ok: false,
            status: 400,
            message: "Error al crear el cliente"
        });
    }
}

export const getCliente = async (req, res) => {
    
    try {
        const id = req.params.id
        const cliente = await Cliente.findByPk(id);
        if (cliente !== null) {
            return res.json({
                ok: true,
                status: 200,
                message: "Se obtuvo el cliente correctamente",
                data: cliente
            });
        } else {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontró el cliente con el ID proporcionado",
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al obtener el cliente",
            error: error.message
        });
    }
};


export const getListCliente = async (req, res) => {
    
    try {
        const id = req.params.id
        const cliente = await Cliente.findAll({
        })
        return res.json({
            ok: true,
            status: 200,
            message: "Se obtuvo todos los cliente correctamente",
            data: cliente
        })
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "No se encontro ningun cliente",
        })
    }
}

export const deleteCliente = async (req, res) => {
    
    try {
        const id = req.params.id
        const cliente = await Cliente.destroy({
            where:{
                Cedula: id
            }
        })
        return res.json({
            ok: true,
            status: 200,
            message: "Se borro el cliente correctamente",
            data: cliente
        })
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "No se borro el cliente",
        })
    }
}

export const updateCliente = async (req, res) => {
    
    try {
        const id = req.params.id
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
                return res.json({
                    ok: true,
                    status: 200,
                    message: "Se obtuvo el cliente correctamente",
                    data: filasActualizadas
                });
            } else {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: "No se encontró el cliente con el ID proporcionado",
                });
            }
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "No se actualizo el cliente",
            error: error.message
        })
    }
}
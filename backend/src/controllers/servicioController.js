import Servicio from '../models/servicioModel.js'

export const createServicio = async (req, res) => {

    try {
        const servicio = await Servicio.create({
            Descripcion: req.body.descripcion,
            Precio: req.body.precio,
            ID_TipoMascota: req.body.ID_TipoMascota,
        });
        return res.json({
            ok: true,
            status: 200,
            message: "Servicio creada correctamente",
            data: servicio
        });
    } catch (error) {
        console.error("Error al crear el Servicio:", error);
        return res.json({
            ok: false,
            status: 400,
            message: "Error al crear la Servicio"
        });
    }
}

export const getServicio = async (req, res) => {
    try {
        const id = req.params.id
        const servicio = await Servicio.findByPk(id);
        if (servicio !== null) {
            return res.json({
                ok: true,
                status: 200,
                message: "Se obtuvo la Servicio correctamente",
                data: servicio
            });
        } else {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontró la Servicio con el ID proporcionado",
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al obtener la Servicio",
            error: error.message
        });
    }
};


export const getListServicio = async (req, res) => {
    try {
        const servicios = await Servicio.findAll()
        if (servicios.length !== 0) {
            return res.json({
                ok: true,
                status: 200,
                message: "Se obtuvo todos las Servicio correctamente",
                data: servicios
            });
        } else {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontro ningun Servicio",
            });
        }
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "Error al obtener los Servicios"
        })
    }
}

export const deleteServicio = async (req, res) => {
    
    try {
        const id = req.params.id
        const servicio = await Servicio.destroy({
            where:{
                ID_Servicio: id
            }
        })
        return res.json({
            ok: true,
            status: 200,
            message: "Se borro la Servicio correctamente",
            data: servicio
        })
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "No se borro la Servicio",
        })
    }
}

export const updateServicio = async (req, res) => {
    
    try {
        const id = req.params.id
        const [filasActualizadas]  = await Servicio.update(
            {
                Descripcion: req.body.descripcion,
                Precio: req.body.precio,
                ID_TipoMascota: req.body.ID_TipoMascota,
            },
            {
                where:{
                    ID_Servicio: id
                }
            })
            if (filasActualizadas > 0) {
                return res.json({
                    ok: true,
                    status: 200,
                    message: "Se obtuvo los servicios correctamente",
                });
            } else {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: "No se encontró el servicio con el ID proporcionado",
                });
            }
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "No se actualizo el Servicio",
            error: error.message
        })
    }
}
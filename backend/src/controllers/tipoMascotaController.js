import TipoMascota from '../models/tipoMascota.js'

export const createTipoMascota = async (req, res) => {

    try {
        const tipoMascota = await TipoMascota.create({
            Descripcion: req.body.descripcion
        });
        return res.json({
            ok: true,
            status: 200,
            message: "TipoMascota creada correctamente",
            data: tipoMascota
        });
    } catch (error) {
        console.error("Error al crear el TipoMascota:", error);
        return res.json({
            ok: false,
            status: 400,
            message: "Error al crear la TipoMascota"
        });
    }
}

export const getTipoMascota = async (req, res) => {
    try {
        const id = req.params.id
        const tipoMascota = await TipoMascota.findByPk(id);
        if (tipoMascota !== null) {
            return res.json({
                ok: true,
                status: 200,
                message: "Se obtuvo la TipoMascota correctamente",
                data: tipoMascota
            });
        } else {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontró la TipoMascota con el ID proporcionado",
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al obtener la TipoMascota",
            error: error.message
        });
    }
};


export const getListTipoMascota = async (req, res) => {
    try {
        const tipoMascotas = await TipoMascota.findAll()
        if (tipoMascotas.length !== 0) {
            return res.json({
                ok: true,
                status: 200,
                message: "Se obtuvo todos las TipoMascota correctamente",
                data: tipoMascotas
            });
        } else {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontro ningun TipoMascota",
            });
        }
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "Error al obtener los TipoMascotas"
        })
    }
}

export const deleteTipoMascota = async (req, res) => {
    
    try {
        const id = req.params.id
        const tipoMascota = await TipoMascota.destroy({
            where:{
                ID_TipoMascota: id
            }
        })
        return res.json({
            ok: true,
            status: 200,
            message: "Se borro la TipoMascota correctamente",
            data: tipoMascota
        })
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "No se borro la TipoMascota",
        })
    }
}

export const updateTipoMascota = async (req, res) => {
    const id = req.params.id
    try {
        const [filasActualizadas]  = await TipoMascota.update(
            {
                Descripcion: req.body.descripcion
            },
            {
                where:{
                    ID_TipoMascota: id
                }
            })
            if (filasActualizadas > 0) {
                res.json({
                    ok: true,
                    status: 200,
                    message: "Se obtuvo los tipoMascotas correctamente",
                });
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    message: "No se encontró el tipoMascota con el ID proporcionado",
                });
            }
    } catch (error) {
        res.json({
            ok: false,
            status: 500,
            message: "No se actualizo el TipoMascota",
            error: error.message
        })
    }
}
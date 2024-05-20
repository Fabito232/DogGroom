import Cita from '../models/citaModel.js'

export const createCita = async (req, res) => {

    try {
        const cita = await Cita.create({
            FechaYHora: req.body.fechaYHora,
            Descripcion: req.body.descripcion,
            Estado: req.body.estado,
            MontoTotal: req.body.montoTotal,
            ID_Cliente: req.body.cedula
        });
        res.json({
            ok: true,
            status: 200,
            message: "Cita creada correctamente",
            data: Cita
        });
    } catch (error) {
        console.error("Error al crear el Cita:", error);
        res.json({
            ok: false,
            status: 400,
            message: "Error al crear la Cita"
        });
    }
}

export const getCita = async (req, res) => {
    try {
        const id = req.params.id
        const cita = await Cita.findByPk(id);
        if (cita !== null) {
            res.json({
                ok: true,
                status: 200,
                message: "Se obtuvo la Cita correctamente",
                data: cita
            });
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontró la Cita con el ID proporcionado",
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al obtener la Cita",
            error: error.message
        });
    }
};


export const getListCita = async (req, res) => {
    
    try {
        const cita = await Cita.findAll({
        })
        res.json({
            ok: true,
            status: 200,
            message: "Se obtuvo todos las Cita correctamente",
            data: cita
        })
    } catch (error) {
        res.json({
            ok: false,
            status: 500,
            message: "No se encontro ninguna Cita",
        })
    }
}

export const deleteCita = async (req, res) => {
    const id = req.params.id
    try {
        const cita = await Cita.destroy({
            where:{
                ID_Cita: id
            }
        })
        res.json({
            ok: true,
            status: 200,
            message: "Se borro la Cita correctamente",
            data: cita
        })
    } catch (error) {
        res.json({
            ok: false,
            status: 500,
            message: "No se borro la Cita",
        })
    }
}

export const updateCita = async (req, res) => {
    const id = req.params.id
    console.log(id)
    console.log(req.body)
    try {
        const [filasActualizadas]  = await Cita.update(
            {
                FechaYHora: req.body.fechaYHora,
                Descripcion: req.body.descripcion,
                Estado: req.body.estado,
                MontoTotal: req.body.montoTotal,
                ID_Cliente: req.body.cedula
            },
            {
                where:{
                    ID_Cita: id
                }
            })
            if (filasActualizadas > 0) {
                res.json({
                    ok: true,
                    status: 200,
                    message: "Se obtuvo la Cita correctamente",
                });
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    message: "No se encontró la Cita con el ID proporcionado",
                });
            }
    } catch (error) {
        res.json({
            ok: false,
            status: 500,
            message: "No se actualizo la Cita",
            error: error.message
        })
    }
}
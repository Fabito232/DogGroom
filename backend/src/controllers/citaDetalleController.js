import CitaDetalle from '../models/citaDetalleModel.js'
import sequelize from '../database/database.js';

export const createCitaDetalle = async (req, res) => {

    try {
        const listaCitasD = req.body;
        const citaDetalle = await CitaDetalle.bulkCreate(listaCitasD);

        res.json({
            ok: true,
            status: 200,
            message: "CitaDetalle creada correctamente",
            data: citaDetalle
        });
    } catch (error) {
        console.error("Error al crear el CitaDetalle:", error);
        res.json({
            ok: false,
            status: 400,
            message: "Error al crear la CitaDetalle"
        });
    }
}

export const getCitaDetalle = async (req, res) => {
    try {
        const id = req.params.id
        const citaDetalle = await CitaDetalle.findAll({
            where:{
                ID_Cita: id
            }
        });
        if (citaDetalle.length !== 0) {
            res.json({
                ok: true,
                status: 200,
                message: "Se obtuvo todos las CitaDetalle correctamente",
                data: citaDetalle
            });
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontro ningun CitaDetalle",
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al obtener la CitaDetalle",
            error: error.message
        });
    }
};


export const getListCitaDetalle = async (req, res) => {
    try {
        const citaDetalles = await CitaDetalle.findAll()
        if (citaDetalles.length !== 0) {
            res.json({
                ok: true,
                status: 200,
                message: "Se obtuvo todos las CitaDetalle correctamente",
                data: citaDetalles
            });
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontro ningun CitaDetalle",
            });
        }
    } catch (error) {
        res.json({
            ok: false,
            status: 500,
            message: "Error al obtener los CitaDetalles"
        })
    }
}

export const deleteCitaDetalle = async (req, res) => {
    const id = req.params.id
    try {
        const citaDetalle = await CitaDetalle.destroy({
            where:{
                ID_Cita: id
            }
        })
        return res.json({
            ok: true,
            status: 200,
            message: "Se borro la CitaDetalle correctamente",
            data: citaDetalle
        })
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "No se borro la CitaDetalle",
        })
    }
}

export const updateCitaDetalle = async (req, res) => {
    try {
        const id = req.params.id;
        const t = await sequelize.transaction(); 
        await CitaDetalle.destroy({
            where: {
                ID_Cita: id
            },
            transaction: t
        });
        const listaCitasD = req.body;
        const citaDetalles = await CitaDetalle.bulkCreate(listaCitasD, { transaction: t });
        await t.commit();

        if (citaDetalles.length > 0) {
            return res.json({
                ok: true,
                status: 200,
                message: "Se actualizaron los detalles de la cita correctamente",
                data: citaDetalles
            });
        } else {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontraron detalles de cita para actualizar"
            });
        }
    } catch (error) {
        await t.rollback();
        console.error('Error al actualizar detalles de cita:', error);
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al actualizar detalles de cita",
            error: error.message
        });
    }
};
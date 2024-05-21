import CitaDetalle from '../models/citaDetalle.js';
import Cita from '../models/citaModel.js'
import Cliente from '../models/clienteModel.js';
import Mascota from '../models/mascotaModel.js';
import Servicio from '../models/servicioModel.js';
import TipoMascota from '../models/tipoMascota.js';

export const createCita = async (req, res) => {

    try {
        const cita = await Cita.create({
            FechaYHora: req.body.fechaYHora,
            Descripcion: req.body.descripcion,
            Estado: req.body.estado,
            MontoTotal: req.body.montoTotal,
            ID_Cliente: req.body.cedula
        });
        return res.json({
            ok: true,
            status: 200,
            message: "Cita creada correctamente",
            data: cita
        });
    } catch (error) {
        console.error("Error al crear el Cita:", error);
        return res.json({
            ok: false,
            status: 400,
            message: "Error al crear la Cita"
        });
    }
}

export const getCita = async (req, res) => {
    try {
        const id = req.params.id
        const cita = await Cita.findAll(
            {
                where: {
                    ID_Cita: id
                },
                include: [
                {
                    model: Cliente,
                    include: [{
                        model: Mascota,
                        include:[{
                            model: TipoMascota
                        }]
                    }]
                },
                    
                {
                    model: CitaDetalle,
                    include: [{
                        model: Servicio
                    }]
                }]
            }
        )

        if (cita !== null) {
            return res.json({
                ok: true,
                status: 200,
                message: "Se obtuvo la Cita correctamente",
                data: cita
            });
        } else {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontró la Cita con el ID proporcionado",
            });
        }
    } catch (error) {
        return res.status(500).json({
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
        return res.json({
            ok: true,
            status: 200,
            message: "Se obtuvo todos las Cita correctamente",
            data: cita
        })
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "No se encontro ninguna Cita",
        })
    }
}

export const deleteCita = async (req, res) => {
    
    try {
        const id = req.params.id
        const cita = await Cita.destroy({
            where:{
                ID_Cita: id
            }
        })
        return res.json({
            ok: true,
            status: 200,
            message: "Se borro la Cita correctamente",
            data: cita
        })
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "No se borro la Cita",
        })
    }
}

export const updateCita = async (req, res) => {
    
    try {
        const id = req.params.id
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
                return res.json({
                    ok: true,
                    status: 200,
                    message: "Se obtuvo la Cita correctamente",
                });
            } else {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: "No se encontró la Cita con el ID proporcionado",
                });
            }
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "No se actualizo la Cita",
            error: error.message
        })
    }
}


// const allCita = await Cita.findAll(
//     {
//         where: {
//             ID_Cita: id
//         },
//         include: [
//         {
//             model: Cliente,
//             include: [{
//                 model: Mascota,
//                 include:[{
//                     model: TipoMascota
//                 }]
//             }]
//         },
            
//         {
//             model: CitaDetalle,
//             include: [{
//                 model: Servicio
//             }]
//         }]
//     }
// )
// console.log(allCita)
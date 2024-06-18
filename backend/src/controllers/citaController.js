import CitaDetalle from '../models/citaDetalleModel.js';
import Cita from '../models/citaModel.js'
import Cliente from '../models/clienteModel.js';
import Mascota from '../models/mascotaModel.js';
import Servicio from '../models/servicioModel.js';
import TipoMascota from '../models/tipoMascota.js';
//import Cliente from '../controllers/clienteController.js'

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

export const getCita = async (id) => {
    try {
        
        const cita = await Cita.findByPk(id, {
            include: [
                {
                    model: Cliente, 
                    include: [
                        {
                            model: Mascota
                        }
                    ]
                }
            ]
        });

        if (!cita) {
            return {
                ok: false,
                message: "No se encontró la Cita con el ID proporcionado",
            };
        }

        return {
            ok: true,
            message: "Se obtuvo la Cita correctamente",
            data: cita,
        };
    } catch (error) {
        console.error("Error al obtener la Cita:", error);
        return {
            ok: false,
            message: "Error al obtener la Cita",
            error: error.message
        };
    }
};


export const getListCita = async (req, res) => {
    try {
        const citas = await Cita.findAll({
            include: [
                {
                    model: Cliente,
                    include: [{
                        model: Mascota,
                        include: [{
                            model: TipoMascota,
                            include: [{
                                model: Servicio
                            }]
                        }]
                    }]
                },

            ]
        });
        return res.json({
            ok: true,
            status: 200,
            message: "Se obtuvieron todas las citas correctamente",
            data: citas
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al obtener las citas",
            error: error.message
        });
    }
};

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

export const obtenerTodasCitas = async(req, res) => {

    try{
       
        const allCita = await Cita.findAll(
            {
            
                include: [
                {
                    model: Cliente,
                    include: [{
                        model: Mascota,
                        include:[{
                           model: TipoMascota
                        }]
                    }]
                }],
           }
                   
           
        )
        console.log(allCita)
        return res.json({
            ok: true,
            status: 200,
            message: "Se obtuvo todos las citas",
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

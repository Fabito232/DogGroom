
import Mascota from "../models/mascotaModel.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createMascota = async (req, res) => {
    let fotoURL = null;
    if (req.file) {
      fotoURL = `/uploads/${req.file.filename}`;
    }
    try {
        const mascota = await Mascota.create({
            Nombre: req.body.nombre,
            Raza: req.body.raza,
            FotoURL: fotoURL,
            ID_Cliente: req.body.cedula,
            ID_TipoMascota: req.body.ID_TipoMascota
        });

        res.json({
            ok: true,
            status: 200,
            message: "Mascota creado correctamente",
            data: mascota
        });

    } catch (error) {
        const fotoPath = join(__dirname, '../public' + fotoURL);
        fs.unlink(fotoPath, (err) => {
            if (err) console.error("Error al eliminar la imagen:", err);
            console.log('Imagen eliminada');
        });
        console.error("Error al crear el Mascota:", error);
        res.json({
            ok: false,
            status: 400,
            message: "Error al crear el Mascota"
        });
    }
}

export const getMascota = async (req, res) => {
    const id = req.params.id
    try {
        const mascota = await Mascota.findByPk(id);
        if (mascota !== null) {
            res.json({
                ok: true,
                status: 200,
                message: "Se obtuvo el Mascota correctamente",
                data: mascota
            });
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontró el Mascota con el ID proporcionado",
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al obtener el Mascota",
            error: error.message
        });
    }
};

export const getListMascota = async (req, res) => {

    try {
        const mascota = await Mascota.findAll()
        res.json({
            ok: true,
            status: 200,
            message: "Se obtuvo todos los Mascota correctamente",
            data: mascota
        })
    } catch (error) {
        res.json({
            ok: false,
            status: 500,
            message: "No se encontro ningun Mascota",
        })
    }
}

export const deleteMascota = async (req, res) => {
    try {
        const id = req.params.id;
        const mascota = await Mascota.findByPk(id);
        if (!mascota) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Mascota no encontrada",
            });
        }
        
        if (mascota.FotoURL) {
            const fotoPath = join(__dirname, '../', 'public', mascota.FotoURL);
            fs.unlink(fotoPath, (error) => {});
            await Mascota.destroy({
                where: {
                    ID_Mascota: id
                }
            });
        }
        res.json({
            ok: true,
            status: 200,
            message: "Mascota eliminada correctamente",
            data: mascota
        });

    } catch (error) {
        console.error("Error al eliminar la mascota:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al eliminar la mascota",
            error: error.message
        });
    }
};

export const updateMascota = async (req, res) => {
    const id = req.params.id
    console.log(id)
    console.log(req.body)
    console.log(req.file)
    
    try {
        let fotoURL = null;
        if (req.file) {
          fotoURL = `/uploads/${req.file.filename}`;
        }

        const [filasActualizadas]  = await Mascota.update(
            {
                Nombre: req.body.nombre,
                Raza: req.body.raza,
                FotoURL: fotoURL,
                ID_Cliente: req.body.cedula,
                ID_TipoMascota: req.body.ID_TipoMascota
            },
            {
                where:{
                    ID_Mascota: id
                }
            })
            if (filasActualizadas > 0) {
                res.json({
                    ok: true,
                    status: 200,
                    message: "Se actualizo la Mascota correctamente",
                    data: filasActualizadas
                });
            } else {
                res.status(404).json({
                    ok: false,
                    status: 404,
                    message: "No se encontró la Mascota con el ID proporcionado",
                });
            }
    } catch (error) {
        res.json({
            ok: false,
            status: 500,
            message: "No se actualizo la Mascota",
            error: error.message
        })
    }
}

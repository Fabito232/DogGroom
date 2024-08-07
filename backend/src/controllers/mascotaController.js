
import Mascota from "../models/mascotaModel.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { maxHeaderSize } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createMascota = async (req, res) => {
    let fotoURL = null;
    console.log(req.file)
    console.log(req.body, "bbb")
    if (req.file) {
      fotoURL = `/uploads/${req.file.filename}`;
      console.log("fotourl:", fotoURL)
    }
    
    try {
        const mascota = await Mascota.create({
            Nombre: req.body.nombre,
            Raza: req.body.raza,
            FotoURL: fotoURL,
            ID_Cliente: req.body.cedula,
            ID_TipoMascota: req.body.ID_TipoMascota
        });

        return res.json({
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
        return res.json({
            ok: false,
            status: 400,
            message: "Error al crear el Mascota"
        });
    }
}

export const getMascota = async (req, res) => {
    
    try {
        const id = req.params.id
        console.log(id)
        const mascota = await Mascota.findAll(
            {
                where: {
                    ID_Cliente: id
                }
            }
        )
        if (mascota !== null) {
            return res.json({
                ok: true,
                status: 200,
                message: "Se obtuvo el Mascota correctamente",
                data: mascota
            });
        } else {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontró el Mascota con el ID proporcionado",
            });
        }
    } catch (error) {
        return res.status(500).json({
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
        return res.json({
            ok: true,
            status: 200,
            message: "Se obtuvo todos los Mascota correctamente",
            data: mascota
        })
    } catch (error) {
        return res.json({
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
        }else{
            await Mascota.destroy({
                where: {
                    ID_Mascota: id
                }
            });
        }
        return res.json({
            ok: true,
            status: 200,
            message: "Mascota eliminada correctamente",
            data: mascota
        });

    } catch (error) {
        console.error("Error al eliminar la mascota:", error);
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al eliminar la mascota",
            error: error.message
        });
    }
};

export const updateMascota = async (req, res) => {
    
    try {
        const id = req.params.id
        let fotoURL = null;
        let filasActualizadas;
        if (req.file) {
          fotoURL = `/uploads/${req.file.filename}`;

          filasActualizadas  = await Mascota.update(
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
        }else{
            filasActualizadas  = await Mascota.update(
                {
                    Nombre: req.body.nombre,
                    Raza: req.body.raza,
                    ID_Cliente: req.body.cedula,
                    ID_TipoMascota: req.body.ID_TipoMascota
                },
                {
                    where:{
                        ID_Mascota: id
                    }
                })
        }
         const mascota = await Mascota.findByPk(id)
         console.log(mascota)
            if (filasActualizadas > 0) {
                return res.json({
                    ok: true,
                    status: 200,
                    message: "Se actualizo la Mascota correctamente",
                    data: mascota
                });
            } else {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: "No se encontró la Mascota con el ID proporcionado",
                });
            }
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "No se actualizo la Mascota",
            error: error.message
        })
    }
}

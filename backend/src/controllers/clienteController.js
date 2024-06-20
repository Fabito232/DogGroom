import  Cliente  from "../models/clienteModel.js"
import Mascota from "../models/mascotaModel.js";
import fs from 'fs';
import sequelize from "../database/database.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// export const createCliente = async (req, res) => {

//     try {
//         const existencia = await Cliente.findByPk(req.body.cedula);
//         if(existencia !== null) {
//             return res.json({
//                 ok: false,
//                 status: 400,
//                 message: "Existe un Cliente con esa cedula"
//             });
//         }

//         const cliente = await Cliente.create({
//             Cedula: req.body.cedula,
//             Nombre: req.body.nombre,
//             Telefono: req.body.telefono
//         });
//         return res.json({
//             ok: true,
//             status: 200,
//             message: "Cliente creado correctamente",
//             data: cliente
//         });
//     } catch (error) {
//         return res.json({
//             ok: false,
//             status: 400,
//             message: "Error al crear el cliente"
//         });
//     }
// }

export const createCliente = async (req, res) => {

    const { cedula, nombre, telefono, mascotas } = req.body;
    const files = req.files; 
    const mascotasData = mascotas; 
    let fotosURL = [];
  
    if (files && files.length > 0) {
      fotosURL = files.map(file => `/uploads/${file.filename}`);
    }
    const transaction = await sequelize.transaction(); 
  
    try {
      const existencia = await Cliente.findByPk(cedula, { transaction });
      if (existencia !== null) {
        await transaction.rollback();
        if (fotosURL.length > 0) {
            fotosURL.forEach(fotoURL => {
              const fotoPath = join(__dirname, '../public' + fotoURL);
              fs.unlink(fotoPath, (err) => {
                if (err) console.error("Error al eliminar la imagen:", err);
                console.log('Imagen eliminada');
              });
            });
          }
        return res.json({
          ok: false,
          status: 400,
          message: "Existe un Cliente con esa cedula"
        });
      }
  
      const cliente = await Cliente.create({
        Cedula: cedula,
        Nombre: nombre,
        Telefono: telefono
      }, { transaction });
  
      if (cliente) {
        const mascotasConFotos = mascotasData.map((mascota, index) => ({
          Nombre: mascota.nombre,
          Raza: mascota.raza,
          ID_TipoMascota: mascota.ID_TipoMascota,
          FotoURL: fotosURL[index] || null,
          ID_Cliente: cedula
        }));
  
        await Mascota.bulkCreate(mascotasConFotos, { transaction });
      }
  
      await transaction.commit();
  
      return res.json({
        ok: true,
        status: 200,
        message: "Cliente creado correctamente",
        data: cliente
      });
    } catch (error) {
        console.log(error)
      await transaction.rollback();
  
      if (fotosURL.length > 0) {
        fotosURL.forEach(fotoURL => {
          const fotoPath = join(__dirname, '../public' + fotoURL);
          fs.unlink(fotoPath, (err) => {
            if (err) console.error("Error al eliminar la imagen:", err);
            console.log('Imagen eliminada');
          });
        });
      }

      return res.json({
        ok: false,
        status: 400,
        message: "Error al crear el cliente y la mascota",
        error
      });
    }
  };


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
        const cliente = await Cliente.findAll(
            {
                include:[
                    {
                        model: Mascota
                    }
                ]
        
            })
        return res.json({
            ok: true,
            status: 200,
            message: "Se obtuvo todos los cliente correctamente",
            data: cliente
        })
    } catch (error) {
        console.log(error)
        return res.json({
            ok: false,
            status: 500,
            message: "No se encontro ningun cliente" 
        })
    }
}

// export const deleteCliente = async (req, res) => {
//     try {
//         const id = req.params.id
//         console.log(id)
//         const cliente = await Cliente.destroy({
//             where:{
//                 Cedula: id
//             }
//         })
//         console.log(cliente)
//         return res.json({
//             ok: true,
//             status: 200,
//             message: "Se borro el cliente correctamente",
//             data: cliente
//         })
//     } catch (error) {
//         return res.json({
//             ok: false,
//             status: 500,
//             message: "No se borro el cliente",
//         })
//     }
// }

export const deleteCliente = async (req, res) => {
    try {
        const id = req.params.id

        const mascotas = await Mascota.findAll(
            {
                where: {
                    ID_Cliente: id
                }
            }
        )
        const fotosURL = mascotas.map(mascota => mascota.FotoURL)

        fotosURL.forEach(fotoURL => {
            const fotoPath = join(__dirname, '../public' + fotoURL);
            fs.unlink(fotoPath, (err) => {
              if (err) console.error("Error al eliminar la imagen:", err);
              console.log('Imagen eliminada');
            });
          });

        console.log("URLS",fotosURL)
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

// export const updateCliente = async (req, res) => {
    
//     try {
//         const id = req.params.id
//         const [filasActualizadas]  = await Cliente.update(
//             {
//                 Cedula: req.body.cedula,
//                 Nombre: req.body.nombre,
//                 Telefono: req.body.telefono
//             },
//             {
//                 where:{
//                     Cedula: id
//                 }
//             })
//             if (filasActualizadas > 0) {
//                 return res.json({
//                     ok: true,
//                     status: 200,
//                     message: "Se obtuvo el cliente correctamente",
//                     data: filasActualizadas
//                 });
//             } else {
//                 return res.status(404).json({
//                     ok: false,
//                     status: 404,
//                     message: "No se encontró el cliente con el ID proporcionado",
//                 });
//             }
//     } catch (error) {
//         return res.json({
//             ok: false,
//             status: 500,
//             message: "No se actualizo el cliente",
//             error: error.message
//         })
//     }
// }

export const updateCliente = async (req, res) => {
  console.log(req.body)
    const { cedula, nombre, telefono, mascotas } = req.body;
    const files = req.files;
    const mascotasData = JSON.parse(mascotas);
    let fotosURL = [];
    console.log(files)
    console.log("MD",mascotasData)
    if (files && files.length > 0) {
      fotosURL = files.map(file => `/uploads/${file.filename}`);
    }
  
    const transaction = await sequelize.transaction();
  
    try {
      const clienteExistente = await Cliente.findByPk(req.params.id, {
        include: Mascota,
        transaction,
      });
  
      if (!clienteExistente) {
        await transaction.rollback();
        return res.status(404).json({
          ok: false,
          status: 404,
          message: "No se encontró el cliente con el ID proporcionado",
        });
      }
  
      await Cliente.update(
        {
          Cedula: cedula,
          Nombre: nombre,
          Telefono: telefono,
        },
        {
          where: {
            Cedula: req.params.id,
          },
          transaction,
        }
      );
  
      const mascotasExistentes = await Mascota.findAll({
        where: { ID_Cliente: cedula },
        transaction,
      });
  
      // Actualizar mascotas existentes
      for (let i = 0; i < mascotasData.length; i++) {
        const mascota = mascotasData[i];
        
        const fotoURL = fotosURL[i] || null;
        console.log("fo",fotoURL)
        const mascotaExistente = mascotasExistentes.find(m => m.ID_Mascota === mascota.ID_Mascota);
        
        if (mascotaExistente) {
          await Mascota.update(
            {
              Nombre: mascota.nombre,
              Raza: mascota.raza,
              FotoURL: fotoURL || mascotaExistente.FotoURL,
              ID_Cliente: req.params.id,
              ID_TipoMascota: mascota.ID_TipoMascota
            },
            {
              where: {
                ID_Mascota: mascota.ID_Mascota,
              },
              transaction,
            }
          );
          if (fotoURL) {
            const fotoPath = join(__dirname, '../public' + mascotaExistente.FotoURL);
            fs.unlink(fotoPath, (err) => {
              if (err) console.error("Error al eliminar la imagen:", err);
              console.log('Imagen eliminada');
            });
          }
        } else {
          await Mascota.create(
            {
              Nombre: mascota.nombre,
              Raza: mascota.raza,
              FotoURL: fotoURL || mascotaExistente.FotoURL,
              ID_Cliente: req.params.id,
              ID_TipoMascota: mascota.ID_TipoMascota
            },
            { transaction }
          );
        }
      }
  
      await transaction.commit();
  
      return res.json({
        ok: true,
        status: 200,
        message: "Cliente y mascotas actualizados correctamente",
      });
    } catch (error) {
      await transaction.rollback();
      if (fotosURL.length > 0) {
        for (let fotoURL of fotosURL) {
          const fotoPath = join(__dirname, '../public' + fotoURL);
          fs.unlink(fotoPath, (err) => {
            if (err) console.error("Error al eliminar la imagen:", err);
            console.log('Imagen eliminada');
          });
        }
      }
      return res.json({
        ok: false,
        status: 500,
        message: "Error al actualizar el cliente y las mascotas",
        error: error.message,
      });
    }
  };
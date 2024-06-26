import  Producto  from "../models/productoModel.js"

export const createProducto = async (req, res) => {

    try {
        const producto = await Producto.create({
            Nombre: req.body.nombre,
            Marca: req.body.marca,
            Descripcion: req.body.descripcion,
            Cantidad: req.body.cantidad
        });
        return res.json({
            ok: true,
            status: 200,
            message: "Producto creado correctamente",
            data: producto
        });
    } catch (error) {
        console.error("Error al crear el Producto:", error);
        return res.json({
            ok: false,
            status: 400,
            message: "Error al crear el Producto"
        });
    }
}

export const getProducto = async (req, res) => {
    
    try {
        const id = req.params.id
        const producto = await Producto.findByPk(id);
        if (producto !== null) {
            return res.json({
                ok: true,
                status: 200,
                message: "Se obtuvo el Producto correctamente",
                data: producto
            });
        } else {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontró el Producto con el ID proporcionado",
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al obtener el Producto",
            error: error.message
        });
    }
};


export const getListProducto = async (req, res) => {
    try {
        const producto = await Producto.findAll({});
        if (producto.length !== 0) {
            return res.json({
                ok: true,
                status: 200,
                message: "Se obtuvo todos los Producto correctamente",
                data: producto
            });
        } else {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "No se encontro ningun Producto",
            });
        }
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "No se encontro ningun Producto",
        })
    }
}

export const deleteProducto = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id, "jjj")
        const producto = await Producto.destroy({
            where:{
                ID_Producto: id
            }
        })
        return res.json({
            ok: true,
            status: 200,
            message: "Se borro el Producto correctamente",
            data: producto
        })
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "No se borro el Producto",
        })
    }
}

export const updateProducto = async (req, res) => {
    try {
        const id = req.params.id
        const [filasActualizadas]  = await Producto.update(
            {
                Nombre: req.body.nombre,
                Marca: req.body.marca,
                Descripcion: req.body.descripcion,
                Cantidad: req.body.cantidad
            },
            {
                where:{
                    ID_Producto: id
                }
            })
            if (filasActualizadas > 0) {
                return res.json({
                    ok: true,
                    status: 200,
                    message: "Se obtuvo el Producto correctamente",
                    data: filasActualizadas
                });
            } else {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: "No se encontró el Producto con el ID proporcionado",
                });
            }
    } catch (error) {
        return res.json({
            ok: false,
            status: 500,
            message: "No se actualizo el Producto",
            error: error.message
        })
    }
}
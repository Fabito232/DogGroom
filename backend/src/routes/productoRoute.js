import { Router } from "express";
import { createProducto, getProducto, getListProducto, deleteProducto, updateProducto } from "../controllers/productoController.js";
import { validarDatosProducto } from "../middleware/validators.js";

const router = Router();

router.get('/Productos', getListProducto)
router.get('/Productos/:id', getProducto)
router.post('/Productos',validarDatosProducto, createProducto);
router.delete('/Productos/:id',deleteProducto)
router.put('/Productos/:id',validarDatosProducto, updateProducto )

export default router
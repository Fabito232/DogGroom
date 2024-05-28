import { Router } from "express";
import { createProducto, getProducto, getListProducto, deleteProducto, updateProducto } from "../controllers/productoController.js";
import { validarDatosProducto } from "../middleware/validators.js";

const router = Router();

router.get('/productos', getListProducto);
router.get('/productos/:id', getProducto);
router.post('/productos',validarDatosProducto, createProducto);
router.delete('/productos/:id',deleteProducto)
router.put('/productos/:id',validarDatosProducto, updateProducto);

export default router
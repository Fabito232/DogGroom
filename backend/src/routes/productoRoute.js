import { Router } from "express";
import { createProducto, getProducto, getListProducto, deleteProducto, updateProducto } from "../controllers/productoController.js";

const router = Router();

router.get('/Productos', getListProducto)
router.get('/Productos/:id', getProducto)
router.post('/Productos', createProducto);
router.delete('/Productos/:id',deleteProducto)
router.put('/Productos/:id',updateProducto )

export default router
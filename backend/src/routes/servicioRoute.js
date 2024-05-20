import { Router } from "express";
import { createServicio, getServicio, getListServicio, deleteServicio, updateServicio } from "../controllers/servicioController.js";
import { validarDatosServicio } from "../middleware/validators.js";
const router = Router();

router.get('/Servicios', getListServicio)
router.get('/Servicios/:id', getServicio)
router.post('/Servicios',validarDatosServicio, createServicio);
router.delete('/Servicios/:id',deleteServicio)
router.put('/Servicios/:id',validarDatosServicio, updateServicio )

export default router
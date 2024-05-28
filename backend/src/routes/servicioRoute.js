import { Router } from "express";
import { createServicio, getServicio, getListServicio, deleteServicio, updateServicio } from "../controllers/servicioController.js";
import { validarDatosServicio } from "../middleware/validators.js";
const router = Router();

router.get('/servicios', getListServicio);
router.get('/servicios/:id', getServicio);
router.post('/servicios',validarDatosServicio, createServicio);
router.delete('/servicios/:id',deleteServicio)
router.put('/servicios/:id',validarDatosServicio, updateServicio);

export default router
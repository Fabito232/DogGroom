import { Router } from "express";
import { createCita ,getCita, getListCita, deleteCita, updateCita, obtenerTodasCitas } from "../controllers/citaController.js";
import { validarDatosCita } from "../middleware/validators.js";
const router = Router();

router.get('/citas', getListCita);
router.get('/citas/:id', getCita);
router.get('/todasCitas', obtenerTodasCitas);
router.post('/citas',validarDatosCita, createCita);
router.delete('/citas/:id',deleteCita);
router.put('/citas/:id',validarDatosCita, updateCita );

export default router
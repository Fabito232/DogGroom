import { Router } from "express";
import { createCita, getCita, getListCita, deleteCita, updateCita } from "../controllers/citaController.js";
import { validarDatosCita } from "../middleware/validators.js";
const router = Router();

router.get('/Citas', getListCita);
router.get('/Citas/:id', getCita);
router.post('/Citas',validarDatosCita, createCita);
router.delete('/Citas/:id',deleteCita);
router.put('/Citas/:id',validarDatosCita, updateCita );

export default router
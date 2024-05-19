import { Router } from "express";
import { createCita, getCita, getListCita, deleteCita, updateCita } from "../controllers/citaController.js";


const router = Router();

router.get('/Citas', getListCita);
router.get('/Citas/:id', getCita);
router.post('/Citas', createCita);
router.delete('/Citas/:id',deleteCita);
router.put('/Citas/:id',updateCita );

export default router
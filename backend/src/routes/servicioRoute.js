import { Router } from "express";
import { createServicio, getServicio, getListServicio, deleteServicio, updateServicio } from "../controllers/servicioController.js";

const router = Router();

router.get('/Servicios', getListServicio)
router.get('/Servicios/:id', getServicio)
router.post('/Servicios', createServicio);
router.delete('/Servicios/:id',deleteServicio)
router.put('/Servicios/:id',updateServicio )

export default router
import { Router } from "express";
import { createCitaDetalle, getCitaDetalle, getListCitaDetalle, deleteCitaDetalle, updateCitaDetalle } from "../controllers/citaDetalleController.js";

const router = Router();

router.get('/CitaDetalles', getListCitaDetalle);
router.get('/CitaDetalles/:id', getCitaDetalle);
router.post('/CitaDetalles', createCitaDetalle);
router.delete('/CitaDetalles/:id',deleteCitaDetalle);
router.put('/CitaDetalles/:id',updateCitaDetalle );

export default router
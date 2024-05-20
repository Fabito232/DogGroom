import { Router } from "express";
import { createCitaDetalle, getCitaDetalle, getListCitaDetalle, deleteCitaDetalle, updateCitaDetalle } from "../controllers/citaDetalleController.js";
import { validarDatosCitaD } from "../middleware/validators.js";
const router = Router();

router.get('/CitaDetalles', getListCitaDetalle);
router.get('/CitaDetalles/:id', getCitaDetalle);
router.post('/CitaDetalles',validarDatosCitaD, createCitaDetalle);
router.delete('/CitaDetalles/:id',deleteCitaDetalle);
router.put('/CitaDetalles/:id',validarDatosCitaD, updateCitaDetalle );

export default router
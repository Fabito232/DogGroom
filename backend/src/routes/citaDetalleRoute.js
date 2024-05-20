import { Router } from "express";
import { createCitaDetalle, getCitaDetalle, getListCitaDetalle, deleteCitaDetalle, updateCitaDetalle } from "../controllers/citaDetalleController.js";
import { validarDatosCitaD } from "../middleware/validators.js";
const router = Router();

router.get('/citadetalles', getListCitaDetalle);
router.get('/citadetalles/:id', getCitaDetalle);
router.post('/citadetalles',validarDatosCitaD, createCitaDetalle);
router.delete('/citadetalles/:id',deleteCitaDetalle);
router.put('/citadetalles/:id',validarDatosCitaD, updateCitaDetalle );

export default router
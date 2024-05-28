import { Router } from "express";
import { createTipoMascota, getTipoMascota, getListTipoMascota, deleteTipoMascota, updateTipoMascota } from "../controllers/TipoMascotaController.js";
import { validarDatosTipoMa } from "../middleware/validators.js";
const router = Router();

router.get('/tipoMascotas', getListTipoMascota);
router.get('/tipoMascotas/:id', getTipoMascota);
router.post('/tipoMascotas',validarDatosTipoMa, createTipoMascota);
router.delete('/tipoMascotas/:id',deleteTipoMascota);
router.put('/tipoMascotas/:id', validarDatosTipoMa, updateTipoMascota);

export default router
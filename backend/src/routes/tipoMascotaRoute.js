import { Router } from "express";
import { createTipoMascota, getTipoMascota, getListTipoMascota, deleteTipoMascota, updateTipoMascota } from "../controllers/TipoMascotaController.js";
import { validarDatosTipoMa } from "../middleware/validators.js";
const router = Router();

router.get('/TipoMascotas', getListTipoMascota)
router.get('/TipoMascotas/:id', getTipoMascota)
router.post('/TipoMascotas',validarDatosTipoMa, createTipoMascota);
router.delete('/TipoMascotas/:id',deleteTipoMascota)
router.put('/TipoMascotas/:id', validarDatosTipoMa, updateTipoMascota )

export default router
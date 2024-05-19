import { Router } from "express";
import { createTipoMascota, getTipoMascota, getListTipoMascota, deleteTipoMascota, updateTipoMascota } from "../controllers/TipoMascotaController.js";

const router = Router();

router.get('/TipoMascotas', getListTipoMascota)
router.get('/TipoMascotas/:id', getTipoMascota)
router.post('/TipoMascotas', createTipoMascota);
router.delete('/TipoMascotas/:id',deleteTipoMascota)
router.put('/TipoMascotas/:id',updateTipoMascota )

export default router
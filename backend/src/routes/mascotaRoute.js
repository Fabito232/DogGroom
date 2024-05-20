import { Router } from "express";
import { createMascota, getMascota, getListMascota, deleteMascota, updateMascota } from "../controllers/mascotaController.js";
import { validarDatosMascota } from "../middleware/validators.js";
const router = Router();

router.get('/mascotas', getListMascota)
router.get('/mascotas/:id', getMascota)
router.post('/mascotas',validarDatosMascota, createMascota);
router.delete('/mascotas/:id',deleteMascota)
router.put('/mascotas/:id',validarDatosMascota, updateMascota )

export default router
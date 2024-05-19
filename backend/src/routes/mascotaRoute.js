import { Router } from "express";
import { createMascota, getMascota, getListMascota, deleteMascota, updateMascota } from "../controllers/mascotaController.js";

const router = Router();

router.get('/mascotas', getListMascota)
router.get('/mascotas/:id', getMascota)
router.post('/mascotas', createMascota);
router.delete('/mascotas/:id',deleteMascota)
router.put('/mascotas/:id',updateMascota )

export default router
import { Router } from "express";
import { resumenFinanzas, resumenControlAnual } from "../controllers/finanzasController.js";
import { validarFinanzas } from "../middleware/validators.js";

const router = Router();

router.get('/resumenControlAnual', resumenControlAnual);
router.post('/resumenFinanzas',validarFinanzas, resumenFinanzas);

export default router
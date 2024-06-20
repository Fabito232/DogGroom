import { Router } from "express";
import { createGasto, deleteGasto, getGasto, getListGasto, updateGasto, resumenFinanzas, resumenControlAnual } from "../controllers/finanzasController.js";
import { validarFinanzas } from "../middleware/validators.js";

const router = Router();

router.get('/gastos', getListGasto);
router.get('/gasto/:id', getGasto);
router.post('/gasto', createGasto);
router.delete('/gasto/:id', deleteGasto);
router.put('/gasto/:id', updateGasto);
router.get('/resumenControlAnual', resumenControlAnual);
router.post('/resumenFinanzas',validarFinanzas, resumenFinanzas);

export default router
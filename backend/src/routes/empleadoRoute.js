import { Router } from "express";
import { createEmpleado, loginEmpleado } from "../controllers/empleadoController.js";

const router = Router();

router.post('/Empleados', createEmpleado);
router.post('/login', loginEmpleado);

export default router
import { Router } from "express";
import { createEmpleado, loginEmpleado } from "../controllers/empleadoController.js";
import { renovarToken } from "../middleware/auth.js";
import { validarDatosEmpleado } from "../middleware/validators.js";
const router = Router();

router.post('/Empleados',validarDatosEmpleado, createEmpleado);
router.post('/login', loginEmpleado);
router.post('/renovar-token', renovarToken);

export default router
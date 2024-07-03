import { Router } from "express";
import { createEmpleado, loginEmpleado } from "../controllers/empleadoController.js";
import { renovarToken } from "../middleware/auth.js";
import { validarDatosEmpleado } from "../middleware/validators.js";
const router = Router();
import { verificarToken } from "../middleware/auth.js";
router.post('/login', loginEmpleado);
router.use(verificarToken);
router.post('/empleados',validarDatosEmpleado, createEmpleado);
router.post('/renovar-token', renovarToken);

export default router
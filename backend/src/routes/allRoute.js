import { Router } from "express";
import clienteRoutes from './clienteRoute.js';
import mascotaRoutes from "./mascotaRoute.js";
import citasRoutes from "./citaRoute.js"
import servicioRoutes from "./servicioRoute.js";
import citasDetalleRoutes from "./citaDetalleRoute.js";
import productoRoutes from "./productoRoute.js";
import empleadoRoutes from "./empleadoRoute.js";
import tipoMascotaRotes from "./tipoMascotaRoute.js";
import finanzasRouter from './finanzasRoute.js';
import { verificarToken } from "../middleware/auth.js";
const router = Router();

router.use('/api/', empleadoRoutes);
router.use(verificarToken);
router.use('/api/', clienteRoutes);
router.use('/api/', mascotaRoutes);
router.use('/api/', citasRoutes);
router.use('/api/', servicioRoutes);
router.use('/api/', citasDetalleRoutes);
router.use('/api/', productoRoutes);
router.use('/api/', tipoMascotaRotes);
router.use('/api/', finanzasRouter);

export default router;
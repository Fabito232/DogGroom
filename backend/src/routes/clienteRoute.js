import { Router } from "express";
import { createCliente, getCliente, getListCliente, deleteCliente, updateCliente } from "../controllers/clienteController.js";
import { validarDatosCliente } from "../middleware/validators.js";

const router = Router();
router.get('/clientes', getListCliente);
router.get('/clientes/:id', getCliente);
router.post('/clientes',validarDatosCliente, createCliente);
router.delete('/clientes/:id',deleteCliente)
router.put('/clientes/:id',validarDatosCliente, updateCliente);

export default router
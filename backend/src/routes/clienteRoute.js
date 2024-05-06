import { Router } from "express";
import { createCliente, getCliente, getListCliente, deleteCliente, updateCliente } from "../controllers/clienteController.js";


const router = Router();

router.get('/clientes', getListCliente)
router.get('/clientes/:id', getCliente)
router.post('/clientes',createCliente);
router.delete('/clientes/:id',deleteCliente)
router.put('/clientes/:id',updateCliente )

export default router
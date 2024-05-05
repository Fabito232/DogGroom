import { Router } from "express";
import { crearCliente } from "../controllers/clienteController.js";

const router = Router();

router.get('/clientes', (req, res) =>{
    res.send('obteniendo clientes')
})

router.get('/clientes/:id', (req, res) =>{
    const { id } = req.params
    res.send('obteniendo clientes' + id)
})
router.post('/clientes',crearCliente);

router.delete('/clientes/:id', (req, res) =>{
    res.send('Eliminando cliente')
})

router.put('/clientes/:id', (req, res) =>{
    const { id } = req.params
    res.send('Actualizando cliente ' + id)
})

export default router
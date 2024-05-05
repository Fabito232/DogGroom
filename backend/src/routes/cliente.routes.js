import { Router } from "express";

const router = Router();

router.get('/clientes', (req, res) =>{
    res.send('obteniendo clientes')
})

router.get('/clientes/:id', (req, res) =>{
    const { id } = req.params
    res.send('obteniendo clientes' + id)
})

router.post('/clientes', (req, res) =>{
    res.send('Creando un cliente')
})

router.delete('/clientes/:id', (req, res) =>{
    res.send('Eliminando cliente')
})

router.put('/clientes/:id', (req, res) =>{
    const { id } = req.params
    res.send('Actualizando cliente ' + id)
})

export default router
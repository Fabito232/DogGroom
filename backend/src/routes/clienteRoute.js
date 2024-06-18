import { Router } from "express";
import { createCliente, getCliente, getListCliente, deleteCliente, updateCliente, createClienteConMascota } from "../controllers/clienteController.js";
import { validarDatosCliente } from "../middleware/validators.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.diskStorage({
    destination: join(__dirname, '../public/uploads'),
    filename(req, file, cb) {
      cb(null, new Date().getTime() + path.extname(file.originalname));
    },
  });
const upload = multer({ storage }).array('images',10);
const router = Router();
router.get('/clientes', getListCliente);
router.get('/clientes/:id', getCliente);
router.post('/clientes',validarDatosCliente, createCliente);
router.post('/cliente',upload, createClienteConMascota);
router.delete('/clientes/:id',deleteCliente)
router.put('/clientes/:id',validarDatosCliente, updateCliente);

export default router
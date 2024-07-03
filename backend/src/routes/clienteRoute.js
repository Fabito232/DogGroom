import { Router } from "express";
import { createCliente, getCliente, getListCliente, deleteCliente, updateClienteConMascota, updateCliente } from "../controllers/clienteController.js";
import { validarDatosCliente } from "../middleware/validators.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: join(__dirname, '../public/uploads'),
    filename(req, file, cb) {
      cb(null, new Date().getTime() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
  // Aceptar archivos de imagen solamente
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen!'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Límite de tamaño de archivo de 5MB
}).array('images', 10);

const router = Router();

router.get('/clientes', getListCliente);
router.get('/clientes/:id', getCliente);
router.post('/clientes', upload, validarDatosCliente, createCliente);
router.delete('/clientes/:id', deleteCliente);
router.put('/clientes/:id', updateCliente);
router.put('/clienteConMascota/:id', upload, validarDatosCliente, updateClienteConMascota);

export default router;

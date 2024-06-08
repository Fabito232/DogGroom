import { Router } from "express";
import { createCita ,getCita, getListCita, deleteCita, updateCita } from "../controllers/citaController.js";
import { validarDatosCita } from "../middleware/validators.js";
const router = Router();
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';
import path from 'path'
import { createReadStream } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.diskStorage({
    destination: join(__dirname, '../public/uploads'),
    filename(req, file, cb) {
      cb(null, new Date().getTime() + path.extname(file.originalname));
    },
  });

const upload = multer({ storage }).single('image');
router.get('/citas', getListCita);
router.get('/citas/:id', getCita);
router.post('/citas',validarDatosCita, createCita);
router.delete('/citas/:id',deleteCita);

router.put('/citas/:id',validarDatosCita, updateCita );



export default router
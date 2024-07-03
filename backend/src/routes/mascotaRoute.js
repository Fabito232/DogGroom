import { Router } from "express";
import { createMascota, getMascota, getListMascota, deleteMascota, updateMascota } from "../controllers/mascotaController.js";
import { validarDatosMascota } from "../middleware/validators.js";
const router = Router();
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
  storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 } 
}).single('image');

router.get('/mascotas', getListMascota);
router.get('/mascotas/:id', getMascota);
router.post('/mascotas',upload,validarDatosMascota, createMascota);
router.delete('/mascotas/:id',deleteMascota);
router.put('/mascotas/:id',upload,validarDatosMascota, updateMascota);

export default router
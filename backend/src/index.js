import express from "express";
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path'
import { DB_PORT } from "./config.js";
import sequelize from "./database/database.js";
import modelSync from "./database/modelSync.js";
import clienteRoutes from './routes/clienteRoute.js';
import mascotaRoutes from "./routes/mascotaRoute.js";
import citasRoutes from "./routes/citaRoute.js"
import servicioRoutes from "./routes/servicioRoute.js";
import citasDetalleRoutes from "./routes/citaDetalleRoute.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: join(__dirname, 'public/uploads'), 
  filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname)); 
  },
});
app.use(multer({ storage }).single('image'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads',express.static(join(__dirname, 'public/uploads')));

modelSync()

app.use('/api/', clienteRoutes);
app.use('/api/', mascotaRoutes);
app.use('/api/', citasRoutes);
app.use('/api/', servicioRoutes);
app.use('/api/', citasDetalleRoutes);

app.listen(DB_PORT)
console.log("Server on port:", DB_PORT)



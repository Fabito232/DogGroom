import express from "express";
import multer from 'multer';
import morgan from "morgan";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path'
import { DB_PORT } from "./config.js";
import sequelize from "./database/database.js";
import modelSync from "./database/modelSync.js";
import allRouter from "./routes/allRoute.js";

const app = express();
app.use(morgan('dev'));
app.use(cors());
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
app.use(allRouter);
app.listen(DB_PORT)
console.log("Server on port:", DB_PORT)



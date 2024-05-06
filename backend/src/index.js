import express from "express";
import { DB_PORT } from "./config.js";
import clienteRoutes from './routes/clienteRoute.js'
import sequelize from "./database.js";
import Cliente from "./models/clienteModel.js";
import Mascota from "./models/mascotaModel.js";

const app = express();
app.use(express.json());
app.use('/api/', clienteRoutes);


app.listen(DB_PORT)
console.log("Server on port:", DB_PORT)

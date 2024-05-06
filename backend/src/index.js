import express from "express";
import { DB_PORT } from "./config.js";
import sequelize from "./database/database.js";
import modelSync from "./database/modelSync.js"
import clienteRoutes from './routes/clienteRoute.js'

modelSync()
const app = express();
app.use(express.json());
app.use('/api/', clienteRoutes);
modelSync()

app.listen(DB_PORT)
console.log("Server on port:", DB_PORT)



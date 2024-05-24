import sequelize from "../database/database.js";
import { DataTypes, Model } from "sequelize";

class Empleado extends Model {}

Empleado.init({
    ID_Empleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Contrasena: {
        type: DataTypes.STRING,
        allowNull: false  
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false
});

export default Empleado;

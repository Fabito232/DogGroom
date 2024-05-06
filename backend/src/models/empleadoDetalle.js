import sequelize from "../database/database.js";
import { DataTypes, Model } from "sequelize";

class Empleado extends Model {}

Empleado.init({
    ID_Empleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false  
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false
});

export default Empleado;

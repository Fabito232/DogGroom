import sequelize from "../database/database.js";
import { DataTypes, Model } from "sequelize";

class Gasto extends Model {}

Gasto.init({
    ID_Gasto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Monto: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

export default Gasto;

import sequelize from "../database/database.js";
import { DataTypes, Model } from "sequelize";
import Cliente from "./clienteModel.js";

class Cita extends Model {}

Cita.init({
    ID_Cita: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    FechaYHora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    MontoTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
Cliente.hasMany(Cita, {foreignKey: 'ID_Cliente'});

export default Cita;

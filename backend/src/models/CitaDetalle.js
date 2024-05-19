import sequelize from "../database/database.js";
import { DataTypes, Model } from "sequelize";
import Cita from "./citaModel.js";
import Servicio from "./servicioModel.js";

class CitaDetalle extends Model {}

CitaDetalle.init({
    ID_CitaDetalle: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    MontoAdicional: {
        type: DataTypes.DECIMAL,
        allowNull: true
    }
}, {
    sequelize,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
Cita.hasMany(CitaDetalle, {foreignKey: 'ID_Cita'});
Servicio.hasMany(CitaDetalle, {foreignKey: 'ID_Servicio'});

export default CitaDetalle;

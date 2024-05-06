import sequelize from "../database/database.js";
import { DataTypes, Model } from "sequelize";
import TipoMascota from "./tipoMascota.js";

class Servicio extends Model {}

Servicio.init({
    ID_Servicio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Precio: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});
TipoMascota.hasMany(Servicio, {foreignKey: 'ID_TipoMascota'});


export default Servicio;

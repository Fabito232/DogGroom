import sequelize from "../database/database.js";
import { DataTypes, Model } from "sequelize";

class TipoMascota extends Model {}

TipoMascota.init({
    ID_TipoMascota: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

export default TipoMascota;

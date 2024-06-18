import sequelize from "../database/database.js";
import { DataTypes, Model } from "sequelize";
class Cliente extends Model {}

Cliente.init({
    Cedula: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Telefono: {
        type: DataTypes.STRING,
        allowNull: false  
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false,

});

export default Cliente;

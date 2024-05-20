import sequelize from "../database/database.js";
import { DataTypes, Model } from "sequelize";

class Producto extends Model {}

Producto.init({
    ID_Producto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    Marca: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false  
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false
});

export default Producto;

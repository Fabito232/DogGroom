import sequelize from "../database.js";
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
    timestamps: false
});

(async () => {
    try {
        await Cliente.sync();
        console.log("Tabla Cliente sincronizada correctamente.");
    } catch (error) {
        console.error("Error al sincronizar la tabla Cliente:", error);
    }
})();

export default Cliente;

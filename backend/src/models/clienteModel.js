import sequelize from "../database.js";
import { DataTypes, Model } from "sequelize";

class Cliente extends Model {}

Cliente.init({
    Cedula: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
});

(async () => {
    try {
        await Cliente.sync();
        console.log("Tabla Cliente sincronizada correctamente.");
    } catch (error) {
        console.error("Error al sincronizar la tabla Cliente:", error);
    }
})();

// (async () => {
//     try {
//         await sequelize.drop();
//         console.log('All tables dropped!');
//     } catch (error) {
//         console.error("Error al sincronizar la tabla Cliente:", error);
//     }
// })();

export default Cliente;

import sequelize from "../database.js";
import { DataTypes, Model } from "sequelize";
import Cliente from "./clienteModel.js";
import TipoMascota from "./tipoMascota.js";

class Mascota extends Model {}

Mascota.init({
    ID_Mascota: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Raza: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    FotoURL: {
        type: DataTypes.STRING,
        allowNull: false  
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
});

Cliente.hasMany(Mascota, { foreignKey: 'ID_Cliente' });
TipoMascota.hasMany(Mascota, { foreignKey: 'ID_TipoMascota'});

(async () => {
    try {
        await Mascota.sync();
        console.log("Tabla Mascota sincronizada correctamente.");
    } catch (error) {
        console.error("Error al sincronizar la tabla Mascota:", error);
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

export default Mascota;

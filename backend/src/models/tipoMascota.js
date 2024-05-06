import sequelize from "../database.js";
import { DataTypes, Model } from "sequelize";

class TipoMascota extends Model {}

TipoMascota.init({
    ID_TipoMascotaa: {
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

(async () => {
    try {
        await TipoMascota.sync();
        console.log("Tabla TipoMascota sincronizada correctamente.");
    } catch (error) {
        console.error("Error al sincronizar la tabla TipoMascota:", error);
    }
})();
export default TipoMascota;

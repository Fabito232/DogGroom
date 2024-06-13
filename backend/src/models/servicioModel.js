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
    },
    ID_TipoMascota: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: TipoMascota,
            key: 'ID_TipoMascota'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

//TipoMascota.hasMany(Servicio, {foreignKey: 'ID_TipoMascota'});
Servicio.belongsTo(TipoMascota, { foreignKey: 'ID_TipoMascota', as: 'TipoMascota' });

export default Servicio;

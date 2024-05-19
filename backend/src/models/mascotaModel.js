import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database.js";
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
        allowNull: true  
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
});

Cliente.hasMany(Mascota, { foreignKey: 'ID_Cliente' },);
Mascota.belongsTo(Cliente, {foreignKey: 'ID_Mascota' })
TipoMascota.hasMany(Mascota, { foreignKey: 'ID_TipoMascota'});

export default Mascota;

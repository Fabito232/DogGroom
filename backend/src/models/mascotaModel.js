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
    },
    ID_Cliente: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Cliente,
            key: 'Cedula'
        }
    },
    ID_TipoMascota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoMascota,
            key: 'ID_TipoMascota'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
});

Cliente.hasMany(Mascota, { foreignKey: 'ID_Cliente' },);
TipoMascota.hasMany(Mascota, { foreignKey: 'ID_TipoMascota'});
Mascota.belongsTo(Cliente, {foreignKey: 'ID_Cliente' })
Mascota.belongsTo(TipoMascota, { foreignKey: 'ID_TipoMascota'})

export default Mascota;

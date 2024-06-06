import sequelize from "../database/database.js";
import { DataTypes, Model } from "sequelize";
import Cliente from "./clienteModel.js";

class Cita extends Model {}

Cita.init({
    ID_Cita: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    FechaYHora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    MontoTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    ID_Cliente: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: Cliente,
            key: 'Cedula'
        }
    }
}, {
    sequelize,
    freezeTableName: true,

});

Cliente.hasMany(Cita, {foreignKey: 'ID_Cliente'});
Cita.belongsTo(Cliente,{foreignKey: 'ID_Cliente'});

export default Cita;

import sequelize from "../database/database.js";
import { DataTypes, Model } from "sequelize";
import Cliente from "./clienteModel.js";
import Servicio from "./servicioModel.js";

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
    MontoAdicional: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    MontoTotal: {
        type: DataTypes.DECIMAL,
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
    ID_Servicio: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Servicio,
            key: 'ID_Servicio'
        },
        onDelete: 'SET NULL',
    },
    
}, {
    sequelize,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

Cliente.hasMany(Cita, {foreignKey: 'ID_Cliente', as: 'cliente'});
Cita.belongsTo(Cliente,{foreignKey: 'ID_Cliente'});

Servicio.hasMany(Cita, {foreignKey: 'ID_Servicio'});
Cita.belongsTo(Servicio,{foreignKey: 'ID_Servicio',onDelete: 'SET NULL'});

export default Cita;

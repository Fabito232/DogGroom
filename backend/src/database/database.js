import { Sequelize } from "sequelize"
import { DB_DATABASE, DB_HOST, DB_USER, DB_PASSWORD, DB_DIALECT } from "../config.js";

//const sequelize = new Sequelize('postgres://user:123456789@localhost/doggroom') URL
const sequelize = new Sequelize(DB_DATABASE,DB_USER,DB_PASSWORD,{
    host: DB_HOST,
    dialect: DB_DIALECT
})

async () => {
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
}

export default sequelize
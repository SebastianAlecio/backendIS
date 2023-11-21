import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    database: 'PJ',
    username: 'admin123',
    password: 'Gucci.56964',
    host: 'pjcloud.database.windows.net',
    dialect: 'mssql', // Cambiado a MS SQL Server
  })

export default sequelize;
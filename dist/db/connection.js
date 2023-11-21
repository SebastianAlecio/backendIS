"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    database: 'PJ',
    username: 'admin123',
    password: 'Gucci.56964',
    host: 'pjcloud.database.windows.net',
    dialect: 'mssql', // Cambiado a MS SQL Server
});
exports.default = sequelize;

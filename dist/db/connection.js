"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('pj', 'root', '1234', {
    host: 'localhost',
    port: 8080,
    dialect: 'mysql'
});
exports.default = sequelize;

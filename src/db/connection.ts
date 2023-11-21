import { Sequelize } from "sequelize";

const sequelize = new Sequelize('pj', 'root', '1234', {
    host:'localhost',
    port: 8080,
    dialect: 'mysql'
})

export default sequelize;
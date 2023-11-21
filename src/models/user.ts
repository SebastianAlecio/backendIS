import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true    
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    },
    gender: {
        type: DataTypes.CHAR
    }
}, )
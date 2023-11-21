import { DataTypes, INTEGER } from 'sequelize';
import sequelize from '../db/connection';

export const Recipe = sequelize.define('recipes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    img: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    ingredients: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },

}, )
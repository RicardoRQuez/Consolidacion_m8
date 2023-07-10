import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Bootcamp = await sequelize.define(
    'bootcamps', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 5,
            max: 10
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        timestamps: true
    });

export default Bootcamp;
 

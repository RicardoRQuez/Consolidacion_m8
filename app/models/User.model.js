import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const User = await sequelize.define(
    'users', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: {
                msg: "Por favor ingrese Email valido"
            },
        },

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, Infinity],
                msg: "La contraseña debe tener al menos 8 caracteres"
            }
        }
    }
},
    {
        timestamps: true
    });

    export default User;




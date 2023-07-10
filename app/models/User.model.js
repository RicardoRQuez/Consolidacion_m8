import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

export const User = await sequelize.define(
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
},
    {
        timestamps: true
    });
/* export const asociateUser = (bootcampId, userId) => {
    const sql = `
          INSERT INTO "User_Bootcamp" 
          VALUES (NOW(), NOW(), '${bootcampId}', '${userId}');
        `
    return sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT
    })

}; */



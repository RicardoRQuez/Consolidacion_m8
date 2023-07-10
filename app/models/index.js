import express from "express";
import sequelize from '../config/db.config.js';
import userRoutes from '../routes/user.routes.js';
import bootcampRoutes from '../routes/bootcamp.routes.js';
import Bootcamp from "./Bootcamp.model.js";
import { User } from "./User.model.js";

const app = express();

app.use(express.json());

//Relacion muchos a muchos (N:M) - User - Bootcamp

User.belongsToMany(Bootcamp, { 
    through: "User_Bootcamp", 
    foreignKey: "userId" });
    
Bootcamp.belongsToMany(User, { 
    through: "User_Bootcamp", 
    foreignKey: "bootcampId" });



//definir ruta de usuarios
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bootcamp", bootcampRoutes);


export default app;
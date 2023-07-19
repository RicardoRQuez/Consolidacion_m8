import express, { application } from "express";
import cors from "cors";
import morgan from "morgan";
import sequelize from './config/db.config.js';
import Bootcamp from "./models/Bootcamp.model.js";
import User from "./models/User.model.js";
import { create } from "express-handlebars";
import { config } from "dotenv";
config();
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//importaciones de rutas
import viewsRoutes from "./routes/views.routes.js"
import userRoutes from './routes/user.routes.js';
import bootcampRoutes from './routes/bootcamp.routes.js';


const app = express();

//configuracion de handlebars
const hbs = create({
    partialsDir: [path.resolve(__dirname, "./views/partials")],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//middlewares generales
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));


//Relacion muchos a muchos (N:M) - User - Bootcamp

User.belongsToMany(Bootcamp, { 
    through: "User_Bootcamp", 
    foreignKey: "userId" });
    
Bootcamp.belongsToMany(User, { 
    through: "User_Bootcamp", 
    foreignKey: "bootcampId" });

   


//definir ruta de endpoints

/* app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bootcamp", bootcampRoutes); */

app.use("/api", userRoutes, bootcampRoutes);






//rutas de vistas
app.use("/", viewsRoutes);



/*
//Registro de una nuevo usuario, acceso público
app.post("/api/signup", (req, res) => {
    //logica registro
});
//Inicio de sesión en la API, acceso público
app.post("/api/signin", (req, res) => {
    //logica inicio de sesión
}); 
//Inicio de sesión en la API, acceso público
app.get("/api/user/:id", (req,res) => {

});
 Lista información de todos los usuarios y los Bootcamp
registrados, acceso por medio de token, previamente iniciado 
sesión  
app.get("/api/user/", (req, res) => {

});
/* Actualiza los campos de firstName y lastName de un usuario 
según su id, acceso por medio de token, previamente iniciado 
sesión 
app.put("/api/user/:id", (req, res) => {

});
//Elimina el usuario según id, acceso por medio de token, 
//previamente iniciado sesión 
app.delete("/api/user/:id", (req, res) => {

}),
/* Crea un bootcamp, acceso por medio de token, previamente 
iniciado sesión
 
app.post("/api/bootcamp", (req, res) => {

});

/* Agrega usuarios previamente registrados al bootcamp, acceso 
por medio de token, previamente iniciado sesión
 
app.post("/api/bootcamp/adduser", (req, res) => {

});

/* Obtiene información de un bootcamp según id, y muestra los 
usuarios registrados en el bootcamp. Acceso por medio de 
token, previamente iniciado sesión 
app.get("/api/bootcamp/:id", (req, res) => {

});

//Lista todos los bootcamp, acceso público
app.get("/api/bootcamp", (req, res) => {

});

*/


export default app;
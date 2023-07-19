import express from "express";
import {
    bulkCreateUser, 
    createUser, 
    findUserById, 
    findAll, 
    updateUserById, 
    deleteUserById,
    login
} from "../controllers/user.controller.js"
import { emitToken } from "../middleware/verifySingUp.js"
import { verifyToken } from "../middleware/auth.js"
const router= express.Router();


router.post("/signin", emitToken, login); //Registro de una nuevo usuario, acceso público
router.post("/signup", createUser); //Inicio de sesión en la API, acceso público
router.get("/user/:id", findUserById, verifyToken); //Lista información del usuario según id, acceso por medio de token, previamente iniciado sesión
router.get("/user", findAll, verifyToken); //Lista información de todos los usuarios y los Bootcamp registrados, acceso por medio de token, previamente iniciado sesión.
router.put("/user/:id", updateUserById, verifyToken); //Actualiza los campos de firstName y lastName de un usuario según su id, acceso por medio de token, previamente iniciado sesión
router.delete("/user/:id", deleteUserById, verifyToken); //Elimina el usuario según id, acceso por medio de token, previamente iniciado sesión

export default router;
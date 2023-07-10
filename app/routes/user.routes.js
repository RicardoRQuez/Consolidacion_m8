import express from "express";
import {
    bulkCreateUser, 
    createUser, 
    findUserById, 
    findAll, 
    updateUserById, 
    deleteUserById
} from "../controllers/user.controller.js"

const router= express.Router();

router.post("/bulk", bulkCreateUser); //Crear y guardar mas de un usuario.
router.post("/", createUser); //Crear y guardar usuarios
router.get("/:id", findUserById); //Obtener los Bootcamp de un usuario
router.get("/", findAll); //Obtener todos los Usuarios incluyendo, los Bootcamp
router.put("/:id", updateUserById); //Actualizar usuario por Id
router.delete("/:id", deleteUserById); //Eliminar un usuario por Id

export default router;
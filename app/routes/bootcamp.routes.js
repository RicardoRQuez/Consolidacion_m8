import express from "express";
import {
    createBootcamp, 
    bulkCreateBootcamp, 
    addUser, 
    findById, 
    findAll  
} from "../controllers/bootcamp.controller.js"

const router= express.Router();

router.post("/", createBootcamp); //Crear y guardar un nuevo Bootcamp.
router.post("/bulk", bulkCreateBootcamp); //Crear y guardar mas de un usuario.
router.post("/asociar", addUser); //Agregar un Usuario al Bootcamp.
router.get("/:id", findById); //Obtener los Bootcamp por id.
router.get("/", findAll); //Obtener todos los Usuarios incluyendo los Bootcamp.

export default router;
import express from "express";
import {
    createBootcamp, 
    bulkCreateBootcamp, 
    addUser, 
    findById, 
    findAll,
    findAllBootcamp 
} from "../controllers/bootcamp.controller.js"
import { verifyToken } from "../middleware/auth.js"

const router= express.Router();

/* router.post("/", createBootcamp); //Crear y guardar un nuevo Bootcamp.
router.post("/bulk", bulkCreateBootcamp); //Crear y guardar mas de un usuario.
router.post("/asociar", addUser); //Agregar un Usuario al Bootcamp.
router.get("/:id", findById); //Obtener los Bootcamp por id.
router.get("/", findAll); //Obtener todos los bootcamp incluyendo los usuarios. */

router.post("/bootcamp", createBootcamp, verifyToken); //Crea un bootcamp, acceso por medio de token, previamente iniciado sesión
router.post("/bootcamp/adduser", addUser, verifyToken); //Agrega usuarios previamente registrados al bootcamp, acceso por medio de token, previamente iniciado sesión
router.get("/bootcamp/:id", findById, verifyToken); //Obtiene información de un bootcamp según id, y muestra los usuarios registrados en el bootcamp. Acceso por medio de token, previamente iniciado sesión
router.get("/bootcamp", findAll, verifyToken); //Lista todos los bootcamp, incluye usuarios.
router.get("/allBootcamp", findAllBootcamp);//Lista todos los bootcamp, acceso público.
export default router;
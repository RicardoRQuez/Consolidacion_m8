import { Router } from "express";
import { verifyToken, validarAdmin } from "../middleware/index.js";
import { emitToken } from "../middleware/index.js";
import Bootcamp from "../models/Bootcamp.model.js";
import User from "../models/User.model.js";

const router = Router();


//Registro de una nuevo usuario, acceso público
router.get("/api/signup", (req, res) => {
    res.render("signup");
});
//Inicio de sesión en la API, acceso público
router.get("/api/signin", (req, res) => {
    res.render("signin"); // Renderizar la vista del formulario de inicio de sesión
});
//Lista todos los bootcamp, acceso público
router.get(["/api/bootcamps", "/"], async (req, res) => {
    try {
        const bootcamp = await Bootcamp.findAll({
            raw: true,
        });

        res.render("bootcamps", { bootcamp });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los bootcamps");
    }
});
//Listar informacion de todos los usuarios, privado
router.get("/api/administracion", verifyToken, async (req, res) => {
    res.render("administracion");
});

router.get("/api/administracion/users", verifyToken, async (req, res) => {
    try {

        let usuarios = await User.findAll({
            include: Bootcamp,
        });
        usuarios = usuarios.map(r => {
             
            r.dataValues.bootcamps =  r.dataValues.bootcamps.map(r => r.dataValues)


            return r.dataValues

        })
        res.render("users", { usuarios });
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al obtener los usuarios y bootcamps");
    }
});
//boton bootcamp del usuario
router.get("/api/administracion/user/bootcamps", verifyToken, async (req, res) => {
    try {
        const Bootcamp = await Bootcamp.findAll({
            include: usuarios,
            raw: true,
        });
        res.render("userBootcamps", { Bootcamp });
    } catch (error) {
        res.status(500).send("Error al obtener los bootcamps del usuario");
    }
});

//boton editar del usuario
router.get("/api/administracion/users/editar/:userId", verifyToken, async (req, res) => {
    const userId = req.params.userId;

    try {
        const editarUsuario = await User.findByPk(userId, {
            raw: true,
        });
        console.log("usuariooo", editarUsuario)
        if (!editarUsuario) { 
            return res.status(404).send("Usuario no encontrado");
        }

        res.render("editUser", { editarUsuario });
    } catch (error) {
        res.status(500).send("Error al obtener el usuario");
    }
});



router.get("/api/administracion/bootcamps", verifyToken, async (req, res) => {
    try {
        const bootcamps = await Bootcamp.findAll({
            include: User,
            raw: true,
        });
        res.render("bootcampsAdmin", { bootcamps });
    } catch (error) {
        res.status(500).send("Error al obtener los bootcamps y usuarios");
    }
});
//Crear Bootcamp
router.get("/api/administracion/bootcamps/new-bootcamp", verifyToken, (req, res) => {
    res.render("crearBootcamp"); 
});
//Agregar usuario a bootcamp
router.get("/api/administracion/bootcamps/:bootcampId", verifyToken, async (req, res) => {
    const bootcampId = req.params.bootcampId;
    
    try {
        const bootcamp = await Bootcamp.findByPk(bootcampId, {
            raw: true,
        });
        console.log("usuariooo", bootcamp)
        if (!bootcamp) { 
            return res.status(404).send("Bootcamp no encontrado");
        }

        res.render("bootcampUser", { bootcamp });
    } catch (error) {
        res.status(500).send("Error al obtener el bootcamp");
    }
});
export default router;

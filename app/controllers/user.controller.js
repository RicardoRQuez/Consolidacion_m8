import  User from '../models/User.model.js';
import Bootcamp from '../models/Bootcamp.model.js';

// Crear y guardar usuarios llamado createUser.
export const createUser = async (req, res) => {
    try {

        let { firstName, lastName, email, password} = req.body;
        if(!(firstName && lastName && email && password)) {
            res.status(400).send("Todos los compos son requeridos");
        }
       
        const nuevoUsuario = await User.create({
            firstName, lastName, email, password
        });

        console.log(`Se ha insertado ${JSON.stringify(nuevoUsuario)}`)

        res.status(201).send({
            code: 201,
            message: "Un nuevo usuario se creo con el ID:" + nuevoUsuario.id,
        });
    } catch (error) {
        console.error(error)
        res.status(500).send({ code: 500, message: error.message })
    }
};
export const bulkCreateUser = async (req, res) => {
    try {
        const nuevosUsuarios = await User.bulkCreate(req.body);
        console.log(`Se han insertado ${nuevosUsuarios.length}: ${JSON.stringify(nuevosUsuarios)}`)
        res.status(201)
        res.send(nuevosUsuarios);


    } catch (error) {
        console.error(error)
        res.status(500).send({ code: 500, message: error.message })
    }
};
//  Obtener los Bootcamp de un usuario llamado findUserById.
export const findUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        // Verificar si el usuario existe
        const allBootcampUser = await User.findByPk(userId, {
            include: Bootcamp,
        });
        if (!User) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(allBootcampUser);
    } catch (error) {
        console.error('Error al obtener los bootcamps del usuario:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Obtener todos los Usuarios incluyendo, los Bootcamp llamado findAll
export const findAll = async (req, res) => {
    try {
        //obtener todos los Usuarios con sus Bootcamp
        const allUserAndBootcamp = await User.findAll({
            include: Bootcamp, // Se incluyen los bootcamp asociados al usuario
        });
        res.json(allUserAndBootcamp);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Actualizar usuario por Id llamado updateUserById.
export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    try {
        // Verificamos si el usuario existe
        const updateUser = await User.findByPk(id);
        console.log("Contenido Variable updateUser");
        console.log(updateUser);
        if (!updateUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Actualizar datos del usuario
        updateUser.firstName = firstName;
        updateUser.lastName = lastName;
        await updateUser.save();
        res.json({ code: 200, message: " Usuario actualizado con exito.", token: req.token });
    } catch (error) {
        console.log("Error en la actualizacion de un Usuario", error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Eliminar un usuario por Id llamado deleteUserById.

export const deleteUserById = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si el usuario existe
        const deleteUser = await User.findByPk(id);
        console.log("Contenido Variable deleteUser");
        console.log(deleteUser);
        if (!deleteUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Eliminar el usuario
        await deleteUser.destroy();

        res.json({ message: 'Usuario eliminado correctamente', token: req.token  });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

export const login = async (req, res) => {
    res.json({ code: 200, message: "Login correcto.", token: req.token });
};

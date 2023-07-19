import User  from '../models/User.model.js';
import Bootcamp from '../models/Bootcamp.model.js';


// Crear y guardar un nuevo Bootcamp llamado createBootcamp.
export const createBootcamp = async (req, res) => {
    try {
        let { title, cue, description } = req.body;
        const nuevoBootcamp = await Bootcamp.create({
            title, cue, description
        });

     //   console.log(`Se ha insertado ${JSON.stringify(nuevoBootcamp)}`)

        res.status(201).send({
            code: 201,
            message: "Bootcamp se ha creado con el ID:" + nuevoBootcamp.id,
        });
    } catch (error) {
        console.error('Error al crear el Bootcamp:', error);
        res.status(500).send({ code: 500, message: error.message })
    }
};

export const bulkCreateBootcamp = async (req, res) => {
    try {
        const nuevosBootcamps = await Bootcamp.bulkCreate(req.body);
        console.log(`Se han insertado ${nuevosBootcamps.length}: ${JSON.stringify(nuevosBootcamps)}`)
        res.status(201)
        res.send(nuevosBootcamps);


    } catch (error) {
        console.error(error)
        res.status(500).send({ code: 500, message: error.message })
    }
};


// Agregar un Usuario al Bootcamp llamado addUser.
export const addUser = async (req, res) => {
    try {
        const { bootcampId, userId } = req.body;

        // Verificar si el bootcamp existe
        const foundBootcamp = await Bootcamp.findByPk(bootcampId);
        if (!foundBootcamp) {
            return res.status(404).json({
                code: 404,
                message: `El bootcamp con id ${bootcampId}, no existe`,

            });
        }

        // Verificar si el usuario existe
        const foundUser = await User.findByPk(userId);
        if (!foundUser) {
            return res.status(404).json({
                code: 404,
                message: `El usuario con id ${userId}, no existe`,
            });
        }

        // Agregar el usuario al bootcamp
        foundBootcamp.addUser(foundUser);


        console.log(`Agregado el usuario id= ${userId} al bootcamp con id= ${bootcampId}`);
        res.json({
            code: 200,
            message: `Agregado el usuario id= ${userId} al bootcamp con id= ${bootcampId}`,
        });


    } catch (error) {
        console.error('Error al agregar usuario al bootcamp:', error);
        res.status(500).json({
            code: 500,
            message: `Ha ocurrido un error al intentar vincular el bootcamp al user.`,
        });
    }
};

// Obtener los Bootcamp por id llamado findById.
export const findById = async (req, res) => {
    const { id } = req.params;

    try {
        const foundBootcamp = await Bootcamp.findByPk(id, {
            include: User
        });
       
        if (!Bootcamp) {
            return res.status(404).json({
                code: 404,
                message: `No existe un bootcamp con ese ID`,
            });
        }
        res.json({
            code: 200,
            data: foundBootcamp,
        });

    } catch (error) {
        console.log("Error al buscar el bootcamp por ID:", error);
        res.status(500).json({
            code: 500,
            message: "Error en el servidor",
        });
    }
};


// Obtener todos los Bootcamp incluyendo, los Usuarios llamado findAll
export const findAll = async (req, res) => {
    try {
        //obtener todos los bootcamp con sus usuarios
        const allBootcampAndUser = await Bootcamp.findAll({
            include: User, // Se incluyen los usuarios asociados al bootcamp
        });
        res.json(allBootcampAndUser);
    } catch (error) {
        console.error('Error al obtener los bootcamp:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};
// Obtener todos los Bootcamp 
export const findAllBootcamp = async (req, res) => {
    try {
        //obtener todos los bootcamp con sus usuarios
        const allBootcamp = await Bootcamp.findAll();
        res.json(allBootcamp);
    } catch (error) {
        console.error('Error al obtener los bootcamp:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};



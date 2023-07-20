import sequelize from "./app/config/db.config.js";
import app from "./app/index.js"

const main = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false, alter: false });
        let PORT = 3001;
        app.listen(PORT, () =>
            console.log("Servidor escuchando en http://localhost:" + PORT)
        );
    } catch (error) {
        console.log("Ha ocurrido un error: ", error);
    }
};

main();

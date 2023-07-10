import Sequelize from "sequelize";

const sequelize = new Sequelize(
    "db_bootcamp",
    "postgres",
    "", {
    host: "localhost",
    dialect: "postgres",
});

export default sequelize;
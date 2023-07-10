import Sequelize from "sequelize";

const sequelize = new Sequelize(
    "db_bootcamp",
    "postgres",
    "Dual2013", {
    host: "localhost",
    dialect: "postgres",
});

export default sequelize;
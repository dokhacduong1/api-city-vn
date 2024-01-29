import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host:  process.env.DATABASE_HOST,
        dialect: 'mysql'
    }
);
sequelize.authenticate().then(() => {
    console.log('Connection success.');
}).catch((error) => {
    console.error('Connection error.', error);
});

export default sequelize;
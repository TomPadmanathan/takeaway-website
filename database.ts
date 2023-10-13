import { Sequelize } from 'sequelize-typescript';
import Order from '@/models/Order';

const sequelize = new Sequelize({
    database: process.env.dbName,
    username: process.env.dbUser,
    password: process.env.dbPass,
    host: process.env.dbHost,
    dialect: 'mysql',
    models: [Order],
});

sequelize.addModels([Order]);

export default sequelize;
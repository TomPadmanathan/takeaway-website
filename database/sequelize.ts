// Packages
import { Sequelize } from 'sequelize-typescript';
import mysql2 from 'mysql2';

// Database Models
import Order from '@/database/models/Order';
import User from '@/database/models/User';
import Catering from '@/database/models/Catering';

const sequelize: Sequelize = new Sequelize({
    database: process.env.dbName,
    username: process.env.dbUser,
    password: process.env.dbPass,
    host: process.env.dbHost,
    dialect: 'mysql',
    dialectModule: mysql2,
    models: [Order, User, Catering],
    logging: false,
});

export default sequelize;

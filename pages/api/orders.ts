import type { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '@/database/sequlize';
import Order from '@/database/models/Order';

export const config = {
    api: {
        externalResolver: true,
    },
};

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> {
    response.status(200);

    // const connection: Connection = mysql.createConnection({
    //     host: process.env.dbHost,
    //     user: process.env.dbUser,
    //     password: process.env.dbPass,
    //     database: process.env.dbName,
    // });
    // const sql: string = `SELECT * FROM Orders;`;
    // connection.connect((error: mysql.QueryError | null): void => {
    //     if (error) throw error;
    //     connection.query(sql, (err: mysql.QueryError, result: orders): void => {
    //         if (err) throw err;
    //         else response.send(result);

    //         connection.end();
    //     });
    // });
    await sequelize.sync();

    try {
        const order = await Order.findAll();

        response.send(order);
    } catch (error) {
        console.error('Sequlize error:', error);
    }
}

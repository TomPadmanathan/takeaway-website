import type { NextApiRequest, NextApiResponse } from 'next';
import mysql, { Connection } from 'mysql2';
import { order } from '@/interfaces/orders';

export const config = {
    api: {
        externalResolver: true,
    },
};

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
): void {
    response.status(200);

    const connection: Connection = mysql.createConnection({
        host: process.env.dbHost,
        user: process.env.dbUser,
        password: process.env.dbPass,
        database: process.env.dbName,
    });
    const sql: string = `SELECT * FROM Orders WHERE OrderId = ${request.body.orderId};`;
    connection.connect((err: mysql.QueryError | null): void => {
        if (err) throw err;
        connection.query(sql, (err: mysql.QueryError, result: order): void => {
            if (err) throw err;
            response.send(result);
            connection.end();
        });
    });
}

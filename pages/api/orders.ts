import type { NextApiRequest, NextApiResponse } from 'next';
import mysql, { Connection } from 'mysql2';
import { orders } from '@/interfaces/orders';

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
    const selectStatement: string = `SELECT * FROM Orders;`;
    connection.connect((err: mysql.QueryError | null) => {
        if (err) throw err;
        connection.query(
            selectStatement,
            (err: mysql.QueryError, result: orders) => {
                if (err) throw err;
                else response.send(result);

                connection.end();
            }
        );
    });
}

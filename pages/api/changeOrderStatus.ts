import type { NextApiRequest, NextApiResponse } from 'next';
import mysql, { Connection, QueryError } from 'mysql2';
import sendCustomerEmail from '@/utils/sendCustomerEmail';

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
    const alterStatement: string = `UPDATE orders SET Status='${request.body.status}' WHERE OrderId='${request.body.id}' `;
    connection.connect((err: QueryError | null) => {
        if (err) throw err;
        connection.query(alterStatement, err => {
            if (err) throw err;
        });
    });
    sendCustomerEmail(request.body.id);
    response.send('');
}

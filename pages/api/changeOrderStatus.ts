import { NextApiRequest, NextApiResponse } from 'next';
import mysql, { Connection, QueryError } from 'mysql2';
import sendCustomerEmail from '@/utils/sendCustomerEmail';

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

    const alterStatement: string = `UPDATE orders SET Status='${request.body.status}' WHERE OrderId='${request.body.id}' `;

    connection.connect((error: QueryError | null) => {
        if (error) {
            response.status(500).send('Database connection error');
            return;
        }

        connection.query(alterStatement, (error: QueryError) => {
            if (error) {
                response.status(500).send('Database query error');
                return;
            }

            // Close the database connection
            connection.end();

            // Send the email asynchronously
            sendCustomerEmail(request.body.id)
                .then(() => {
                    response.send('Operation completed successfully');
                })
                .catch((emailError: string) => {
                    response
                        .status(500)
                        .send('Email sending error: ' + emailError);
                });
        });
    });
}

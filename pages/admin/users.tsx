// Components
import AdminNav from '@/components/adminDashboard/AdminNav';
import BottomNav from '@/components/page/nav/BottomNav';
import Footer from '@/components/page/Footer';
import TableCell from '@/components/adminDashboard/TableCell';

// React/Next
import { useEffect, useState } from 'react';

// Utils
import fetchWithToken from '@/utils/JWT/fetchWithToken';
import getDateFromTimestamp from '@/utils/getDateFromTimestamp';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';

// Database Models
import User from '@/database/models/User';

export default function Users(): JSX.Element {
    const [users, setUsers] = useState<User[]>([]);

    useEffect((): void => {
        async function fetchData(): Promise<void> {
            const response: Response = await fetchWithToken('/api/users', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const responseJson = await response.json();
            if (!response.ok) {
                console.error(responseJson.error);
                return;
            }
            if (!responseJson.users) {
                console.error('User not defined');
                return;
            }
            setUsers(responseJson.users);
        }
        fetchData();
    }, []);

    const tableHeadings: string[] = [
        'Account Creation Date',
        'Name',
        'PostCode',
        'User Id',
        'User Type',
        'Phone Number',
    ];

    return (
        <>
            <div className="min-h-screen">
                <BottomNav />
                <AdminNav />
                <div className="mb-10 flex justify-center text-center text-grey">
                    <div className="overflow-hidden rounded shadow-lg">
                        <table className="border-4 border-white bg-white">
                            <thead className="border-grey">
                                <tr>
                                    {tableHeadings.map(
                                        (element: string, index: number) => (
                                            <TableCell key={index} border>
                                                {element}
                                            </TableCell>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user: User, index: number) => (
                                    <tr key={index}>
                                        {tableHeadings.map(
                                            (heading: string) => (
                                                <TableData
                                                    user={user}
                                                    heading={heading}
                                                    key={heading}
                                                />
                                            )
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

interface props {
    user: User;
    heading: string;
}

function TableData({ user, heading }: props): JSX.Element | null {
    let returnData: string | JSX.Element | null;

    switch (heading) {
        case 'Account Creation Date':
            returnData = getDateFromTimestamp(parseInt(user.createdAt));
            break;
        case 'Name':
            returnData = user.forename + ' ' + user.surname;
            break;
        case 'PostCode':
            returnData = user.postcode;
            break;
        case 'User Id':
            return (
                <TableCell
                    onClick={() => navigator.clipboard.writeText(user.userId)}
                >
                    {user.userId}
                </TableCell>
            );
        case 'User Type':
            returnData = capitaliseFirstChar(user.userType);
            break;

        case 'Phone Number':
            returnData = user.phoneNumber;
            break;
        default:
            returnData = null;
    }
    if (returnData) return <TableCell>{returnData}</TableCell>;
    return <TableCell>{null}</TableCell>;
}

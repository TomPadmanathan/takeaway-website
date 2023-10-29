// Components
import AdminNav from '@/components/adminDashboard/AdminNav';

// React/Next
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Utils
import fetchWithToken from '@/utils/JWT/fetchWithToken';
import getDateFromTimestamp from '@/utils/getDateFromTimestamp';
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';

// Database Models
import User from '@/database/models/User';

// Types/Interfaces
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const tableClasses: string = 'border-collapse border border-black p-10';

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
            <AdminNav />
            <center>
                <table>
                    <thead>
                        <tr>
                            {tableHeadings.map(
                                (element: string, index: number) => (
                                    <td key={index} className={tableClasses}>
                                        {element}
                                    </td>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User, index: number) => (
                            <tr key={index}>
                                {tableHeadings.map((heading: string) => (
                                    <TableData
                                        user={user}
                                        heading={heading}
                                        key={heading}
                                    />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </>
    );
}

interface props {
    user: User;
    heading: string;
}

function TableData({ user, heading }: props): JSX.Element | null {
    const router: AppRouterInstance = useRouter();

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
            returnData = (
                <button onClick={() => router.push(`/users/${user.userId}`)}>
                    {user.userId}
                </button>
            );
            break;
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

interface children {
    children: string | JSX.Element | null;
}
function TableCell({ children }: children) {
    return <td className={tableClasses}>{children}</td>;
}

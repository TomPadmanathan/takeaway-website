// Components
import SecondaryButton from '@/components/SecondaryButton';

// React/Next
import { useRouter } from 'next/router';

// Types/Interfaces
import { NextRouter } from 'next/router';

export default function AdminNav(): JSX.Element {
    const navButtons: string[][] = [
        ['All Orders', 'orders'],
        ['Todays Orders', 'todays-orders'],
        ['Products', 'products'],
        ['Users', 'users'],
    ];

    return (
        <center>
            <nav className="border-1 my-10 h-24 w-[64rem] justify-center border border-black">
                <ul className="flex h-full items-center justify-around">
                    {navButtons.map((element: string[]) => (
                        <ListItem
                            key={element[1]}
                            title={element[0]}
                            page={element[1]}
                        />
                    ))}
                </ul>
            </nav>
        </center>
    );
}

interface ListItemProps {
    title: string;
    page: string;
}

function ListItem(props: ListItemProps): JSX.Element {
    const router: NextRouter = useRouter();
    return (
        <li>
            <SecondaryButton
                content={props.title}
                onClick={() => router.push(`/admin/${props.page}`)}
            />
        </li>
    );
}

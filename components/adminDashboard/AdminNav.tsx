// React/Next
import { useRouter } from 'next/router';

// Types/Interfaces
import { NextRouter } from 'next/router';

export default function AdminNav(): JSX.Element {
    const router: NextRouter = useRouter();

    const navButtons: string[][] = [
        ['All Orders', 'orders'],
        ['Todays Orders', 'todays-orders'],
        ['Products', 'products'],
        ['Users', 'users'],
    ];

    return (
        <center>
            <nav className="my-10 h-24 w-[64rem] justify-center rounded-sm bg-white shadow-md">
                <ul className="flex h-full items-center justify-around">
                    {navButtons.map((element: string[]) => (
                        <li key={element[1]}>
                            <button
                                onClick={(): Promise<boolean> =>
                                    router.push(`/admin/${element[1]}`)
                                }
                                className="h-16 w-32 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white"
                            >
                                {element[0]}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </center>
    );
}

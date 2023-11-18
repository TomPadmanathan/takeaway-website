// React/Next
import React from 'react';
import { NextRouter, useRouter } from 'next/router';

export default function BottomNav(): JSX.Element {
    const router: NextRouter = useRouter();

    const navButtons: string[][] = [
        ['Home', '/'],
        ['Menu', '/menu'],
        ['Reviews', '/reviews'],
        ['Catering', '/#catering'],
    ];

    return (
        <nav className="mx-72 my-6 flex justify-between">
            <div>
                <ul className="flex w-80 justify-between">
                    {navButtons.map((navButton: string[]) => (
                        <li
                            onClick={(): Promise<boolean> =>
                                router.push(navButton[1])
                            }
                            key={navButton[0]}
                        >
                            {navButton[0]}
                        </li>
                    ))}
                </ul>
            </div>
            <button className="mx-7">Cart</button>
        </nav>
    );
}

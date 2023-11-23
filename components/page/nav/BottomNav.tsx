// React/Next
import React, { useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

export default function BottomNav(): JSX.Element {
    const router: NextRouter = useRouter();
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    const navButtons: string[][] = [
        ['Home', '/'],
        ['Menu', '/menu'],
        ['Reviews', '/reviews'],
        ['Catering', '/#catering'],
        ['Cart', '/'],
    ];

    return (
        <>
            <nav className="flex h-20 items-center justify-around sm:justify-between">
                <div className="flex w-full justify-around sm:hidden">
                    <ul className="flex w-80 justify-between">
                        {navButtons.map(
                            (navButton: string[], index: number) => (
                                <li
                                    onClick={(): Promise<boolean> =>
                                        router.push(navButton[1])
                                    }
                                    key={navButton[0]}
                                    className={`cursor-pointer ${
                                        index === navButtons.length - 1
                                            ? 'hidden'
                                            : null
                                    }`}
                                >
                                    {navButton[0]}
                                </li>
                            )
                        )}
                    </ul>
                    <div>
                        <button
                            onClick={(): Promise<boolean> =>
                                router.push(navButtons[-1][1])
                            }
                        >
                            {navButtons[navButtons.length - 1][0]}
                        </button>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <button onClick={() => setMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? 'Close' : 'Menu'}
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="">
                    <ul className="flex flex-col items-center">
                        {navButtons.map((navButton: string[]) => (
                            <li
                                onClick={(): Promise<boolean> =>
                                    router.push(navButton[1])
                                }
                                key={navButton[0]}
                                className="mb-2 cursor-pointer"
                            >
                                {navButton[0]}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

// React/Next
import React, { useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Components
import Cart from '@/components/Cart';

export default function BottomNav(): JSX.Element {
    const router: NextRouter = useRouter();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [cartOpen, setCartOpen] = useState<boolean>(false);

    const navButtons: string[][] = [
        ['Home', '/'],
        ['Order', '/order'],
        ['Account', '/account'],
        ['Catering', '/#catering'],
        ['Cart'],
    ];

    const hamburgerLine: string =
        'h-1 w-6 my-1 rounded-full bg-grey2 transition-all';

    const navItemButton: string =
        'mx-2 h-12 rounded-sm bg-lightergrey px-12 text-grey transition-all hover:bg-lightgrey hover:text-white';

    return (
        <>
            <nav className="z-1 bg-white shadow-md">
                <div className="flex h-20 items-center justify-around ms:justify-between">
                    <div className="flex h-full w-full items-center justify-around ms:hidden">
                        <ul className="flex h-full items-center justify-between">
                            {navButtons.map(
                                (navButton: string[], index: number) => (
                                    <li key={navButton[0]}>
                                        <button
                                            onClick={(): Promise<boolean> =>
                                                router.push(navButton[1])
                                            }
                                            className={`${navItemButton} ${
                                                index ===
                                                    navButtons.length - 1 &&
                                                'hidden'
                                            }`}
                                        >
                                            {navButton[0]}
                                        </button>
                                    </li>
                                )
                            )}
                        </ul>
                        <button
                            className={navItemButton}
                            onClick={(): void => setCartOpen(!cartOpen)}
                        >
                            {navButtons[navButtons.length - 1][0]}
                        </button>
                    </div>

                    <div className="mr-10 hidden w-full ms:flex ms:justify-end">
                        <button
                            className="group flex h-12 w-12 flex-col items-center justify-center rounded"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <div
                                className={`${hamburgerLine} ${
                                    menuOpen
                                        ? 'translate-y-3 rotate-45 opacity-50 group-hover:opacity-100'
                                        : 'opacity-50 group-hover:opacity-100'
                                }`}
                            />
                            <div
                                className={`${hamburgerLine} ${
                                    menuOpen
                                        ? 'opacity-0'
                                        : 'opacity-50 group-hover:opacity-100'
                                }`}
                            />
                            <div
                                className={`${hamburgerLine} ${
                                    menuOpen
                                        ? '-translate-y-3 -rotate-45 opacity-50 group-hover:opacity-100'
                                        : 'opacity-50 group-hover:opacity-100'
                                }`}
                            />
                        </button>
                    </div>
                </div>
                {menuOpen && (
                    <div className="hidden pb-2 ms:block">
                        <ul className="text-center">
                            {navButtons.map(
                                (navButton: string[], index: number) => (
                                    <li
                                        className={`mx-2 ${
                                            navButtons.length - 1 !== index &&
                                            'mb-2'
                                        }`}
                                    >
                                        <button
                                            onClick={(): void => {
                                                if (
                                                    navButtons.length - 1 ===
                                                    index
                                                )
                                                    setCartOpen(!cartOpen);
                                                else router.push(navButton[1]);
                                            }}
                                            key={navButton[0]}
                                            className="w-full rounded bg-lightergrey py-2 text-grey transition-all hover:bg-lightgrey hover:text-white"
                                        >
                                            {navButton[0]}
                                        </button>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                )}
            </nav>
            {/* Cart Overlay */}
            <Cart cartOpen={[cartOpen, setCartOpen]} />
        </>
    );
}

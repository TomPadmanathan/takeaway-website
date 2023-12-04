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

    const transition: string = 'transition ease transform duration-200';
    const genericHamburgerLine: string =
        'h-1 w-6 my-1 rounded-full bg-black ' + transition;

    const navItemButton: string =
        'mx-2 h-12 rounded-sm bg-lightergrey  px-12 text-grey transition-all hover:bg-lightgrey hover:text-white';

    return (
        <>
            <nav className="z-1 bg-white shadow-md">
                <div className="flex h-20 items-center justify-around sm:justify-between">
                    <div className="flex h-full w-full items-center justify-around sm:hidden">
                        <ul className="flex h-full items-center justify-between">
                            {navButtons.map(
                                (navButton: string[], index: number) => (
                                    <li className="">
                                        <button
                                            onClick={(): Promise<boolean> =>
                                                router.push(navButton[1])
                                            }
                                            key={navButton[0]}
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

                    <div className="mr-10 hidden w-full sm:flex sm:justify-end">
                        <button
                            className="group flex h-12 w-12 flex-col items-center justify-center rounded"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <div
                                className={`${genericHamburgerLine} ${
                                    menuOpen
                                        ? 'translate-y-3 rotate-45 opacity-50 group-hover:opacity-100'
                                        : 'opacity-50 group-hover:opacity-100'
                                }`}
                            />
                            <div
                                className={`${genericHamburgerLine} ${
                                    menuOpen
                                        ? 'opacity-0'
                                        : 'opacity-50 group-hover:opacity-100'
                                }`}
                            />
                            <div
                                className={`${genericHamburgerLine} ${
                                    menuOpen
                                        ? '-translate-y-3 -rotate-45 opacity-50 group-hover:opacity-100'
                                        : 'opacity-50 group-hover:opacity-100'
                                }`}
                            />
                        </button>
                    </div>
                </div>
                {menuOpen && (
                    <div className="hidden sm:block">
                        <ul className="flex flex-col items-center">
                            {navButtons.map(
                                (navButton: string[], index: number) => (
                                    <li
                                        onClick={(): void => {
                                            if (navButtons.length - 1 === index)
                                                setCartOpen(!cartOpen);
                                            else router.push(navButton[1]);
                                        }}
                                        key={navButton[0]}
                                        className={`mb-2 cursor-pointer opacity-50 transition hover:text-black hover:opacity-100 ${transition}`}
                                    >
                                        {navButton[0]}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                )}
            </nav>
            {/* Cart Overlay */}
            <Cart
                cartOpen={[cartOpen, setCartOpen]}
                configData={{
                    lowOrder: {
                        maxFee: 5,
                        feeLimit: 15,
                    },
                    delivery: {
                        fee: 3,
                        estimatedTimeOffset: 45, //mins
                    },
                }}
            />
        </>
    );
}

// React/Next
import React, { useRef, useState, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';

export default function BottomNav(): JSX.Element {
    const router: NextRouter = useRouter();
    const [sticky, setSticky] = useState<boolean>(false);
    const navbar = useRef<any>();

    useEffect(() => {
        function handleScroll() {
            const navOffSet: number = 180 - navbar.current.clientHeight;

            if (window.scrollY >= navOffSet) setSticky(true);
            else setSticky(false);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navButtons: string[][] = [
        ['Home', '/'],
        ['Menu', '/menu'],
        ['Reviews', '/reviews'],
        ['Catering', '/#catering'],
    ];

    return (
        <>
            <nav
                className={
                    router.asPath === '/'
                        ? `${
                              sticky ? 'fixed top-0 z-10 shadow' : null
                          } w-full bg-white`
                        : `fixed z-10 w-full bg-white shadow`
                }
                ref={navbar}
            >
                <div className="mx-72 my-6 flex justify-between">
                    <div>
                        <ul className="flex w-80 justify-between">
                            {navButtons.map((navButton: string[]) => (
                                <li
                                    onClick={(): Promise<boolean> =>
                                        router.push(navButton[1])
                                    }
                                    key={navButton[0]}
                                    className="cursor-pointer"
                                >
                                    {navButton[0]}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className="mx-7">Cart</button>
                </div>
            </nav>
            <div className={`${router.asPath === '/' ? null : `mb-[72px]`} `} />
        </>
    );
}

// React/Next
import React from 'react';
import { NextRouter, useRouter } from 'next/router';

export default function BottomNav(): JSX.Element {
    const router: NextRouter = useRouter();

    return (
        <nav className="mx-72 my-6 flex justify-between">
            <div>
                <ul>
                    <li>
                        <button className="mx-7">Home</button>
                        <button className="mx-7">Menu</button>
                        <button className="mx-7">Reviews</button>
                    </li>
                </ul>
            </div>
            <button className="mx-7">Cart</button>
        </nav>
    );
}

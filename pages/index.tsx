// React/Next
import React from 'react';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';

// Components
import TopNav from '@/components/nav/TopNav';
import BottomNav from '@/components/nav/BottomNav';

// Assets
import Black from '@/assets/img/black.png';
import Star from '@/assets/img/star.png';

export default function Navbar(): JSX.Element {
    const router: NextRouter = useRouter();

    return (
        <div className="overflow-hidden">
            <TopNav />
            <BottomNav />

            <section className="bg-lightblue">
                <center className="px-64 pb-0 pt-20">
                    <Image
                        src={Black}
                        className="border-black mb-10 h-52 w-52 border"
                        alt={'site-icon'}
                    />
                    <button
                        className="h-14 rounded-lg border-[3px] border-white bg-blue px-10 text-lg font-bold text-white"
                        onClick={(): Promise<boolean> => router.push('/order')}
                    >
                        Order Now
                    </button>
                    <section className="mt-10 rounded-xl rounded-b-none border-4 border-b-0 border-blue bg-pink px-20">
                        <h2 className="pb-4 pt-6 text-3xl text-white">
                            Welcome to Takeawaysite
                        </h2>
                        <p className="pb-10 text-lg leading-10">
                            Irure qui incididunt dolore proident Lorem duis
                            exercitation dolore sit elit amet. Cupidatat eu amet
                            ut velit elit nostrud proident sit quis irure
                            excepteur sit. Lorem nostrud non amet proident Lorem
                            qui esse amet. Excepteur laborum dolore velit eu
                            enim. Quis ad do adipisicing ex qui. Fugiat
                            voluptate nisi non commodo et cupidatat dolore amet
                            laboris officia reprehenderit fugiat. Elit pariatur
                            eu velit reprehenderit est dolor reprehenderit sit.
                        </p>
                    </section>
                </center>
            </section>

            <section className="m-10">
                <center>
                    <h2 className="mb-10">
                        What do our customers think about us?
                    </h2>
                </center>

                {/* Link reviews to db later */}
                <div className=" flex justify-evenly">
                    <Review />
                    <Review />
                </div>
            </section>
        </div>
    );
}

function Review(): JSX.Element {
    return (
        <div className="w-96">
            <h2 className="pb-2 text-3xl text-pink">Miranda W.</h2>
            <span className="flex">
                <Image src={Star} className="w-6" alt={'star'} />
                <Image src={Star} className="w-6" alt={'star'} />
                <Image src={Star} className="w-6" alt={'star'} />
                <Image src={Star} className="w-6" alt={'star'} />
                <Image src={Star} className="w-6" alt={'star'} />
                <span className="pl-2 text-lightgrey">2 months ago</span>
            </span>
            <h2 className="text-lg text-pink">Verified customer</h2>

            <p>
                I recently celebrted my birthday here and it was an all round
                great experience! the staff were amazing and treated us with
                respect.
            </p>
        </div>
    );
}

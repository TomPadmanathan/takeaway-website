// React/Next
import React, { useState, useEffect, FormEventHandler } from 'react';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';

// Types/Interfaces
import User from '@/database/models/User';
import { FormEvent } from 'react';

// Components
import TopNav from '@/components/nav/TopNav';
import BottomNav from '@/components/nav/BottomNav';

// Assets
import Logo from '@/assets/img/logo.png';
import Star from '@/assets/img/star.png';

// Utils
import fetchWithToken from '@/utils/JWT/fetchWithToken';

export default function Navbar(): JSX.Element {
    const router: NextRouter = useRouter();

    return (
        <div className="overflow-hidden">
            <TopNav />
            <BottomNav />

            <section className="bg-lightblue px-64 pb-0">
                <center>
                    <Image
                        src={Logo}
                        className="border-black w-72 border py-10"
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

            <section className="m-10 mb-20">
                <center>
                    <h2 className="mb-10 text-xl">
                        What do our customers think about us?
                    </h2>
                </center>

                {/* Link to backend review db */}
                <section className="mb-10 flex justify-center">
                    <div className="block justify-center text-center">
                        <h2 className="mb-4 text-5xl text-grey">4.6</h2>
                        <div className="mb-4 flex">
                            <Image src={Star} className="w-4" alt={'star'} />
                            <Image src={Star} className="w-4" alt={'star'} />
                            <Image src={Star} className="w-4" alt={'star'} />
                            <Image src={Star} className="w-4" alt={'star'} />
                            <Image src={Star} className="w-4" alt={'star'} />
                        </div>
                        <h2 className="text-grey">20 reviews</h2>
                    </div>
                    <div>
                        <div className="ml-10 flex items-center">
                            <h3 className="text-grey">5</h3>
                            <div className="ml-2 h-2.5 w-96 rounded-xl bg-yellow"></div>
                        </div>
                        <div className="ml-10 flex items-center">
                            <h3 className="text-grey">4</h3>
                            <div className="ml-2 h-2.5 w-96 rounded-xl bg-lightgrey"></div>
                        </div>
                        <div className="ml-10 flex items-center">
                            <h3 className="text-grey">3</h3>
                            <div className="ml-2 h-2.5 w-96 rounded-xl bg-lightgrey"></div>
                        </div>
                        <div className="ml-10 flex items-center">
                            <h3 className="text-grey">2</h3>
                            <div className="ml-2 h-2.5 w-96 rounded-xl bg-lightgrey"></div>
                        </div>
                        <div className="ml-10 flex items-center">
                            <h3 className="text-grey">1</h3>
                            <div className="ml-2 h-2.5 w-96 rounded-xl bg-lightgrey"></div>
                        </div>
                    </div>
                </section>
                <center className="mb-10">
                    <button
                        className="m-0 h-10 rounded border-[3px] border-grey px-10 font-bold text-pink"
                        onClick={(): Promise<boolean> =>
                            router.push('/reviews')
                        }
                    >
                        See more reviews
                    </button>
                </center>

                {/* Link reviews to db later */}
                <div className=" flex justify-evenly">
                    <Review />
                    <Review />
                </div>
            </section>

            <CateringService />
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
                <span className="pl-2 text-grey">2 months ago</span>
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

interface children {
    children: JSX.Element | string;
}

function HighlightText({ children }: children): JSX.Element {
    return <span className="text-pink">{children}</span>;
}

function CateringService(): JSX.Element {
    return (
        <section
            className="flex h-[700px] items-center justify-around bg-lightblue px-20"
            id="catering"
        >
            <section>
                <h2 className="pb-2 text-6xl text-white">
                    Our Catering Service?
                </h2>
                <p className="w-[580px] text-xl">
                    We have provided catering for over
                    <HighlightText> 20 years </HighlightText> and have catered
                    for over
                    <HighlightText> 400 events</HighlightText>. If you wish to
                    book our services for an event or get more infomation please
                    complete our form and someone from our team will be in touch
                    shortly.
                </p>
            </section>

            <CateringServiceForm />
        </section>
    );
}

function CateringServiceForm(): JSX.Element {
    const router: NextRouter = useRouter();
    const [user, setUser] = useState<null | User>();
    const [formState, setFormState] = useState<0 | 1 | 2>(0);

    useEffect((): void => {
        async function fetchData(): Promise<void> {
            const response: Response = await fetchWithToken(
                process.env.NEXT_PUBLIC_URL + '/api/getUserFromToken',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const responseJson = await response.json();
            if (responseJson.error) {
                console.error(responseJson.error);
                return;
            }
            setUser(responseJson.user);
        }
        fetchData();
    }, []);

    function handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (formState < 2) {
            setFormState(prevFormState => (prevFormState + 1) as 0 | 1 | 2);
            return;
        }
    }
    return (
        <section className="relative h-[550px] w-[450px] rounded-xl bg-white shadow-2xl">
            {user ? (
                <form
                    onSubmit={(event: FormEvent<HTMLFormElement>) =>
                        handleFormSubmit(event)
                    }
                    className="flex justify-center"
                >
                    {formState === 0 ? (
                        <>
                            <h2 className="pt-20 text-xl">
                                Continue as:
                                {' ' + user.forename + ' ' + user.surname}?
                            </h2>
                        </>
                    ) : formState === 1 ? (
                        <h1>formstate 1</h1>
                    ) : formState === 2 ? (
                        <h1>Formstate2</h1>
                    ) : null}
                    <button
                        className="absolute bottom-10 h-10 rounded border-[3px] border-grey px-10 font-bold text-pink"
                        type="submit"
                    >
                        Next
                    </button>
                </form>
            ) : (
                <>
                    <h2>Please login to continue</h2>
                    <button
                        className="h-14 rounded-lg border-[3px] border-white bg-blue px-10 text-lg font-bold text-white"
                        onClick={(): Promise<boolean> =>
                            router.push({
                                pathname: '/auth/login',
                                query: {
                                    url:
                                        process.env.NEXT_PUBLIC_URL +
                                        '#catering',
                                },
                            })
                        }
                    >
                        Login
                    </button>
                </>
            )}
        </section>
    );
}

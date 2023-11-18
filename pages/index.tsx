// React/Next
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';

// Types/Interfaces
import User from '@/database/models/User';
import { FormEvent, ChangeEvent } from 'react';

// Packages
import jwt from 'jsonwebtoken';
// Components
import TopNav from '@/components/nav/TopNav';
import BottomNav from '@/components/nav/BottomNav';

// Assets
import Logo from '@/assets/img/logo.png';
import Star from '@/assets/img/star.png';
import Spinner from '@/assets/gif/spinner.gif';

// Utils
import fetchWithToken from '@/utils/JWT/fetchWithToken';
import getDateFromTimestamp from '@/utils/getDateFromTimestamp';

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
            <Footer />
        </div>
    );
}

function Footer(): JSX.Element {
    const router: NextRouter = useRouter();

    const [token, setToken] = useState<string | null>();
    const [userId, setUserId] = useState<string>();

    useEffect((): void => {
        const token = localStorage.getItem('token');
        if (!token) return;
        setToken(token);
        interface decodedToken {
            userId: string;
            iat: number;
            exp: number;
        }
        const decodedToken: any = jwt.decode(token);
        const userId: string = decodedToken.userId;
        setUserId(userId);
    }, [token]);

    const footerItems: string[][][] = [
        [
            ['call us', `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`],
            ['email us', `mailto:${process.env.NEXT_PUBLIC_EMAIL}`],
            ['leave us a review', '/review/'],
        ],
        [
            ['order now', '/order/'],
            ['menu', '/menu/'],
            ['catering', '/#catering'],
        ],
        [
            ['my account', `/users/${userId}`],
            ['my orders', `/users/${userId}/orders/`],
        ],
    ];

    return (
        <footer className="bg-darkgrey px-96">
            <div className="flex h-60 items-center justify-between">
                <Image
                    src={Logo}
                    alt="logo"
                    className="aspect-4/3 w-40 invert filter"
                />
                {footerItems.map((titleGroup: string[][]) => (
                    <ul>
                        {titleGroup.map((title: string[]) => (
                            <li
                                onClick={() => router.push(title[1])}
                                className="cursor-pointer text-white"
                                key={title[0]}
                            >
                                {title[0].toUpperCase()}
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
            <div className="h-0.5 bg-white" />
            <div className="flex h-20 items-center justify-center text-sm">
                <h2
                    className="cursor-pointer text-white"
                    onClick={(): Promise<boolean> =>
                        router.push('/privacy-policy')
                    }
                >
                    Privacy Policy
                </h2>
            </div>
        </footer>
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
    const [formState, setFormState] = useState<0 | 1 | 2 | 3>(0);

    const [error, setError] = useState<string>('');
    const [status, setStatus] = useState<boolean | null>(null);

    const [eventTypeOther, setEventTypeOther] = useState<boolean>(false);
    const [dietRequirements, setDietRequirements] = useState<boolean>(false);
    interface eventData {
        eventType: string;
        estimatedDate: string;
        dietaryRequirements: string;
        estimatedAttendes: number;
    }
    const [eventData, setEventData] = useState<eventData>({
        eventType: 'Wedding',
        estimatedDate: '',
        dietaryRequirements: 'None',
        estimatedAttendes: 0,
    });
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

    async function handleFormSubmit(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        if (formState < 3) {
            setFormState(prevFormState => (prevFormState + 1) as 0 | 1 | 2 | 3);
        }

        if (formState === 2) {
            const response: Response = await fetchWithToken(
                process.env.NEXT_PUBLIC_URL +
                    '/api/catering/createCateringRequest',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        eventData,
                    }),
                }
            );
            interface responseJson {
                error?: string;
            }

            const responseJson: responseJson = await response.json();
            if (!response.ok) {
                setError(responseJson.error as string);
                setStatus(false);
                return;
            }
            setStatus(true);
        }
    }

    return (
        <section className="relative h-[540px] w-[450px] rounded-xl bg-white shadow-2xl">
            {user ? (
                <form
                    onSubmit={(event: FormEvent<HTMLFormElement>) =>
                        handleFormSubmit(event)
                    }
                    className="flex justify-center"
                >
                    {formState === 0 ? (
                        <h2 className="pt-20 text-xl">
                            Continue as:
                            <HighlightText>
                                {' ' + user.forename + ' ' + user.surname}
                            </HighlightText>
                            ?
                        </h2>
                    ) : formState === 1 ? (
                        <center className="w-full">
                            <h2 className="pt-20 text-xl">
                                Your Event Details
                            </h2>
                            <section className="mt-10 flex justify-around">
                                <section>
                                    <label
                                        htmlFor="event-type"
                                        className="block"
                                    >
                                        Event Type
                                    </label>
                                    <select
                                        id="event-type"
                                        onChange={(
                                            event: ChangeEvent<HTMLSelectElement>
                                        ): void => {
                                            if (event.target.value === 'Other')
                                                setEventTypeOther(true);
                                            else {
                                                setEventTypeOther(false);
                                                const copy = { ...eventData };
                                                copy.eventType =
                                                    event.target.value;
                                                setEventData(copy);
                                            }
                                        }}
                                        required
                                    >
                                        <option>Wedding</option>
                                        <option>Funeral</option>
                                        <option>Party</option>
                                        <option>Office Event</option>
                                        <option>Birthday</option>
                                        <option>Other</option>
                                    </select>
                                    {eventTypeOther ? (
                                        <input
                                            type="text"
                                            placeholder="Please specify"
                                            className="mt-2 block w-40 rounded-sm pl-1 outline outline-1 outline-grey"
                                            onChange={(
                                                event: ChangeEvent<HTMLInputElement>
                                            ): void => {
                                                const copy = { ...eventData };
                                                copy.eventType =
                                                    event.target.value;
                                                setEventData(copy);
                                            }}
                                            required
                                        />
                                    ) : null}
                                </section>
                                <section>
                                    <label
                                        htmlFor="estimated-date"
                                        className="block"
                                    >
                                        Estimated Date
                                    </label>
                                    <input
                                        type="date"
                                        onChange={(
                                            event: ChangeEvent<HTMLInputElement>
                                        ): void => {
                                            const copy = { ...eventData };
                                            const dateString =
                                                event.target.value;
                                            if (!dateString) {
                                                copy.estimatedDate = '';
                                                setEventData(copy);
                                                return;
                                            }
                                            const selectedDate = new Date(
                                                dateString
                                            ).getTime();

                                            copy.estimatedDate =
                                                String(selectedDate);
                                            setEventData(copy);
                                        }}
                                        required
                                    />
                                </section>
                            </section>

                            <section className="mt-20 flex justify-around">
                                <section>
                                    <label
                                        htmlFor="diet-requirements"
                                        className="block"
                                    >
                                        Dietary Requirements
                                    </label>
                                    <select
                                        id="diet-requirements"
                                        onChange={(
                                            event: ChangeEvent<HTMLSelectElement>
                                        ): void => {
                                            if (event.target.value === 'Other')
                                                setDietRequirements(true);
                                            else {
                                                setDietRequirements(false);

                                                const copy = { ...eventData };
                                                copy.dietaryRequirements =
                                                    event.target.value;
                                                setEventData(copy);
                                            }
                                        }}
                                        required
                                    >
                                        <option>None</option>
                                        <option>Vegan</option>
                                        <option>Vegetarian</option>
                                        <option>Halal</option>
                                        <option>Kosher</option>
                                        <option>Low Fat</option>
                                        <option>Gluten Free</option>
                                        <option>Dariy Free</option>
                                        <option>Egg Free</option>
                                        <option>Nut Free</option>
                                        <option>Other</option>
                                    </select>
                                    {dietRequirements ? (
                                        <input
                                            type="text"
                                            placeholder="Please specify"
                                            className="mt-2 block w-40 rounded-sm pl-1 outline outline-1 outline-grey"
                                            onChange={(
                                                event: ChangeEvent<HTMLInputElement>
                                            ): void => {
                                                const copy = { ...eventData };
                                                copy.dietaryRequirements =
                                                    event.target.value;
                                                setEventData(copy);
                                            }}
                                            required
                                        />
                                    ) : null}
                                </section>
                                <section>
                                    <label
                                        htmlFor="estimated-attendes"
                                        className="block"
                                    >
                                        Estimated Attendes
                                    </label>
                                    <input
                                        type="number"
                                        id="estimated-attendes"
                                        className="mt-2 block w-24 rounded-sm pl-1 outline outline-1 outline-grey"
                                        min={0}
                                        onChange={(
                                            event: ChangeEvent<HTMLInputElement>
                                        ) => {
                                            const copy = { ...eventData };
                                            copy.estimatedAttendes = Number(
                                                event.target.value
                                            );
                                            setEventData(copy);
                                        }}
                                        required
                                    />
                                </section>
                            </section>
                        </center>
                    ) : formState === 2 ? (
                        <center className="w-full">
                            <h2 className="pt-20 text-xl">Summary</h2>
                            <section className="mt-8 flex justify-around">
                                <section>
                                    <label
                                        htmlFor="event-type"
                                        className="block"
                                    >
                                        Event Type
                                    </label>

                                    <div
                                        id="event-type"
                                        className=" bg-lightergrey"
                                    >
                                        {eventData.eventType}
                                    </div>
                                </section>
                                <section>
                                    <label
                                        htmlFor="estimated-date"
                                        className="block"
                                    >
                                        Estimated Date
                                    </label>
                                    <div className=" bg-lightergrey">
                                        {getDateFromTimestamp(
                                            +eventData.estimatedDate
                                        )}
                                    </div>
                                </section>
                            </section>

                            <section className="mt-14 flex justify-around">
                                <section>
                                    <label
                                        htmlFor="diet-requirements"
                                        className="block"
                                    >
                                        Dietary Requirements
                                    </label>
                                    <div
                                        id="diet-requirements"
                                        className=" bg-lightergrey"
                                    >
                                        {eventData.dietaryRequirements}
                                    </div>
                                </section>
                                <section>
                                    <label
                                        htmlFor="estimated-attendes"
                                        className="block"
                                    >
                                        Estimated Attendes
                                    </label>

                                    <div
                                        id="estimated-attendes"
                                        className=" bg-lightergrey"
                                    >
                                        {eventData.estimatedAttendes}
                                    </div>
                                </section>
                            </section>
                            <section className="mt-14 flex justify-around">
                                <section>
                                    <label
                                        htmlFor="phone-number"
                                        className="block"
                                    >
                                        Phone Number
                                    </label>
                                    <div
                                        id="phone-number"
                                        className=" bg-lightergrey"
                                    >
                                        {user.phoneNumber}
                                    </div>
                                </section>
                                <section>
                                    <label htmlFor="email" className="block">
                                        Email
                                    </label>

                                    <div
                                        id="email"
                                        className=" bg-lightergrey px-2"
                                    >
                                        {user.email}
                                    </div>
                                </section>
                            </section>
                        </center>
                    ) : formState === 3 ? (
                        <>
                            {status === null ? (
                                <div className="flex h-[540px] items-center">
                                    <Image
                                        src={Spinner}
                                        alt="loading-spinner"
                                        className="h-24 w-24"
                                    />
                                </div>
                            ) : status ? (
                                <center>
                                    <HighlightText>
                                        <h2 className="mb-6 pt-20 text-xl">
                                            Success
                                        </h2>
                                    </HighlightText>

                                    <p>
                                        Your catering request has been submitted
                                        successfully. A member from out team
                                        will be in contact shortly.
                                    </p>
                                </center>
                            ) : (
                                <center>
                                    <h2 className="mb-6 pt-20 text-xl">
                                        Something went wrong
                                    </h2>
                                    <HighlightText>
                                        <p>{error}</p>
                                    </HighlightText>

                                    <p>
                                        Please try again later. If the problem
                                        persists please contact the resturant
                                        using the contact details in the footer.
                                    </p>
                                </center>
                            )}
                        </>
                    ) : null}
                    {formState !== 3 ? (
                        <>
                            {formState ? (
                                <button
                                    className="absolute bottom-20 left-20 h-10 rounded border-[3px] border-grey px-10 font-bold text-pink"
                                    type="button"
                                    onClick={() =>
                                        setFormState(
                                            prevFormState =>
                                                (prevFormState - 1) as
                                                    | 0
                                                    | 1
                                                    | 2
                                                    | 3
                                        )
                                    }
                                >
                                    Back
                                </button>
                            ) : null}
                            <button
                                className={`absolute bottom-20 ${
                                    formState ? 'right-20' : null
                                } h-10 rounded border-[3px] border-grey px-10 font-bold text-pink`}
                                type="submit"
                            >
                                {formState === 2 ? 'Submit' : 'Next'}
                            </button>
                        </>
                    ) : null}
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

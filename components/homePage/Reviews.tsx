// React/Next
import { useRouter } from 'next/router';

// Assets
import { HiStar } from 'react-icons/hi';

// Types/Interfaces
import { NextRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Review(): JSX.Element {
    return (
        <div className="w-96">
            <h2 className="pb-2 text-3xl text-pink">Miranda W.</h2>
            <span className="flex">
                {new Array(5).fill(0).map((element: number, index: number) => (
                    <HiStar size={24} color="gold" key={index} />
                ))}

                <span className="pl-2 text-grey">2 months ago</span>
            </span>
            <h2 className="text-lg text-pink">Verified customer</h2>

            <p className="text-darkgrey">
                I recently celebrted my birthday here and it was an all round
                great experience! the staff were amazing and treated us with
                respect.
            </p>
        </div>
    );
}

export default function Reviews(): JSX.Element {
    const [token, setToken] = useState<boolean>(false);
    const router: NextRouter = useRouter();

    useEffect((): void => {
        const token: string | null = localStorage.getItem('token');
        if (token) setToken(true);
        else setToken(false);
    }, [token]);
    return (
        <section className="bg-white p-10 pb-20">
            <center>
                <h2 className="mb-10 text-xl text-darkgrey">
                    What do our customers think about us?
                </h2>
            </center>

            {/* Link to backend review db */}
            <section className="mb-10 flex justify-center sm:flex-col">
                <section className="block justify-center text-center">
                    <h2 className="mb-4 text-5xl text-grey">4.6</h2>
                    <div className="mb-4 flex justify-center">
                        {new Array(5)
                            .fill(0)
                            .map((element: number, index: number) => (
                                <HiStar size={22} color="gold" key={index} />
                            ))}
                    </div>
                    <h2 className="text-grey">20 reviews</h2>
                </section>
                <section className="ml-10 flex justify-center sm:ml-0 sm:mt-2">
                    <div className="flex-col">
                        {new Array(5)
                            .fill(0)
                            .map(
                                (
                                    element: number,
                                    index: number,
                                    array: number[]
                                ) => (
                                    <ReviewColumn
                                        positive={index === 0 && true}
                                        number={array.length - index}
                                        key={index}
                                    />
                                )
                            )}
                    </div>
                </section>
            </section>
            <div
                className={`mb-10 flex justify-center ${
                    !token ? 'hidden' : 'flex'
                }`}
            >
                <button
                    className="h-16 w-48 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white"
                    onClick={(): Promise<boolean> =>
                        router.push('/account/orders')
                    }
                >
                    Leave us a review
                </button>
            </div>

            {/* Link reviews to db later */}
            <div className="flex justify-evenly m:flex-col">
                <div className="flex w-full justify-center pb-10">
                    <Review />
                </div>
                <div className="flex w-full justify-center">
                    <Review />
                </div>
            </div>
        </section>
    );
}

interface reviewColumnProps {
    number: number;
    positive?: boolean;
}

function ReviewColumn({ number, positive }: reviewColumnProps): JSX.Element {
    return (
        <div className="flex items-center">
            <h3 className="text-grey">{number}</h3>
            <div
                className={`ml-2 h-2.5 w-96 rounded-xl ${
                    positive ? 'bg-yellow' : 'bg-lightgrey'
                } 2xs:w-80 3xs:w-64`}
            ></div>
        </div>
    );
}

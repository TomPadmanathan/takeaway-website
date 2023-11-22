// React/Next
import Image from 'next/image';
import { useRouter } from 'next/router';

// Assets
import Star from '@/assets/img/star.png';

// Types/Interfaces
import { NextRouter } from 'next/router';

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

export default function Reviews(): JSX.Element {
    const router: NextRouter = useRouter();
    return (
        <section className="m-10 mb-20">
            <center>
                <h2 className="mb-10 text-xl">
                    What do our customers think about us?
                </h2>
            </center>

            {/* Link to backend review db */}
            <section className="mb-10 flex justify-center sm:flex-col">
                <section className="block justify-center text-center">
                    <h2 className="mb-4 text-5xl text-grey">4.6</h2>
                    <div className="mb-4 flex justify-center">
                        <Image src={Star} className="w-4" alt={'star'} />
                        <Image src={Star} className="w-4" alt={'star'} />
                        <Image src={Star} className="w-4" alt={'star'} />
                        <Image src={Star} className="w-4" alt={'star'} />
                        <Image src={Star} className="w-4" alt={'star'} />
                    </div>
                    <h2 className="text-grey">20 reviews</h2>
                </section>
                <section className="ml-10 flex justify-center sm:ml-0 sm:mt-2">
                    <div className="flex-col">
                        <ReviewColumn number={5} positive />
                        <ReviewColumn number={4} />
                        <ReviewColumn number={3} />
                        <ReviewColumn number={2} />
                        <ReviewColumn number={1} />
                    </div>
                </section>
            </section>
            <center className="mb-10">
                <button
                    className="m-0 h-10 rounded border-[3px] border-grey px-10 font-bold text-pink"
                    onClick={(): Promise<boolean> => router.push('/reviews')}
                >
                    See more reviews
                </button>
            </center>

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

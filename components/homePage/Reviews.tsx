// React/Next
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Assets
import { HiStar } from 'react-icons/hi';

// Types/Interfaces
import { NextRouter } from 'next/router';

// Database Models
import Review from '@/database/models/Review';

export default function Reviews(): JSX.Element {
    const [token, setToken] = useState<boolean>(false);
    const router: NextRouter = useRouter();
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [ratings, setRatings] = useState<number[]>(new Array(5).fill(0));

    useEffect((): void => {
        async function fetchReviews(): Promise<void> {
            const response: Response = await fetch(
                '/api/reviews/get-homepage-review-data',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const responseJson = await response.json();
            if (!response.ok) {
                console.error(responseJson.error);
                return;
            }
            setRatings(responseJson.reviewRatings);
            setReviews(responseJson.reviews);
        }
        fetchReviews();
    }, []);

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
            <ReviewSummary reviewRatings={ratings} />
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

            <div className="flex justify-evenly m:flex-col">
                {reviews?.map((review: Review, index: number) => (
                    <div
                        className={`flex w-full justify-center ${
                            !index && 'pb-10'
                        }`}
                        key={index}
                    >
                        <ReviewComponent
                            timestamp={+review.timestamp}
                            name={
                                review.order.user.forename +
                                ' ' +
                                review.order.user.surname
                            }
                            stars={review.rating}
                            message={review.message}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

interface reviewProps {
    stars: 1 | 2 | 3 | 4 | 5;
    name: string;
    timestamp: number;
    message: string;
}

function ReviewComponent({
    stars,
    name,
    timestamp,
    message,
}: reviewProps): JSX.Element {
    return (
        <div className="w-96">
            <h2 className="pb-2 text-3xl text-pink">{name}</h2>
            <span className="flex">
                {new Array(stars)
                    .fill(0)
                    .map((element: number, index: number) => (
                        <HiStar size={24} color="gold" key={index} />
                    ))}

                <span className="pl-2 text-grey">
                    {getTimeSince(timestamp)}
                </span>
            </span>
            <h2 className="text-lg text-pink">Verified customer</h2>

            <p className="text-darkgrey">{message}</p>
        </div>
    );
}

interface reviewSummaryProps {
    reviewRatings: number[];
}

function ReviewSummary({ reviewRatings }: reviewSummaryProps): JSX.Element {
    function getTotalReviews(reviews: number[]): number {
        let total = 0;
        reviews.forEach((rating: number): void => {
            total += rating;
        });
        return total;
    }
    const totalReviews: number = getTotalReviews(reviewRatings);

    function getAverageReviews(reviews: number[]): number {
        let totalStars: number = 0;
        let totalReviews: number = 0;

        for (let i: number = 0; i < reviews.length; i++) {
            totalStars += (i + 1) * reviews[i];
            totalReviews += reviews[i];
        }

        const averageRating: number = totalStars / totalReviews;
        if (!averageRating) return 0;
        return Math.round(averageRating * 100) / 100;
    }

    const averageRating: number = getAverageReviews(reviewRatings);

    function getRatingPercent(reviews: number[], index: number): number {
        return (reviews[reviews.length - index - 1] / totalReviews) * 100;
    }

    return (
        <section className="mb-10 flex justify-center sm:flex-col">
            <section className="block justify-center text-center">
                <h2 className="mb-4 text-5xl text-grey">{averageRating}</h2>
                <div className="mb-4 flex justify-center">
                    {new Array(Math.round(averageRating))
                        .fill(0)
                        .map((element: number, index: number) => (
                            <HiStar size={22} color="gold" key={index} />
                        ))}
                </div>
                <h2 className="text-grey">{totalReviews} reviews</h2>
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
                                    ratingPercent={getRatingPercent(
                                        reviewRatings,
                                        index
                                    )}
                                    number={array.length - index}
                                    key={index}
                                />
                            )
                        )}
                </div>
            </section>
        </section>
    );
}

interface reviewColumnProps {
    number: number;
    ratingPercent: number;
}

function ReviewColumn({
    number,
    ratingPercent,
}: reviewColumnProps): JSX.Element {
    return (
        <div className="flex items-center">
            <h3 className="text-grey">{number}</h3>
            <div className="ml-2 h-2.5 w-96 overflow-hidden rounded-xl bg-lightgrey 2xs:w-80 3xs:w-64">
                <div
                    style={{ width: ratingPercent + '%' }}
                    className={`h-full rounded-xl bg-yellow`}
                />
            </div>
        </div>
    );
}
function getTimeSince(timestamp: number) {
    const now: number = new Date().getTime();
    const difference: number = now - timestamp;

    const seconds: number = Math.floor(difference / 1000);
    let timeAgo: string;

    switch (true) {
        case seconds < 60:
            timeAgo = 'less than a minute ago';
            break;
        case seconds < 3600:
            const minutes = Math.floor(seconds / 60);
            timeAgo = `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
            break;
        case seconds < 86400:
            const hours = Math.floor(seconds / 3600);
            timeAgo = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
            break;
        case seconds < 2592000:
            const days = Math.floor(seconds / 86400);
            timeAgo = `${days} day${days !== 1 ? 's' : ''} ago`;
            break;
        case seconds < 31536000:
            const months = Math.floor(seconds / 2592000);
            timeAgo = `${months} month${months !== 1 ? 's' : ''} ago`;
            break;
        default:
            const years = Math.floor(seconds / 31536000);
            timeAgo = `${years} year${years !== 1 ? 's' : ''} ago`;
            break;
    }
    return timeAgo;
}

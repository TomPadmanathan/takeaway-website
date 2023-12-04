// Components
import AdminNav from '@/components/adminDashboard/AdminNav';
import BottomNav from '@/components/page/nav/BottomNav';
import Footer from '@/components/page/Footer';
import TableCell from '@/components/adminDashboard/TableCell';

// React/Next
import { useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

// Utils
import fetchWithToken from '@/utils/JWT/fetchWithToken';
import getDateFromTimestamp from '@/utils/getDateFromTimestamp';
import formatPrice from '@/utils/formatPrice';

// Database Models
import Review from '@/database/models/Review';

export default function Users(): JSX.Element {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect((): void => {
        async function fetchData(): Promise<void> {
            const response: Response = await fetchWithToken(
                '/api/reviews/get-all-reviews',
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
            if (!responseJson.reviews) {
                console.error('Reviews not defined');
                return;
            }

            setReviews(responseJson.reviews);
        }
        fetchData();
    }, []);

    const tableHeadings: string[] = [
        'Review Date',
        'Name',
        'User Id',
        'Order Id',
        'Rating',
        'Message',
        'Change Status',
        'Status',
        'Order Price',
    ];

    return (
        <>
            <div className="min-h-screen">
                <BottomNav />
                <AdminNav />
                <div className="mb-10 flex justify-center text-center text-grey">
                    <div className="overflow-hidden rounded shadow-lg">
                        <table className="border-4 border-white bg-white">
                            <thead className="border-grey">
                                <tr>
                                    {tableHeadings.map(
                                        (element: string, index: number) => (
                                            <TableCell key={index} border>
                                                {element}
                                            </TableCell>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map(
                                    (review: Review, index: number) => (
                                        <tr key={index}>
                                            {tableHeadings.map(
                                                (heading: string) => (
                                                    <TableData
                                                        review={review}
                                                        heading={heading}
                                                        key={heading}
                                                    />
                                                )
                                            )}
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

interface props {
    review: Review;
    heading: string;
}

function TableData({ review, heading }: props): JSX.Element | null {
    const router: NextRouter = useRouter();
    let returnData: string | JSX.Element | null = null;

    switch (heading) {
        case 'Review Date':
            returnData = getDateFromTimestamp(+review.timestamp);
            break;
        case 'Name':
            returnData =
                review.order.user.forename + ' ' + review.order.user.surname;
            break;
        case 'User Id':
            return (
                <TableCell
                    onClick={() =>
                        navigator.clipboard.writeText(review.order.userId)
                    }
                >
                    {review.order.userId}
                </TableCell>
            );
        case 'Order Id':
            return (
                <TableCell
                    onClick={() => router.push('/orders/' + review.orderId)}
                >
                    {review.orderId}
                </TableCell>
            );
        case 'Rating':
            returnData = String(review.rating);
            break;
        case 'Message':
            returnData = review.message;
            break;
        case 'Change Status':
            return (
                <TableCell onClick={() => console.log('change status')}>
                    {review.status === 'pending' ? 'Accept' : ''}
                </TableCell>
            );
        case 'Status':
            returnData = review.status;
            break;
        case 'Order Price':
            returnData = '£' + formatPrice(review.order.totalPayment / 100);
            break;
    }

    if (returnData) return <TableCell>{returnData}</TableCell>;
    return <TableCell>{null}</TableCell>;
}

// Packages
import Jwt, { JwtPayload } from 'jsonwebtoken';
import sequelize from '@/database/sequelize';

// Types/Interfaces
import type { NextApiRequest, NextApiResponse } from 'next';

// Database Models
import User from '@/database/models/User';
import Review from '@/database/models/Review';
import Order from '@/database/models/Order';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> {
    response.status(200);
    if (request.method !== 'GET') {
        response.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        await sequelize.sync();

        const reviews: Review[] = await Review.findAll({
            include: [
                {
                    model: Order,
                    attributes: ['userId'],
                    include: [
                        {
                            model: User,
                            attributes: ['forename', 'surname'],
                        },
                    ],
                },
            ],
        });
        let reviewRatings: number[] = [0, 0, 0, 0, 0];
        reviews.forEach((review: Review): void => {
            reviewRatings[review.rating - 1]++;
        });

        response.json({
            reviewRatings: reviewRatings,
            reviews: getTopTwoReviews(bubbleSort(reviews)),
        });
    } catch (error: unknown) {
        response.status(500).json({ error: 'Sequlize error' });
    }
}

function bubbleSort(reviews: Review[]): Review[] {
    for (let i = 0; i < reviews.length; i++) {
        for (let j = 0; j < reviews.length - i - 1; j++) {
            if (reviews[j + 1].rating < +reviews[j].rating) {
                [reviews[j + 1], reviews[j]] = [reviews[j], reviews[j + 1]];
            }
        }
    }
    return reviews;
}

function getTopTwoReviews(reviews: Review[]): Review[] {
    let topReviews = [];

    // Sort reviews by rating in descending then by timestamp in decending
    reviews.sort((reviewA: Review, reviewB: Review): number => {
        if (reviewB.rating !== reviewA.rating) {
            return reviewB.rating - reviewA.rating; // Sort rating descending order
        }
        return +reviewB.timestamp - +reviewA.timestamp; // Sort timestamp decending order
    });

    // find top resutls
    for (let i = 0; i < Math.min(2, reviews.length); i++) {
        topReviews.push(reviews[i]);
    }

    return topReviews;
}

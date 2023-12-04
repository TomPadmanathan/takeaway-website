// React/Next
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Assets
import Logo from '@/assets/img/logo.png';

// Types/Interfaces
import { NextRouter } from 'next/router';

// Packages
import jwt from 'jsonwebtoken';

const buttonStyles: string =
    'h-16 w-48 rounded-sm bg-lightergrey px-3 text-grey transition-all hover:bg-lightgrey hover:text-white mx-2 sm:my-2 2xs:w-40 ';

export default function LandingSection(): JSX.Element {
    const router: NextRouter = useRouter();

    const [token, setToken] = useState<string | null>();
    const [userId, setUserId] = useState<string>();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;
        setToken(token);
        interface decodedToken {
            userId: string;
            iat: number;
            exp: number;
        }
        const decodedToken: any = jwt.decode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
    }, [token]);

    return (
        <section className="bg-image px-64 pb-0 2xl:px-52 xl:px-40 l:px-32 m:px-16 sm:px-0">
            <div className="grid place-items-center text-center">
                <Image
                    src={Logo}
                    className="w-72 py-16 invert filter"
                    alt={'site-icon'}
                />

                <div className="hidden w-full justify-around sm:flex 2xs:block">
                    <button
                        className={buttonStyles}
                        onClick={(): Promise<boolean> => router.push('/order')}
                    >
                        Order Now
                    </button>

                    {token ? (
                        <button
                            className={buttonStyles}
                            onClick={(): Promise<boolean> =>
                                router.push('/users/' + userId)
                            }
                        >
                            Go to Account
                        </button>
                    ) : (
                        <button
                            className={buttonStyles}
                            onClick={(): Promise<boolean> =>
                                router.push('/auth/login')
                            }
                        >
                            Login or Register
                        </button>
                    )}
                </div>

                <section className="mt-10 rounded-xl rounded-b-none border-4 border-b-0 border-white bg-gradient-to-r from-lightpink to-pink px-20 l:px-10 sm:rounded-none sm:border-x-0 xs:px-6 2xs:px-4 ">
                    <h2 className="pb-4 pt-6 text-3xl text-white">
                        Welcome to Takeawaysite
                    </h2>
                    <p className="pb-10 text-lg leading-10 text-lightgrey m:leading-8">
                        Welcome to {process.env.NEXT_PUBLIC_SITE_NAME}, your
                        gateway to the vibrant flavors of South East and East
                        Asia! Immerse yourself in a culinary journey featuring
                        authentic dishes from China, Japan and beyond. Explore
                        our carefully curated menu and order online for a
                        seamless dining experience. From sushi to Thai curries,
                        savor the essence of Asian cuisine from the comfort of
                        your home. Join us at{' '}
                        {process.env.NEXT_PUBLIC_SITE_NAME}, where every bite is
                        a taste of tradition and innovation. Bon appétit!
                    </p>
                </section>
            </div>
        </section>
    );
}

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
            <center>
                <Image
                    src={Logo}
                    className="border-black w-72 border py-16 invert filter "
                    alt={'site-icon'}
                />

                <div className="hidden sm:block">
                    <button
                        className="mx-5 h-10 w-52 rounded border-[3px] border-blue bg-white px-10 font-bold text-pink sm:mb-5 sm:px-5"
                        onClick={(): Promise<boolean> => router.push('/order')}
                    >
                        Order Now
                    </button>

                    {token ? (
                        <button
                            className="mx-5 h-10 w-60 rounded border-[3px] border-blue bg-white px-10 font-bold text-pink m:px-5"
                            onClick={(): Promise<boolean> =>
                                router.push('/users/' + userId)
                            }
                        >
                            Go to Account
                        </button>
                    ) : (
                        <button
                            className="mx-5 h-10 w-60 rounded border-[3px] border-blue bg-white px-10 font-bold text-pink m:px-5"
                            onClick={(): Promise<boolean> =>
                                router.push('/auth/login')
                            }
                        >
                            Login or Register
                        </button>
                    )}
                </div>

                <section className="mt-10 rounded-xl rounded-b-none border-4 border-b-0 border-blue bg-pink px-20 l:px-10 sm:rounded-none sm:border-x-0 xs:px-6 2xs:px-4 ">
                    <h2 className="pb-4 pt-6 text-3xl text-white">
                        Welcome to Takeawaysite
                    </h2>
                    <p className="pb-10 text-lg leading-10 m:leading-8">
                        Irure qui incididunt dolore proident Lorem duis
                        exercitation dolore sit elit amet. Cupidatat eu amet ut
                        velit elit nostrud proident sit quis irure excepteur
                        sit. Lorem nostrud non amet proident Lorem qui esse
                        amet. Excepteur laborum dolore velit eu enim. Quis ad do
                        adipisicing ex qui. Fugiat voluptate nisi non commodo et
                        cupidatat dolore amet laboris officia reprehenderit
                        fugiat. Elit pariatur eu velit reprehenderit est dolor
                        reprehenderit sit.
                    </p>
                </section>
            </center>
        </section>
    );
}

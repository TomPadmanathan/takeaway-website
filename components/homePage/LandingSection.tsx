// React/Next
import Image from 'next/image';
import { useRouter } from 'next/router';

// Assets
import Logo from '@/assets/img/logo.png';

// Types/Interfaces
import { NextRouter } from 'next/router';

export default function LandingSection(): JSX.Element {
    const router: NextRouter = useRouter();

    return (
        <section className="bg-image px-64 pb-0 2xl:px-52 xl:px-40 l:px-32 m:px-16 sm:px-0">
            <center>
                <Image
                    src={Logo}
                    className="border-black w-72 border py-16 invert filter "
                    alt={'site-icon'}
                />
                <button
                    className="h-14 rounded-lg border-[3px] border-white bg-blue px-10 text-lg font-bold text-white"
                    onClick={(): Promise<boolean> => router.push('/order')}
                >
                    Order Now
                </button>

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

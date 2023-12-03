// React/Next
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Account(): JSX.Element {
    const router: NextRouter = useRouter();
    useEffect(() => {
        router.push('/account/account-details');
    }, []);
    return <></>;
}

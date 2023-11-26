// Types/Interfaces
import { NextRouter } from 'next/router';

// Utils
import isValidURL from '@/utils/isValidURL';

export default function getUrlFromQueryParams(
    router: NextRouter
): string | null {
    const URL: string | string[] | undefined = router.query.url;
    if (typeof URL === 'string') {
        if (!isValidURL(URL)) return null;
        return URL;
    }
    return null;
}

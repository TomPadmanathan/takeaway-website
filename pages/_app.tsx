import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AppProvider } from '@/context/AppContext';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </>
    );
}

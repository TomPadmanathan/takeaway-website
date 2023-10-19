// CSS
import '@/styles/globals.css';

// Context
import { AppProvider } from '@/context/AppContext';

// Types/Interfaces
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </>
    );
}

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '@/components/Navbar';
import { AppProvider } from '../context/AppContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <AppProvider>
                <Navbar />
                <Component {...pageProps} />
            </AppProvider>
        </>
    );
}

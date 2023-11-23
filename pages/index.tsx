// Components
import TopNav from '@/components/page/nav/TopNav';
import BottomNav from '@/components/page/nav/BottomNav';
import Footer from '@/components/page/Footer';
import Reviews from '@/components/homePage/Reviews';
import CateringService from '@/components/homePage/CateringService';
import LandingSection from '@/components/homePage/LandingSection';
import { useEffect, useState } from 'react';

export default function Home(): JSX.Element {
    return (
        <>
            <TopNav />
            <BottomNav />
            <LandingSection />
            <Reviews />
            <CateringService />
            <Footer />
        </>
    );
}

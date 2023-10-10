import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Products from '@/components/Products';
import { products } from '@/interfaces/products';
import { config } from '@/interfaces/config';

export async function getServerSideProps() {
    const productsRes: Response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/products'
    );
    const productsData: products = await productsRes.json();

    const configRes: Response = await fetch(
        // process.env.NEXT_PUBLIC_URL + '/api/config'
        'https://takeaway-website.vercel.app/api/config'
    );
    const configData: config = await configRes.json();
    return {
        props: {
            productsData,
            configData,
        },
    };
}

interface props {
    productsData: products;
    configData: config;
}

export default function Home({ productsData, configData }: props) {
    const [search, setSearch] = useState<string>('');

    return (
        <>
            <Navbar search={[search, setSearch]} configData={configData} />
            <main>
                <Products search={search} products={productsData} />
            </main>
        </>
    );
}

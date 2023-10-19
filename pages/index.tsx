// React/Next
import React, { useState } from 'react';

// Components
import Navbar from '@/components/Navbar';
import Products from '@/components/Products';

// Types/Interfaces
import { products } from '@/interfaces/products';
import { config } from '@/interfaces/config';

interface props {
    productsData: products;
    configData: config;
}

interface getServerSideProps {
    props: props;
}

export async function getServerSideProps(): Promise<getServerSideProps> {
    const productsRes: Response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/products'
    );
    const productsData: products = await productsRes.json();

    const configRes: Response = await fetch(
        process.env.NEXT_PUBLIC_URL + '/api/config'
    );
    const configData: config = await configRes.json();
    return {
        props: {
            productsData,
            configData,
        },
    };
}

export default function Home({ productsData, configData }: props): JSX.Element {
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

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Products from '@/components/Products';
import { products } from '@/interfaces/products';

interface props {
    productsData: products;
    configData: any;
}

export async function getServerSideProps() {
    const productsRes = await fetch('http://localhost:3000/api/products');
    const productsData: products = await productsRes.json();

    const configRes = await fetch('http://localhost:3000/api/config');
    const configData = await configRes.json();
    return {
        props: {
            productsData,
            configData,
        },
    };
}

export default function Home({ productsData, configData }: props) {
    const [search, setSearch] = useState<string>('');

    return (
        <>
            <Navbar search={[search, setSearch]} configData={configData} />
            <main>
                <Products search={[search, setSearch]} data={productsData} />
            </main>
        </>
    );
}

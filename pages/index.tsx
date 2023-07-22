import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Products from '@/components/Products';

export async function getServerSideProps() {
    const productsRes = await fetch('http://localhost:3000/api/products');
    const productsData = await productsRes.json();

    const configRes = await fetch('http://localhost:3000/api/config');
    const configData = await configRes.json();
    return {
        props: {
            productsData,
            configData,
        },
    };
}

export default function Home({ productsData, configData }: any) {
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

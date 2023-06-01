import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Products from '@/components/Products';

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/products');
    const data = await res.json();
    return {
        props: {
            data,
        },
    };
}

export default function Home({ data }: any) {
    const [search, setSearch] = useState('');

    return (
        <>
            <Navbar search={[search, setSearch]} />
            <Products search={[search, setSearch]} data={data} />
        </>
    );
}

import ProductTab from '@/components/ProductTab';
import React, { useState } from 'react';
import ProductNav from '@/components/ProductNav';

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
    const [activeProductNav, setActiveProductNav] = useState('popular');

    return (
        <>
            <ProductNav
                activeProductNav={[activeProductNav, setActiveProductNav]}
            />

            <div className="flex justify-center">
                <div className="grid grid-cols-5 gap-5">
                    {data.map((e: any) =>
                        e.category.includes(activeProductNav) ? (
                            <ProductTab data={e} key={e.product} />
                        ) : null
                    )}
                </div>
            </div>
        </>
    );
}

import ProductTab from '@/components/ProductTab';
import React, { useState } from 'react';

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
    // const [category, setCategory] = useState('popular');

    return (
        <>
            <div className="flex justify-center">
                <div className="grid grid-cols-5 gap-5">
                    {data.map((e: any, i: number) =>
                        e.category.includes('popular') ? (
                            <ProductTab
                                product={e.product}
                                image={e.image}
                                price={e.price}
                                key={i}
                            />
                        ) : null
                    )}
                </div>
            </div>
        </>
    );
}

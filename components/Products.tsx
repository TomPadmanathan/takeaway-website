import ProductTab from '@/components/ProductTab';
import { useState } from 'react';
import ProductNav from '@/components/ProductNav';
import { productNavButtons } from '@/interfaces/productNav';
import { products, product } from '@/interfaces/products';

interface props {
    search: string;
    products: products;
}

export default function Products(props: props) {
    const [activeProductNav, setActiveProductNav] =
        useState<productNavButtons>('popular');
    const search: string = props.search;

    let filteredData = search
        ? props.products.filter((element: product): boolean => {
              const productName = element.product.toLowerCase();
              const category = element.category
                  .map((currentValue: string) => currentValue.toLowerCase())
                  .join(' ');
              return (
                  productName.includes(search.toLowerCase()) ||
                  category.includes(search.toLowerCase())
              );
          })
        : props.products.filter((element: product) =>
              element.category.includes(activeProductNav)
          );

    return (
        <>
            {search ? null : (
                <ProductNav
                    activeProductNav={[activeProductNav, setActiveProductNav]}
                />
            )}

            <div className="flex justify-center">
                <div className="grid grid-cols-5 gap-5">
                    {filteredData.map((element: product) => (
                        <ProductTab product={element} key={element.product} />
                    ))}
                </div>
            </div>
        </>
    );
}

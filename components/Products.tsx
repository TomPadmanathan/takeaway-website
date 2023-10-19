// React/Next
import { useState } from 'react';

// Components
import ProductTab from '@/components/ProductTab';
import ProductNav from '@/components/ProductNav';

// Types/Interfaces
import { productNavButton } from '@/interfaces/productNav';
import { products, product } from '@/interfaces/products';

interface props {
    search: string;
    products: products;
}

function searchProducts(
    query: string,
    products: products,
    activeProductNav: productNavButton
): products {
    return query
        ? products.filter((element: product): boolean => {
              const productName: string = element.product.toLowerCase();
              const category: string = element.category
                  .map((currentValue: string): string =>
                      currentValue.toLowerCase()
                  )
                  .join(' ');
              return (
                  productName.includes(query.toLowerCase()) ||
                  category.includes(query.toLowerCase())
              );
          })
        : products.filter((element: product): boolean =>
              element.category.includes(activeProductNav)
          );
}

export default function Products(props: props): JSX.Element {
    const [activeProductNav, setActiveProductNav] =
        useState<productNavButton>('popular');
    const search: string = props.search;

    const filteredData = searchProducts(
        search,
        props.products,
        activeProductNav
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
                    {filteredData.map(
                        (element: product): JSX.Element => (
                            <ProductTab
                                product={element}
                                key={element.product}
                            />
                        )
                    )}
                </div>
            </div>
        </>
    );
}

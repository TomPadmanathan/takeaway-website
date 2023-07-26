import ProductTab from '@/components/ProductTab';
import { useState } from 'react';
import ProductNav from '@/components/ProductNav';

export default function Products(props: any) {
    const [activeProductNav, setActiveProductNav] = useState('popular');
    const [search, setSearch] = props.search;

    let filteredData = search
        ? props.products.filter((element: any) => {
              const productName = element.product.toLowerCase();
              const category = element.category
                  .map((currentValue: string) => currentValue.toLowerCase())
                  .join(' ');

              return (
                  productName.includes(search.toLowerCase()) ||
                  category.includes(search.toLowerCase())
              );
          })
        : props.products.filter((element: any) =>
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
                    {filteredData.map((element: any) => (
                        <ProductTab product={element} key={element.product} />
                    ))}
                </div>
            </div>
        </>
    );
}

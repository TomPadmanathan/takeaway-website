// import ProductTab from './ProductTab';
// import { useState } from 'react';
// import ProductNav from './ProductNav';

// export default function Products(props: any) {
//     const [activeProductNav, setActiveProductNav] = useState('popular');
//     const [search, setSearch] = props.search;

//     return (
//         <>
//             {search ? null : (
//                 <ProductNav
//                     activeProductNav={[activeProductNav, setActiveProductNav]}
//                 />
//             )}

//             <div className="flex justify-center">
//                 <div className="grid grid-cols-5 gap-5">
//                     {search
//                         ? props.data.map((e: any) => (
//                               <ProductTab data={e} key={e.product} />
//                           ))
//                         : props.data.map((e: any) =>
//                               e.category.includes(activeProductNav) ? (
//                                   <ProductTab data={e} key={e.product} />
//                               ) : null
//                           )}
//                 </div>
//             </div>
//         </>
//     );
// }
import ProductTab from './ProductTab';
import { useState } from 'react';
import ProductNav from './ProductNav';

export default function Products(props: any) {
    const [activeProductNav, setActiveProductNav] = useState('popular');
    const [search, setSearch] = props.search;

    let filteredData = search
        ? props.data.filter((e: any) => {
              const productName = e.product.toLowerCase();
              const category = e.category
                  .map((c: string) => c.toLowerCase())
                  .join(' ');

              return (
                  productName.includes(search.toLowerCase()) ||
                  category.includes(search.toLowerCase())
              );
          })
        : props.data.filter((e: any) => e.category.includes(activeProductNav));

    return (
        <>
            {search ? null : (
                <ProductNav
                    activeProductNav={[activeProductNav, setActiveProductNav]}
                />
            )}

            <div className="flex justify-center">
                <div className="grid grid-cols-5 gap-5">
                    {filteredData.map((e: any) => (
                        <ProductTab data={e} key={e.product} />
                    ))}
                </div>
            </div>
        </>
    );
}

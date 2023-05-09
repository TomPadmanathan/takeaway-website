import ProductNavButton from './ProductNavButton';

export default function ProductNav(props: any) {
    const productNavButtons = [
        { title: 'popular' },
        { title: 'chinese' },
        { title: 'japanese' },
        { title: 'korean' },
        { title: 'indonesian' },
        { title: 'thai' },
    ];

    return (
        <>
            <div className="flex justify-center mb-10">
                {productNavButtons.map(button => (
                    <ProductNavButton
                        key={button.title}
                        title={button.title}
                        setActiveProductNav={props.setActiveProductNav}
                        activeProductNav={props.activeProductNav}
                    />
                ))}
            </div>
        </>
    );
}

import ProductNavButton from '@/components/ProductNavButton';

export default function ProductNav(props: any) {
    const [activeProductNav, setActiveProductNav] = props.activeProductNav;

    const productNavButtons = [
        'popular',
        'chinese',
        'japanese',
        'korean',
        'indonesian',
        'thai',
    ];

    return (
        <>
            <div className="mb-10 flex justify-center">
                {productNavButtons.map(button => (
                    <ProductNavButton
                        key={button}
                        title={button}
                        activeProductNav={[
                            activeProductNav,
                            setActiveProductNav,
                        ]}
                    />
                ))}
            </div>
        </>
    );
}

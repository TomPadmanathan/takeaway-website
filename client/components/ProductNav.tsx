import ProductNavButton from '@/components/ProductNavButton';

export default function ProductNav(props: any) {
    const [activeProductNav, setActiveProductNav] = props.activeProductNav;

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
            <div className="mb-10 flex justify-center">
                {productNavButtons.map(button => (
                    <ProductNavButton
                        key={button.title}
                        title={button.title}
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

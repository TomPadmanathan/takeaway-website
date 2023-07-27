import ProductNavButton from '@/components/ProductNavButton';

type productNavButtons =
    | 'popular'
    | 'chinese'
    | 'japanese'
    | 'korean'
    | 'indonesian'
    | 'thai';

interface props {
    activeProductNav: [
        activeProductNav: productNavButtons,
        setActiveProductNav: React.Dispatch<
            React.SetStateAction<productNavButtons>
        >
    ];
}

export default function ProductNav(props: props) {
    const [activeProductNav, setActiveProductNav] = props.activeProductNav;

    const productNavButtons: string[] = [
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
                {productNavButtons.map((button: string) => (
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

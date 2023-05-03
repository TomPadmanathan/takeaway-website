import ProductTab from '@/components/ProductTab';
import Black from '@/assets/img/black.png';

export default function Home() {
    return (
        <>
            <ProductTab name="Chicken" image={Black} price={10.5} />
            <ProductTab name="Chicken" image={Black} price={10.5} />
            <ProductTab name="Chicken" image={Black} price={10.5} />
            <ProductTab name="Chicken" image={Black} price={10.5} />
            <ProductTab name="Chicken" image={Black} price={10.5} />
            <ProductTab name="Chicken" image={Black} price={10.5} />
        </>
    );
}

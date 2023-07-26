export default function formatPrice(price: number): string {
    return price.toLocaleString('en', {
        useGrouping: false,
        minimumFractionDigits: 2,
    });
}

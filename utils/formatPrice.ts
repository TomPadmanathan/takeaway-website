export default function formatPrice(num: number) {
    return num.toLocaleString('en', {
        useGrouping: false,
        minimumFractionDigits: 2,
    });
}

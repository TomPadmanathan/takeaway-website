export default function isolateDateFromDateTime(dateTime: string): string {
    const date: Date = new Date(dateTime);
    const day: number = date.getUTCDate();
    const month: number = date.getUTCMonth() + 1;
    const year: number = date.getUTCFullYear();
    return `${day.toString().padStart(2, '0')}-${month
        .toString()
        .padStart(2, '0')}-${year}`;
}

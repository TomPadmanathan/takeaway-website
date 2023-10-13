export default function getTimeFromTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
}

export default function capitaliseFirstChar(data: string): string {
    const words = data.split(' ');

    for (let i = 0; i < words.length; i++) {
        if (words[i] == 'and') {
            words[i] += ' ';
            continue;
        }
        words[i] = words[i][0].toUpperCase() + words[i].substr(1) + ' ';
    }
    return words.join('');
}

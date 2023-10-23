export default function fetchWithToken(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const token: string | null = localStorage.getItem('token');

    if (token) {
        if (!options.headers) {
            // If options.headers is not defined, create a new Headers object
            options.headers = new Headers();
        } else if (options.headers instanceof Headers) {
            // If options.headers is already a Headers object, you can directly append to it
            (options.headers as Headers).append(
                'Authorization',
                `Bearer ${token}`
            );
        } else if (typeof options.headers === 'object') {
            // If options.headers is a plain object, convert it to a Headers object
            options.headers = new Headers(options.headers);
            (options.headers as Headers).append(
                'Authorization',
                `Bearer ${token}`
            );
        }
    }

    return fetch(url, options);
}

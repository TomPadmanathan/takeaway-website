export default function fetchWithToken(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const token: string | null = localStorage.getItem('token');

    if (token) {
        if (!options.headers) {
            options.headers = new Headers();
        }
        (options.headers as Headers).append('Authorization', `Bearer ${token}`);
    }

    return fetch(url, options);
}

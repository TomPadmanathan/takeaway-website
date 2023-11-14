/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
        colors: {
            blue: '#62AEC5',
            lightblue: '#ADD2E4',
            white: '#ffffff',
            lightpink: '#F678A7',
            pink: '#E64072',
            grey: '#9F9F9F',
            lightgrey: '#D1D1D1',
            yellow: '#F3C811',
        },
        aspectRatio: {
            '4/3': '4 / 3',
        },
    },
    plugins: [],
    'tailwind-class-sorter.classRegex': {
        rescript: [
            'className\\w*?=\\w*("[\\s\\S]+?")|className\\w*?=\\w*?\\{([\\s\\S]+?)\\}',
            '"(.+?)"',
        ],
    },
};

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
            lightergrey: '#F0EFF4',
            grey2: '#545353',
            darkgrey: '#111111',
            yellow: '#FFD700',
            black: '#000000',
            red: '#FF3333',
        },
        aspectRatio: {
            '4/3': '4 / 3',
            '1/1': '1 / 1',
        },
        screens: {
            '5xl': { max: '2400px' },
            '4xl': { max: '2000px' },
            '3xl': { max: '1700px' },
            '2xl': { max: '1535px' },
            xl: { max: '1280px' },
            l: { max: '1120px' },
            m: { max: '980px' },
            ms: { max: '840px' },
            sm: { max: '670px' },
            xs: { max: '540px' },
            '2xs': { max: '480px' },
            '3xs': { max: '380px' },
            '4xs': { max: '340px' },
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

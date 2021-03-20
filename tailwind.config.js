module.exports = {
    prefix: '',
    purge: {
        content: [
            './src/**/*.{html,ts}',
        ]
    },
    darkMode: 'class',
    theme: {
        extend: {},
    },
    variants: {
        opacity: ({ after }) => after(['disabled']),
        extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
};

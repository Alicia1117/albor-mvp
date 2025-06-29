module.exports = {
    content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
                huninn: ['jf-openhuninn', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

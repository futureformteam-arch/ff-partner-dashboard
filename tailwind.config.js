/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                ff: {
                    black: "#0E0E0F",
                    darkGray: "#1F1F22",
                    gray: "#3A3A40",
                    midGray: "#7A7A85",
                    lightGray: "#D7D7DE",
                    offWhite: "#F7F7F9",
                    white: "#FFFFFF",
                    blue: "#1A66FF",
                    amber: "#FFB84D",
                    red: "#E63946",
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
            },
        },
    },
    plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                fitness: {
                    600: '#5A67D8', // Example color for fitness-600
                    800: '#2C3E50', // Example color for fitness-800
                },
            },
        },
    },
    plugins: [],
};
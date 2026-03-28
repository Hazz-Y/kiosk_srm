/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
            },
            colors: {
                dark: {
                    bg: '#121212',
                    card: '#1c1c1c',
                    elevated: '#2a2a2a',
                    secondary: '#1e1e1e',
                },
                accent: {
                    DEFAULT: '#e23744',
                    hover: '#ff4757',
                    glow: 'rgba(226, 55, 68, 0.25)',
                },
                veg: '#3ab757',
                nonveg: '#e23744',
            },
            borderRadius: {
                '2xl': '16px',
                '3xl': '24px',
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.5s ease forwards',
                'slide-up': 'slideUp 0.4s ease forwards',
                'bounce-in': 'bounce-in 0.5s ease forwards',
            },
        },
    },
    plugins: [],
};

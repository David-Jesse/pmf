/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                gray: {
                    750: '#374151',
                    850: '#1f2937'
                }
            },
            fontFamily: {
                sans: ['Geist', 'sans-serif'],
                mono: ['Geist Mono', 'monospace']   
            }
        }
    },
    plugins: [
        require('@tailwindcss/line-clamp')
    ]
}
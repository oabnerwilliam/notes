/** @type {import('tailwindcss').Config} */
export const content: string[] = ["./src/**/*.{js,jsx,ts,tsx}"];
export const safelist: string[] = ['w-10'];
export const theme = {
    extend: {},
};
export const plugins = [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
]  
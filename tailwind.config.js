/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#000000",
        sponsorship: "#f7b6a8",
        ticket_sales: "#ea8772",
        broadcasting: "#de5335",
        merchandising: "#e63711",
        venues: "#99bbe1",
        organization: "#5287c2",
        other: "#2277d7",
      },
    },
  },
  plugins: [],
};

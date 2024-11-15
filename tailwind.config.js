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
        background: "var(--background)",
        foreground: "var(--foreground)",
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

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "apple-cucumber": "#D8DBBD",
        "kings-ransom": "#B59F78",
        "black-powder": "#33372C",
        "dark-olive-green": "#424739",
        "pending-status": "#D9A067", // Muted Sandstone Orange for Pending
        "complete-status": "#A3B18A", // Soft Sage Green for Complete
        "total-status": "#B6B4A5", // Warm Taupe for Total
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};

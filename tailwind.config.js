/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        glow: "glowFrame 5s linear infinite  transition-duration-500 shadow-glow",
      },
      keyframes: {
        glowFrame: {
          "0%": {
            filter: "hue-rotate(0deg)",
          },
          "100%": {
            filter: "hue-rotate(360deg)",
          },
        },
      },
      boxShadow: {
        glowFrame: "0px 0px 5px rgba(255, 255, 255, 0.5)",
      },
      textShadow: {
        glowFrame: "0 0 15px yellow, 0 0 25px yellow",
      },
    },
  },
  plugins: [],
};

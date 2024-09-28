import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
const Config = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#c3ffff",
      "primary-content": "#70579a",
      ...colors,
    }
  },
  plugins: [],
}

export default Config

import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        libre: ['"Roboto"', ...fontFamily.sans]
      },
      colors: {
        'custom-red': '#C80425',
        'custom-blue': '#3782D2',
        'custom-green': '#00F5B8'
      }
    }
  },
  plugins: [],
};

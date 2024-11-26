import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        "primary": "#fff"
      },
      colors:{
        "primary": "#131118",
        "secondary": "#A4A1AA"
      },
      borderWidth:{
        "1": "1px"
      },
      fontFamily:{
        "jost": ["Jost", "sans-serif"]
      },borderColor:{
        "primary": "#131118"
      }
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
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
        "jost": "Jost"
      },borderColor:{
        "primary": "#131118"
      }
    },
  },
  plugins: [],
};
export default config;

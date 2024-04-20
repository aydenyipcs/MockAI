import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tprimary: "hsl(240 5.9% 10%)",
        tsecondary: "hsl(240 4.8% 95.9%)",
        tmuted: "hsl(240, 3.8%, 46.1%)",
        plain: "hsl(0 0% 100%)",
        darkBlue: "#483D8B",
        darkGrey: "#333333",
        medGrey: "#555555",
        teal: '#004d40',
        mint: '#F5FFFA',
        lightBlue: "#0066cc",
        medgreen: "#228B22",
        cyan: "#008B8B",
        yellow: "#bb8c17",
        midGreen: "#004953",
        onyx: "#353839",
        violet: '#5a5d9f',
        lavender: '#f3f2f7',

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

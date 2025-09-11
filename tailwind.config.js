import flowbite from "flowbite/plugin";
import flowbiteReact from "flowbite-react/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    ".flowbite-react/class-list.json",
  ],
  theme: {
    extend: {},
    fontFamily: {
        body: ['Inter', 'sans-serif'], // nome da fonte
      },
  },
  plugins: [flowbite, flowbiteReact],
};

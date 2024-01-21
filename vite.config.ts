import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://ohwellnevermind.github.io/CarRentalUA/",
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});

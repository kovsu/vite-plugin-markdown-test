import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ViteMarkdown from "./src/plugin/index";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ViteMarkdown()],
});

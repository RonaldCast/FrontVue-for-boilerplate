import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import copy from 'rollup-plugin-copy'

export default defineConfig({
  plugins: [vue(), copy({
    targets: [
      { src: "node_modules/@aspnet/signalr/dist/browser/signalr.min.js", dest: "dist" },
      { src: "node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client.js", dest: "dist" },
      { src: "src/lib/abp.js", dest: "dist" },
    ], 
    hook: 'writeBundle' 
  })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

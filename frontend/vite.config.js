import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    server: {
        host: "0.0.0.0",
        watch: {
            usePolling: true,
            interval: 1000, // adjust as needed
        },
        proxy: {
            "/api": {
                target: "http://host.docker.internal:5000",
                changeOrigin: true,
            },
        },
    },
});

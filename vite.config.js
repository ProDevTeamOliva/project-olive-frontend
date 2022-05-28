import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
        port: loadEnv("", ".").VITE_PORT || 3000,
        strictPort: true
    },
    build: {
        outDir: "build",
    },
    test: {
        globals: true,
        environment: "happy-dom",
        setupFiles: "src/setupTests.js",
    },
});

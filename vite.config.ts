import path from "path"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => {
  // Load all env vars from .env, .env.local, etc.
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react()],
    base: "./",
    server: {
      port: 3000,
      proxy: {
        "/api/alpaca": {
          target: "https://data.alpaca.markets",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/alpaca/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              proxyReq.setHeader("APCA-API-KEY-ID", env.ALPACA_KEY_ID || "")
              proxyReq.setHeader(
                "APCA-API-SECRET-KEY",
                env.ALPACA_SECRET_KEY || ""
              )
              // Remove Content-Type for GET requests to avoid preflight
              proxyReq.removeHeader("Content-Type")
            })
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
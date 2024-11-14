import type { ConfigEnv } from "vite";
import process from "node:process";
import { defineConfig, loadEnv } from "vite";
import { createViteProxy } from "./build/config";
import { setupVitePlugins } from "./build/plugins";
import { convertEnv, getRootPath, getSrcPath } from "./build/utils";

// https://vitejs.dev/config/
export default defineConfig((configEnv: ConfigEnv) => {
  const srcPath = getSrcPath();
  const rootPath = getRootPath();
  const viteEnv = convertEnv(loadEnv(configEnv.mode, process.cwd()));
  const { VITE_PORT, VITE_USE_PROXY, VITE_PROXY_TYPE } = viteEnv;
  return {
    plugins: setupVitePlugins(),
    server: {
      open: true,
      proxy: {
        "/api": {
          target: "http://lsyadmarket.youxi123.com",
          changeOrigin: true,
          logLevel: "debug",
          secure: false,
          configure: (proxy, options) => {
            proxy.on("proxyReq", (proxyReq, req, res) => {
              proxyReq.setHeader(
                "Cookie",
                "XSRF-TOKEN=eyJpdiI6ImpyRWw2UTI3ZDJYU0hcL25Oc1NEbDNnPT0iLCJ2YWx1ZSI6IkIxc2g1anVrdG1wWFpoNFlqN1wvaHJja3BzUGUwY3g5WWJVc1hnMU9oY01Xd2FNbERhdElLVEdZQzRPZnFZR1F5YTFvcVBlOWhwTUJRVUJUUTZTejJHdz09IiwibWFjIjoiYjFiOTcwYjIxMzNmMTM4ZjVlZGRiYWI4YmRmNDU2NDFiNzBmNGVkOGU0NGE1ZDgzZjkxMDQ1ZTRmYmNhNTc3NiJ9;hungrystudio_session=eyJpdiI6InZTZ2F2VzNNTlJWRmJzT0U5MjVzMWc9PSIsInZhbHVlIjoiZHRoazZwbTN1V1ZQRGc4WUhXV1BOVUF1bWhWV2JGM1hnT2ZoaHFOcEljSzZSdU5ITlVSMFZnUmhmNWw1SEpPRWtJcExveTRkc3FrYUkzd0wxXC9LT0tnPT0iLCJtYWMiOiJjNWM4ZTE2YTdmZTNiNTlkMGI5ODNmYjNlNzIyYzRiYzMzNGVmZDdkNGIyNDk5NTk4MzRjYjI2MWM4YzJiODVkIn0%3D"
              );
            });
          },
        },
        "/admin": {
          // target: 'http://lsyadmarket.youxi123.com',
          target: "http://t.admarket.youxi123.com",
          changeOrigin: true,
          logLevel: "debug",
          secure: false,
          configure: (proxy, options) => {
            proxy.on("proxyReq", (proxyReq, req, res) => {
              proxyReq.setHeader(
                "Cookie",
                "XSRF-TOKEN=eyJpdiI6ImpyRWw2UTI3ZDJYU0hcL25Oc1NEbDNnPT0iLCJ2YWx1ZSI6IkIxc2g1anVrdG1wWFpoNFlqN1wvaHJja3BzUGUwY3g5WWJVc1hnMU9oY01Xd2FNbERhdElLVEdZQzRPZnFZR1F5YTFvcVBlOWhwTUJRVUJUUTZTejJHdz09IiwibWFjIjoiYjFiOTcwYjIxMzNmMTM4ZjVlZGRiYWI4YmRmNDU2NDFiNzBmNGVkOGU0NGE1ZDgzZjkxMDQ1ZTRmYmNhNTc3NiJ9;hungrystudio_session=eyJpdiI6InZTZ2F2VzNNTlJWRmJzT0U5MjVzMWc9PSIsInZhbHVlIjoiZHRoazZwbTN1V1ZQRGc4WUhXV1BOVUF1bWhWV2JGM1hnT2ZoaHFOcEljSzZSdU5ITlVSMFZnUmhmNWw1SEpPRWtJcExveTRkc3FrYUkzd0wxXC9LT0tnPT0iLCJtYWMiOiJjNWM4ZTE2YTdmZTNiNTlkMGI5ODNmYjNlNzIyYzRiYzMzNGVmZDdkNGIyNDk5NTk4MzRjYjI2MWM4YzJiODVkIn0%3D"
              );
            });
          },
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "content-type",
        },
      },
    },
    envPrefix: ["VITE_", "UNI_"],
    build: {
      target: "es6",
      cssTarget: "chrome61",
      reportCompressedSize: false,
      sourcemap: false,
      chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
      commonjsOptions: {
        ignoreTryCatch: false,
      },
    },
    optimizeDeps: {
      exclude: ["vue-demi"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: `@import '@/styles/variables.scss';`,
        },
      },
    },
    resolve: {
      alias: {
        "~": rootPath,
        "@": srcPath,
      },
    },
  };
});

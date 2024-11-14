import type { ProxyOptions } from "vite";

export function createViteProxy(isUseProxy = true, proxyType: ProxyType) {
  console.log(23);
  if (!isUseProxy) return undefined;
  const proxyConfig = getProxyConfig(proxyType);
  console.log(proxyConfig.target);

  const proxy: Record<string, string | ProxyOptions> = {
    [proxyConfig.prefix]: {
      target: proxyConfig.target,
      changeOrigin: true,
      secure: false,
      rewrite: (path: string) =>
        path.replace(new RegExp(`^${proxyConfig.prefix}`), "/"),
    },
  };
  return proxy;
}
const proxyConfigMappings: Record<ProxyType, ProxyConfig> = {
  dev: {
    prefix: "/api",
    target: "http://lsyadmarket.youxi123.com",
  },
  test: {
    prefix: "/api",
    target: "http://lsyadmarket.youxi123.com",
  },
  prod: {
    prefix: "/api",
    target: "http://lsyadmarket.youxi123.com",
  },
};

export function getProxyConfig(envType: ProxyType = "dev"): ProxyConfig {
  return proxyConfigMappings[envType];
}

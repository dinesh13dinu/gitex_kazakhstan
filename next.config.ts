import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig = {
  images: { remotePatterns: [{ protocol: "https" as const, hostname: "**" }] },
  turbopack: { root: process.cwd() },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 images: {
    remotePatterns: [
      { protocol: "https", hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com", pathname: "/**" },
      { protocol: "https", hostname: "example.com", pathname: "/**" },
      { protocol: "https", hostname: "placecats.com", pathname: "/**" },
    ],
  },
};
export default nextConfig;

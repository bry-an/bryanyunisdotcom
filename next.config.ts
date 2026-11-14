import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Canonical routes in the spec end with a slash: /projects/, /about/, /projects/<slug>/
  trailingSlash: true,
};

export default nextConfig;

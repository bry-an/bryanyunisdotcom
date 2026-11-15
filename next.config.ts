import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Canonical routes in the spec end with a slash: /about/, /projects/<slug>/
  trailingSlash: true,
  // The old Work index duplicated the homepage; its content lives there now.
  async redirects() {
    return [{ source: "/projects", destination: "/#featured-work", permanent: false }];
  },
};

export default nextConfig;

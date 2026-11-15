import type { MetadataRoute } from "next";
import { projects, projectHref } from "@/content/projects";
import { site } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/about/", ...projects.map((p) => projectHref(p.slug))];
  return routes.map((path) => ({ url: new URL(path, site.url).toString() }));
}

import { site } from "@/content/profile";
import { plain } from "@/lib/markdown";
import { ogContentType, ogSize, shareCard } from "@/lib/og";

export const alt = `${site.name}: ${plain(site.role)} ${plain(site.tagline)}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return shareCard({
    eyebrow: "Software engineer · Technical leader",
    title: site.name,
    subtitle: `${plain(site.role)} ${plain(site.tagline)}`,
    titleSize: 150,
  });
}

import { getProject, projects } from "@/content/projects";
import { plain } from "@/lib/markdown";
import { ogContentType, ogSize, shareCard } from "@/lib/og";

export const alt = "A case study by Bryan Yunis";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return shareCard({
    eyebrow: "Case study · Gateless",
    title: project ? plain(project.title) : "Case study",
    subtitle: project ? plain(project.subtitle) : undefined,
    titleSize: 76,
  });
}

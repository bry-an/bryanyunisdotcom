import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProject,
  nextProject,
  projectHref,
  projects,
  projectsInReadingOrder,
  stageFor,
} from "@/content/projects";
import { Inline, Markdown, plain } from "@/lib/markdown";
import { Topics } from "@/components/Topics";
import { IntegrationFigure } from "@/components/IntegrationFigure";
import { Ledger } from "@/components/Ledger";
import { StageMap } from "@/components/StageMap";
import { JsonLd } from "@/components/JsonLd";
import { abs, baseOpenGraph, clip, ids, personLd, websiteLd } from "@/lib/seo";
import styles from "../../pages.module.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  // The summary states problem and outcome; the body's first paragraph is background.
  const description = clip(project.summary);
  const title = plain(project.title);
  return {
    title,
    description,
    alternates: { canonical: projectHref(project.slug) },
    openGraph: {
      ...baseOpenGraph,
      type: "article",
      url: projectHref(project.slug),
      title,
      description,
      authors: [abs("/about/")],
      tags: project.topics.map(plain),
    },
  };
}

type Params = PageProps<"/projects/[slug]">["params"];

/**
 * The App Shell (shared by every case) renders instantly; the slug-dependent
 * content streams inside <Suspense>. Every link into a case uses
 * <Link prefetch>, which resolves `params` ahead of the click, and every slug is
 * prerendered via generateStaticParams, so in practice the fallback is never seen.
 */
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <article className="wrap">
      <p className={styles.back}>
        <Link href="/#featured-work">
          <span aria-hidden="true">← </span>Featured work
        </Link>
      </p>
      <Suspense fallback={<div className={styles.caseFallback} aria-busy="true" />}>
        <CaseStudy params={params} />
      </Suspense>
    </article>
  );
}

async function CaseStudy({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const stage = stageFor(project.stages[0]);
  const next = nextProject(project.slug);
  const wraps = projectsInReadingOrder()[0].slug === next.slug;

  const url = abs(projectHref(project.slug));

  return (
    <>
      <JsonLd
        graph={[
          websiteLd,
          personLd,
          {
            "@type": "Article",
            "@id": `${url}#article`,
            url,
            mainEntityOfPage: url,
            headline: plain(project.title),
            alternativeHeadline: plain(project.subtitle),
            description: plain(project.summary),
            keywords: project.topics.map(plain).join(", "),
            inLanguage: "en-US",
            author: { "@id": ids.person },
            publisher: { "@id": ids.person },
            isPartOf: { "@id": ids.website },
          },
        ]}
      />
      <header className={styles.caseHead}>
        <h1 className={styles.caseTitle}><Inline text={project.title} /></h1>
        <div className={styles.caseMeta}>
          <Topics items={project.topics} />
          <p className={styles.caseStage}>
            <span><Inline text={stage.label} /></span> <Inline text={stage.line} />
          </p>
        </div>
        <div className={styles.caseLedger}>
          <Ledger project={project} size="lg" />
        </div>
      </header>

      <div className={styles.caseBody}>
        <div className={`prose ${styles.caseProse}`}>
          <h2 className={styles.caseSubtitle}><Inline text={project.subtitle} /></h2>
          <Markdown source={project.body} />
        </div>
        {project.slug === "integration-failures" && (
          <aside className={styles.caseAside} aria-label="Diagram">
            <IntegrationFigure />
          </aside>
        )}
      </div>

      <div className={styles.caseNext}>
        <div>
          <p className="eyebrow">{wraps ? "Back to the beginning" : "Next case"}</p>
          <p className={styles.caseNextTitle}>
            <Link href={projectHref(next.slug)} className="title-link" prefetch>
              <Inline text={next.title} />
            </Link>
          </p>
        </div>
        <p>
          <Link href="/about/" className="arrow-link">
            The engineering foundations behind this work
          </Link>
        </p>
      </div>

      <div className={styles.caseMap}>
        <StageMap current={project.slug} />
      </div>
    </>
  );
}

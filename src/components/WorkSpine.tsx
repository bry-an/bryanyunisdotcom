import Link from "next/link";
import { Inline } from "@/lib/markdown";
import {
  projectHref,
  projectsForStage,
  stages,
  type Project,
} from "@/content/projects";
import { Topics } from "./Topics";
import { Ledger } from "./Ledger";
import { IntegrationFigure } from "./IntegrationFigure";
import styles from "./WorkSpine.module.css";

/**
 * The evidence, told as one story: four stages of the engineering lifecycle on a
 * single rail, each node a little fuller than the last (implementation → understanding).
 * Featured work leads each stage at a larger scale; the rest follows in compact form.
 */
export function WorkSpine({ variant = "home" }: { variant?: "home" | "index" }) {
  return (
    <ol className={`${styles.spine} ${variant === "index" ? styles.isIndex : ""}`}>
      {stages.map((stage, i) => (
        <li
          key={stage.id}
          id={`stage-${stage.id}`}
          className={styles.chapter}
          style={{ "--fill": `${(i + 1) * 25}%` } as React.CSSProperties}
        >
          <span className={styles.node} aria-hidden="true" />
          <header className={styles.chapterHead}>
            <p className={styles.label}>
              <span className={styles.num}>0{i + 1}</span> <Inline text={stage.label} />
            </p>
            <h3 className={styles.line}><Inline text={stage.line} /></h3>
            <p className={styles.desc}><Inline text={stage.description} /></p>
          </header>
          <div className={styles.items}>
            {projectsForStage(stage.id).map((p) =>
              variant === "home" ? <HomeItem key={p.slug} project={p} /> : <IndexItem key={p.slug} project={p} />,
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function ReadLink({ project }: { project: Project }) {
  return (
    <p>
      <Link href={projectHref(project.slug)} className="arrow-link" prefetch>
        Read the case<span className="visually-hidden">: <Inline text={project.title} /></span>
      </Link>
    </p>
  );
}

function Title({ project, className }: { project: Project; className: string }) {
  return (
    <h4 id={`w-${project.slug}`} className={className}>
      <Link href={projectHref(project.slug)} className="title-link" prefetch>
        <Inline text={project.title} />
      </Link>
    </h4>
  );
}

function HomeItem({ project }: { project: Project }) {
  const p = project.placement;

  if (p.kind === "featured" && p.role === "lead") {
    return (
      <article className={`${styles.item} ${styles.lead}`} aria-labelledby={`w-${project.slug}`}>
        {/* Text first, as its own band… */}
        <div className={styles.leadText}>
          <Topics items={project.topics} />
          <Title project={project} className={styles.leadTitle} />
          <p className={styles.summaryLg}><Inline text={project.summary} /></p>
          <Ledger project={project} />
        </div>
        {/* …then the graphic beneath it, as an inset. */}
        <IntegrationFigure className={styles.inset} />
        <ReadLink project={project} />
      </article>
    );
  }

  if (p.kind === "featured") {
    return (
      <article className={`${styles.item} ${styles.feature}`} aria-labelledby={`w-${project.slug}`}>
        <Topics items={project.topics} />
        <Title project={project} className={styles.featureTitle} />
        <p className={styles.summary}><Inline text={project.summary} /></p>
        <Ledger project={project} />
        <ReadLink project={project} />
      </article>
    );
  }

  return (
    <article className={`${styles.item} ${styles.compact}`} aria-labelledby={`w-${project.slug}`}>
      <Topics items={project.topics} />
      <Title project={project} className={styles.compactTitle} />
      <p className={styles.summary}><Inline text={project.summary} /></p>
      {project.pullQuote && (
        <blockquote className={styles.pull}>
          <p><Inline text={project.pullQuote} /></p>
        </blockquote>
      )}
      <Ledger project={project} />
      <ReadLink project={project} />
    </article>
  );
}

function IndexItem({ project }: { project: Project }) {
  return (
    <article className={`${styles.item} ${styles.indexItem}`} aria-labelledby={`w-${project.slug}`}>
      <Title project={project} className={styles.compactTitle} />
      <p className={styles.subtitle}><Inline text={project.subtitle} /></p>
      <p className={styles.summary}><Inline text={project.summary} /></p>
      <Ledger project={project} />
      <Topics items={project.topics} />
    </article>
  );
}

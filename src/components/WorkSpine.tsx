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
import styles from "./WorkSpine.module.css";

/**
 * The evidence, told as one story: four stages of the engineering lifecycle on a
 * single rail, each node a little fuller than the last (implementation → understanding).
 * Every case shares one shape and one title size, a step below the stage headings.
 */
export function WorkSpine() {
  return (
    <ol className={styles.spine}>
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
            {projectsForStage(stage.id).map((p) => (
              <HomeItem key={p.slug} project={p} />
            ))}
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

/** The case in a sentence, introduced so the reader knows what they're reading. */
function Summary({ project }: { project: Project }) {
  return (
    <p className={styles.summary}>
      <span className={styles.useCase}>Use case:</span> <Inline text={project.summary} />
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

  if (p.kind === "featured") {
    return (
      <article className={`${styles.item} ${styles.feature}`} aria-labelledby={`w-${project.slug}`}>
        <Topics items={project.topics} />
        <Title project={project} className={styles.featureTitle} />
        <Summary project={project} />
        <Ledger project={project} />
        <ReadLink project={project} />
      </article>
    );
  }

  return (
    <article className={`${styles.item} ${styles.compact}`} aria-labelledby={`w-${project.slug}`}>
      <Topics items={project.topics} />
      <Title project={project} className={styles.compactTitle} />
      <Summary project={project} />
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

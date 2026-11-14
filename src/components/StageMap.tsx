import Link from "next/link";
import { Inline } from "@/lib/markdown";
import { projectHref, projectsForStage, stages } from "@/content/projects";
import styles from "./StageMap.module.css";

/** Where a case sits in the larger story: all four stages, current case marked. */
export function StageMap({ current }: { current: string }) {
  return (
    <nav className={styles.map} aria-labelledby="stagemap-title">
      <h2 id="stagemap-title" className={styles.title}>
        From implementation to understanding
      </h2>
      <ol className={styles.stages}>
        {stages.map((stage, i) => {
          const items = projectsForStage(stage.id);
          const here = items.some((p) => p.slug === current);
          return (
            <li
              key={stage.id}
              className={`${styles.stage} ${here ? styles.here : ""}`}
              style={{ "--fill": `${(i + 1) * 25}%` } as React.CSSProperties}
            >
              <span className={styles.node} aria-hidden="true" />
              <p className={styles.label}>
                <span>0{i + 1}</span> <Inline text={stage.label} />
              </p>
              <ul className={styles.links}>
                {items.map((p) => (
                  <li key={p.slug}>
                    {p.slug === current ? (
                      <span aria-current="page" className={styles.current}>
                        <Inline text={p.title} />
                      </span>
                    ) : (
                      <Link href={projectHref(p.slug)} prefetch>
                        <Inline text={p.title} />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

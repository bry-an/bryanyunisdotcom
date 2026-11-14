import type { Project } from "@/content/projects";
import { Inline } from "@/lib/markdown";
import { ScaleIcon, SparkleIcon } from "./LedgerIcons";
import styles from "./Ledger.module.css";

/**
 * The site's recurring device: every case separates what AI contributed from
 * what my experience brought to it. AI-assisted investigation on one side; the
 * engineering that establishes confidence on the other.
 */
export function Ledger({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  return (
    <dl className={`${styles.ledger} ${size === "lg" ? styles.lg : ""}`}>
      <div className={styles.ai}>
        <dt>
          <SparkleIcon className={styles.icon} />
          With AI
        </dt>
        <dd><Inline text={project.withAI} /></dd>
      </div>
      <div className={styles.experience}>
        <dt>
          <ScaleIcon className={styles.icon} />
          With experience
        </dt>
        <dd><Inline text={project.withExperience} /></dd>
      </div>
    </dl>
  );
}

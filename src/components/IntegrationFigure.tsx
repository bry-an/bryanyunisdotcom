import styles from "./IntegrationFigure.module.css";

/**
 * A text-based diagram of the GSE integration analysis. Every label restates
 * the case study; nothing here adds a claim the narrative doesn't make.
 */
export function IntegrationFigure({ className = "" }: { className?: string }) {
  return (
    <figure className={`${styles.figure} ${className}`}>
      <div className={styles.flow}>
        <div className={styles.inputs}>
          <div className={styles.box}>
            <span className={styles.kicker}>External</span>
            GSE guidelines
          </div>
          <div className={styles.box}>
            <span className={styles.kicker}>Internal</span>
            Canonical data model
          </div>
        </div>
        <div className={styles.arrow} aria-hidden="true" />
        <div className={`${styles.box} ${styles.process}`}>
          <span className={styles.kicker}>AI-assisted</span>
          Systematic comparison across theoretical combinations of loan data and documentation
          requirements
        </div>
        <div className={styles.arrow} aria-hidden="true" />
        <div className={styles.outputs}>
          <div className={`${styles.box} ${styles.finding}`}>Incompatibilities</div>
          <div className={`${styles.box} ${styles.finding}`}>Ambiguous scenarios</div>
        </div>
        <div className={styles.arrow} aria-hidden="true" />
        <div className={`${styles.box} ${styles.outcome}`}>
          Questions raised with the integration partner, before production
        </div>
      </div>
      <figcaption className={styles.caption}>
        How the analysis worked: external guidelines compared against the internal canonical data
        model to find what happy-path testing could overlook.
      </figcaption>
    </figure>
  );
}

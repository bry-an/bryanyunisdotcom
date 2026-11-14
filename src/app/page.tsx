import Link from "next/link";
import { Inline } from "@/lib/markdown";
import {
  aboutHref,
  closingInvite,
  historyIntro,
  introduction,
  rolesChronological,
  signatureLine,
  site,
  strengths,
  thesis,
} from "@/content/profile";
import { WorkSpine } from "@/components/WorkSpine";
import { ScaleIcon, SparkleIcon } from "@/components/LedgerIcons";
import styles from "./home.module.css";

/**
 * Narrative: who (hero) → the idea (approach) → the evidence, told along the
 * engineering lifecycle (work) → the depth it stands on (foundations) → the
 * conclusion, in the site's signature line (closing).
 */
export default function Home() {
  const [first, ...rest] = introduction;

  return (
    <>
      {/* ── Identity ─────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className="wrap grid">
          <h1 id="hero-title" className={styles.name}>
            {site.name}
          </h1>
          <div className={styles.heroLead}>
            <p className={styles.role}><Inline text={site.role} /></p>
            <p className={styles.tagline}><Inline text={site.tagline} /></p>
            <p className={styles.heroAction}>
              <a href="#featured-work" className={styles.primary}>
                Explore featured work
              </a>
            </p>
          </div>
          <dl className={styles.facts}>
            <div>
              <dt>Currently</dt>
              <dd>Technical Lead, Customer Experience · Gateless</dd>
            </div>
            <div>
              <dt>Experience</dt>
              <dd>
                Eight years: full-stack engineer turned technical lead, across a platform built on
                thousands of interconnected business rules
              </dd>
            </div>
            <div>
              <dt>Practice</dt>
              <dd>Software architecture · Product engineering · AI-driven development</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Three strengths: systems, vision, leadership. */}
      <section className={styles.strengths} aria-label="Strengths">
        <div className="wrap">
          <ul className={styles.strengthList}>
            {strengths.map((s) => (
              <li key={s.key} className={styles.strength}>
                <span className={styles.strengthLead}>
                  <Inline text={s.lead} />
                </span>{" "}
                <span className={styles.strengthKey}>
                  <Inline text={s.key} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="approach" className="section" aria-labelledby="approach-title">
        <div className="wrap grid">
          <header className={styles.sideHead}>
            <h2 id="approach-title" className="section-title">
              Approach
            </h2>
          </header>
          <div className={styles.approachBody}>
            <div className={`prose ${styles.approachProse}`}>
              <p>
                <Inline text={first} />
              </p>
              {rest.map((p, i) => (
                <p key={i}>
                  <Inline text={p} />
                </p>
              ))}
            </div>
          </div>

          {/* The thesis, stated once, plainly. Everything below is evidence for it. */}
          <figure className={styles.thesis}>
            <p className={styles.thesisContrast}><Inline text={thesis.contrast} /></p>
            <p className={styles.thesisClaim}><Inline text={thesis.claim} /></p>
            <p className={styles.thesisCaveat}><Inline text={thesis.caveat} /></p>
            <figcaption className={styles.thesisKey}>
              <span className={styles.keyLine}>
                <span className={styles.keyAi}>
                  <SparkleIcon className={styles.keyIcon} />
                  With AI
                </span>{" "}
                the reach to understand more.
              </span>
              <span className={styles.keyLine}>
                <span className={styles.keyExperience}>
                  <ScaleIcon className={styles.keyIcon} />
                  With experience
                </span>{" "}
                the judgment to trust what it finds.
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Evidence ─────────────────────────────────────────── */}
      <section id="featured-work" className="section" aria-labelledby="work-title">
        <div className="wrap">
          <header className={`section-head ${styles.workHead}`}>
            <p className="eyebrow">Featured work · Gateless</p>
            <h2 id="work-title" className="section-title">
              From implementation to understanding
            </h2>
          </header>
          <WorkSpine />
        </div>
      </section>

      {/* ── Breadth: the depth it stands on ──────────────────── */}
      <section id="foundations" className="section" aria-labelledby="foundations-title">
        <div className="wrap">
          <header className={`section-head ${styles.foundationsHead}`}>
            <h2 id="foundations-title" className="eyebrow">
              Engineering foundations
            </h2>
            <p className={styles.foundationsLede}><Inline text={historyIntro} /></p>
          </header>

          <ol className={styles.progression}>
            {rolesChronological().map((r, i) => (
              <li key={r.id} className={styles.stepItem}>
                <p className={styles.step}>
                  <span className={styles.stepNum}>{["I", "II", "III"][i]}</span>
                  <Inline text={r.step} />
                </p>
                <p className={styles.company}>{r.company}</p>
                <h3 className={styles.roleTitle}>
                  <Link href={aboutHref(r.id)} className="title-link">
                    <Inline text={r.title} />
                  </Link>
                </h3>
                <p className={styles.roleBrief}><Inline text={r.brief} /></p>
              </li>
            ))}
          </ol>
          <p className={styles.fullStory}>
            <Link href="/about/" className="arrow-link">
              The full story
            </Link>
          </p>
        </div>
      </section>

      {/* ── Conclusion ───────────────────────────────────────── */}
      <section className={`section ${styles.closing}`} aria-labelledby="closing-title">
        <div className="wrap">
          <h2 id="closing-title" className="visually-hidden">
            In summary
          </h2>
          <blockquote className={styles.signature}>
            <p><Inline text={signatureLine} /></p>
          </blockquote>
          <div className={styles.invite}>
            <p><Inline text={closingInvite} /></p>
            <p className={styles.inviteActions}>
              <Link href="/about/#contact" className={styles.primaryStatic}>
                Get in touch
              </Link>
              <a href={site.linkedin} rel="me noopener" target="_blank" className="arrow-link">
                LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

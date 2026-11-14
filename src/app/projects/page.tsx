import type { Metadata } from "next";
import { WorkSpine } from "@/components/WorkSpine";
import styles from "../pages.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Five case studies from Gateless, across the engineering lifecycle: integration analysis, expert-system verification, incident investigation, product analytics, and technical leadership across the platform.",
  alternates: { canonical: "/projects/" },
  openGraph: { url: "/projects/" },
};

export default function ProjectsIndex() {
  return (
    <div className="wrap">
      <header className={styles.pageHead}>
        <p className="eyebrow">Gateless · Five projects</p>
        <h1 className={styles.pageTitle}>Work</h1>
      </header>

      <section className={styles.block} aria-labelledby="idx-title">
        <h2 id="idx-title" className={styles.blockTitle}>
          From implementation to understanding
        </h2>
        <WorkSpine variant="index" />
      </section>
    </div>
  );
}

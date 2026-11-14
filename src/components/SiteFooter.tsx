import Link from "next/link";
import { Inline } from "@/lib/markdown";
import { signatureLine, site } from "@/content/profile";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <p className={styles.sign}>
          <span className="serif">{site.name}</span>
          <span className={styles.role}><Inline text={site.role} /></span>
          <span className={styles.signature}><Inline text={signatureLine} /></span>
        </p>
        <nav aria-label="Footer" className={styles.cols}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/#featured-work">Featured work</Link>
            </li>
            <li>
              <Link href="/projects/">All projects</Link>
            </li>
            <li>
              <Link href="/about/">About</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/about/#contact">Contact</Link>
            </li>
            <li>
              <a href={site.linkedin} rel="me noopener" target="_blank">
                LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { site } from "@/content/profile";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <>
      <a className={styles.skip} href="#main">
        Skip to content
      </a>
      <header className={styles.header}>
        <div className={`wrap ${styles.inner}`}>
          <Link href="/" className={styles.home}>
            {site.name}
          </Link>
          <nav aria-label="Primary">
            <NavLinks />
          </nav>
        </div>
      </header>
    </>
  );
}

import Link from "next/link";
import styles from "./pages.module.css";

export default function NotFound() {
  return (
    <div className="wrap">
      <header className={styles.pageHead}>
        <p className="eyebrow">404</p>
        <h1 className={styles.pageTitle}>Page not found</h1>
        <p className={styles.pageLede}>
          That page doesn&rsquo;t exist. Try the <Link href="/">homepage</Link> or{" "}
          <Link href="/projects/">all projects</Link>.
        </p>
      </header>
    </div>
  );
}

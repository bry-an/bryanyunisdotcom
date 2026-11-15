"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteHeader.module.css";

const items = [
  { href: "/#featured-work", label: "Work", match: "/projects" },
  { href: "/about/", label: "About", match: "/about" },
];

export function NavLinks() {
  const pathname = usePathname() ?? "/";
  return (
    <ul className={styles.nav}>
      {items.map((item) => {
        const exact = pathname.replace(/\/$/, "") === item.match;
        const within = pathname.startsWith(item.match);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={styles.navLink}
              aria-current={exact ? "page" : within ? "true" : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

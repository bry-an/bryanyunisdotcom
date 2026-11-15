import type { Metadata } from "next";
import Image from "next/image";
import {
  foundationsHeading,
  historyIntro,
  aboutIntroduction,
  gateless,
  moreAboutMe,
  rolesChronological,
  site,
} from "@/content/profile";
import { Topics } from "@/components/Topics";
import { projectHref, projectsInReadingOrder } from "@/content/projects";
import Link from "next/link";
import { Inline } from "@/lib/markdown";
import { ContactForm } from "@/components/ContactForm";
import { PianoKeys } from "@/components/PianoKeys";
import headshot from "@/assets/headshot.jpg";
import { JsonLd } from "@/components/JsonLd";
import { ExternalLink } from "@/components/ExternalLink";
import { abs, baseOpenGraph, ids, personLd, websiteLd } from "@/lib/seo";
import styles from "../pages.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bryan Yunis builds systems that solve challenging business problems, from enterprise integration at OppenheimerFunds and platform engineering at RE/MAX to distributed expert systems at Gateless.",
  alternates: { canonical: "/about/" },
  openGraph: { ...baseOpenGraph, type: "profile", firstName: "Bryan", lastName: "Yunis", url: "/about/" },
};

export default function About() {
  return (
    <div className="wrap">
      <JsonLd
        graph={[
          websiteLd,
          personLd,
          {
            "@type": "ProfilePage",
            "@id": abs("/about/#page"),
            url: abs("/about/"),
            name: `About ${site.name}`,
            isPartOf: { "@id": ids.website },
            mainEntity: { "@id": ids.person },
          },
        ]}
      />
      <header className={styles.aboutHead}>
        <div className={styles.aboutIntro}>
          <h1 className={styles.pageTitle}>About</h1>
          <p className={styles.aboutRole}>
            <span className="serif"><Inline text={site.role} /></span> <Inline text={site.tagline} />
          </p>
          <div className="prose">
            {aboutIntroduction.map((p, i) => (
              <p key={i}>
                <Inline text={p} />
              </p>
            ))}
          </div>
        </div>
        <figure className={styles.portrait}>
          <Image
            src={headshot}
            alt="Portrait of Bryan Yunis"
            sizes="(min-width: 56rem) 18rem, 12rem"
            placeholder="blur"
            loading="eager"
            fetchPriority="high"
          />
        </figure>
      </header>

      <section className={styles.block} aria-labelledby="foundations">
        <p className="eyebrow">Engineering foundations</p>
        <h2 id="foundations" className={styles.aboutSectionTitle}>
          <Inline text={foundationsHeading} />
        </h2>
        <div className={`prose ${styles.aboutLede}`}>
          <p><Inline text={historyIntro} /></p>
        </div>

        {rolesChronological().map((r, i) => (
          <section key={r.id} id={r.id} className={styles.roleSection} aria-labelledby={`${r.id}-title`}>
            <div className={styles.roleMeta}>
              <p className={styles.roleStep}>
                <span>{["I", "II", "III"][i]}</span> <Inline text={r.step} />
              </p>
              <p className={styles.roleCompany}>
                {r.companyUrl ? <ExternalLink href={r.companyUrl}>{r.company}</ExternalLink> : r.company}
              </p>
              <Topics items={r.labels} label="Focus" />
            </div>
            <div className="prose">
              <h3 id={`${r.id}-title`} className={styles.roleTitle}>
                <Inline text={r.title} />
              </h3>
              {r.body.map((p, j) => (
                <p key={j}>
                  <Inline text={p} />
                </p>
              ))}
              {r.id === "gateless" && (
                <div className={styles.roleWork}>
                  <p className="eyebrow">
                    Selected work at <ExternalLink href={gateless.url}>{gateless.name}</ExternalLink>
                  </p>
                  <ul>
                    {projectsInReadingOrder().map((p) => (
                      <li key={p.slug}>
                        <Link href={projectHref(p.slug)} prefetch>
                          <Inline text={p.title} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        ))}
      </section>

      <section id="more" className={`${styles.block} ${styles.personal}`} aria-labelledby="more-title">
        <header>
          <p className="eyebrow">Beyond the work</p>
          <h2 id="more-title" className={styles.aboutSectionTitle}>
            <Inline text={moreAboutMe.heading} />
          </h2>
          <PianoKeys className={styles.personalKeys} />
        </header>
        <div className="prose">
          {moreAboutMe.body.map((p, i) => (
            <p key={i}>
              <Inline text={p} />
            </p>
          ))}
          <p className={styles.personalThread}>
            <Inline text={moreAboutMe.thread} />
          </p>
        </div>
      </section>

      <section id="contact" className={styles.block} aria-labelledby="contact-title">
        <div className={styles.contact}>
          <div>
            <h2 id="contact-title" className={styles.aboutSectionTitle}>
              Contact
            </h2>
            <p className={styles.contactLede}>
              Send a note here, or find me on{" "}
              <a href={site.linkedin} rel="me noopener" target="_blank">
                LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

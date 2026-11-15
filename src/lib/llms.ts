/**
 * Plain-Markdown views of the site for LLMs and AI agents, following the
 * llms.txt convention (https://llmstxt.org): /llms.txt is a short index,
 * /llms-full.txt is the whole site in one file. Both render from the same
 * content modules as the pages, so they never drift.
 */
import {
  aboutIntroduction,
  historyIntro,
  introduction,
  moreAboutMe,
  rolesChronological,
  signatureLine,
  site,
  strengths,
  thesis,
} from "@/content/profile";
import { projectHref, projectsInReadingOrder, stageFor } from "@/content/projects";
import { abs } from "@/lib/seo";

const md = (s: string) => s.trim();

export function llmsIndex(): string {
  const cases = projectsInReadingOrder()
    .map((p) => `- [${p.title}](${abs(projectHref(p.slug))}): ${p.summary}`)
    .join("\n");

  return md(`
# ${site.name}

> ${site.description}

${site.name} is a software engineer and technical lead (currently Technical Lead, Customer Experience at Gateless, a mortgage underwriting platform). His work spans software architecture, product engineering, and AI-assisted development. The site's central idea: AI's most important contribution is not producing more code faster but helping skilled engineers understand complex systems well enough to make better decisions. ${signatureLine}

## Pages

- [Home](${abs("/")}): Introduction, approach, featured case studies organized along the engineering lifecycle, and career foundations.
- [About](${abs("/about/")}): Professional background at Gateless, RE/MAX, and OppenheimerFunds; personal interests; contact form.

## Case studies

${cases}

## Optional

- [Full site text](${abs("/llms-full.txt")}): Every page's content in one Markdown file.
- [LinkedIn](${site.linkedin}): Professional profile.
`) + "\n";
}

export function llmsFull(): string {
  const cases = projectsInReadingOrder()
    .map((p) => {
      const stage = stageFor(p.stages[0]);
      return md(`
### ${p.title}

URL: ${abs(projectHref(p.slug))}
${p.subtitle}. Lifecycle stage: ${stage.label} (${stage.line}). Topics: ${p.topics.join(", ")}.

${p.body}

- With AI: ${p.withAI}
- With experience: ${p.withExperience}
`);
    })
    .join("\n\n");

  const roles = rolesChronological()
    .map((r) => md(`
### ${r.company}: ${r.title}

${r.step}. Focus: ${r.labels.join(", ")}.

${r.body.join("\n\n")}
`))
    .join("\n\n");

  return md(`
# ${site.name}

> ${site.role} ${site.tagline}

Website: ${site.url}
LinkedIn: ${site.linkedin}
Contact: the form at ${abs("/about/#contact")}

## Strengths

${strengths.map((s) => `- ${s.lead} ${s.key}`).join("\n")}

## Approach

${introduction.join("\n\n")}

${thesis.contrast} ${thesis.claim} ${thesis.caveat}

- With AI: the reach to understand more.
- With experience: the judgment to trust what it finds.

## About

${aboutIntroduction.join("\n\n")}

## Featured work at Gateless

${cases}

## Engineering foundations

${historyIntro}

${roles}

## ${moreAboutMe.heading}

${moreAboutMe.body.join("\n\n")}

${moreAboutMe.thread}

---

${signatureLine}
`) + "\n";
}

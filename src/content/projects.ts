/**
 * Project records — one per Gateless case study.
 *
 * Source of truth for wording: ../../../copy/projects.md (narratives),
 * ../../../copy/layout.md (placement + homepage emphasis), ../../../copy/theme.md (priority).
 * Titles, subtitles, topic labels and bodies are verbatim from projects.md.
 */

export type StageId = "before" | "during" | "production" | "organization";

export type Placement =
  | { kind: "featured"; priority: 1 | 2 | 3; role: "lead" | "supporting" }
  | { kind: "breadth"; priority: number };

export type Project = {
  slug: string;
  /** Original numbering in projects.md — kept for editorial reference, not display order. */
  sourceNumber: number;
  title: string;
  subtitle: string;
  topics: string[];
  /** Short problem-and-outcome summary for the homepage and index. */
  summary: string;
  /** Markdown body (paragraphs separated by blank lines; *emphasis* supported). */
  body: string;
  placement: Placement;
  stages: StageId[];
  /**
   * The site's through-line: what AI contributed vs. what my experience brought,
   * the judgment that makes the result trustworthy. Both restate claims already
   * in the narrative; neither adds new ones.
   */
  withAI: string;
  withExperience: string;
  /** Optional closing line from the narrative, pulled out for emphasis. */
  pullQuote?: string;
};

export const projects: Project[] = [
  {
    slug: "integration-failures",
    sourceNumber: 1,
    title: "Finding integration failures before they happen",
    subtitle: "Anticipating edge cases in complex financial integrations",
    topics: ["Systems integration", "Requirements analysis", "AI-assisted validation"],
    summary:
      "Comparing GSE guidelines with the canonical data model exposed ambiguities and incompatible scenarios early enough to raise them with the integration partner.",
    body: `Integrating complex financial systems requires more than connecting APIs. It requires reconciling different data models, business rules, and interpretations of requirements.

While implementing a critical integration with a government-sponsored enterprise, I used AI to systematically compare external guidelines against our internal canonical data model.

By exploring theoretical combinations of loan data and documentation requirements, I identified incompatibilities and ambiguous scenarios that conventional happy-path testing could easily overlook.

This allowed us to surface important questions to our integration partner early, before they became production problems.`,
    placement: { kind: "featured", priority: 1, role: "lead" },
    stages: ["before"],
    withAI:
      "Systematically compared external guidelines against our canonical data model, exploring theoretical combinations of loan data and documentation requirements.",
    withExperience:
      "Identified incompatibilities and ambiguous scenarios that happy-path testing could easily overlook, and surfaced them to the integration partner before they became production problems.",
  },
  {
    slug: "deterministic-incident-analysis",
    sourceNumber: 2,
    title: "Turning an opaque production incident into actionable evidence",
    subtitle: "Identifying the full impact of unexpected production behavior",
    topics: ["Incident response", "Deterministic analysis", "Customer impact"],
    summary:
      "AI accelerated development of the analysis script. Deterministic detection made the investigation repeatable and supported a comprehensive account of customer impact.",
    body: `When unexpected behavior emerged in one of our products, existing observability tools couldn't identify the full population of affected cases.

I used AI to rapidly develop a deterministic analysis script capable of detecting the anomalous behavior across production data.

This transformed an otherwise difficult investigation into a repeatable, evidence-driven process. We could identify affected cases systematically and provide the customer with a comprehensive understanding of the incident's impact.

The AI accelerated development of the analysis. Deterministic logic provided the repeatability and confidence required to act on its findings.`,
    placement: { kind: "featured", priority: 3, role: "supporting" },
    stages: ["production"],
    withAI:
      "Accelerated development of an analysis script capable of detecting the anomalous behavior across production data.",
    withExperience:
      "Built the detection to be deterministic, which provided the repeatability and confidence required to act on its findings.",
  },
  {
    slug: "customer-zero",
    sourceNumber: 3,
    title: "Building a customer-zero environment for a complex expert system",
    subtitle: "Reproducing complex production behavior before deployment",
    topics: ["Expert systems", "Local simulation", "Pre-production verification"],
    summary:
      "A local workflow reproduced production behavior and supported verification across a complex underwriting rules system.",
    body: `Our mortgage underwriting platform includes a sophisticated expert system with thousands of interconnected business rules.

Understanding how changes to loan inputs propagate through that system can be challenging, particularly when the effects emerge from interactions between many rules.

I integrated AI into a local development workflow capable of reproducing production behavior and analyzing hundreds of rule execution sessions.

This enabled rapid experimentation, detailed examination of system behavior, and rigorous verification of changes before they reached customers.

The result was a practical *customer-zero* environment: a way to explore complex scenarios, validate assumptions, and develop robust, tested software without relying on production users to expose problems.`,
    placement: { kind: "featured", priority: 2, role: "supporting" },
    stages: ["during"],
    withAI:
      "Integrated into a local development workflow to analyze hundreds of rule execution sessions.",
    withExperience:
      "Reproduced production behavior locally and rigorously verified changes before they reached customers, without relying on production users to expose problems.",
  },
  {
    slug: "product-analytics",
    sourceNumber: 4,
    title: "Turning production data into product decisions",
    subtitle: "Making complex product behavior understandable",
    topics: ["Product analytics", "Data visualization", "Stakeholder communication"],
    summary:
      "A self-contained interactive dashboard, built from several hundred thousand rows of production data, gave stakeholders a tool for understanding the product and informing improvements intended to strengthen customer retention.",
    body: `Engineering data is only valuable when it helps people make better decisions.

To help stakeholders understand how one of our products was performing, I used AI to rapidly build a self-contained interactive analytics dashboard from several hundred thousand rows of production data.

The dashboard enabled stakeholders to explore product behavior across customers, compare relevant dimensions, and identify patterns that were difficult to discern in a spreadsheet.

Rather than delivering another data-dense static report, I delivered an interactive tool for understanding the product and informing improvements intended to strengthen customer retention.`,
    placement: { kind: "breadth", priority: 1 },
    stages: ["production"],
    withAI: "Rapidly built a self-contained interactive analytics dashboard.",
    withExperience:
      "Turned several hundred thousand rows of production data into an interactive tool for stakeholders, rather than another data-dense static report.",
  },
  {
    slug: "cross-platform-leadership",
    sourceNumber: 5,
    title: "Expanding technical leadership across the platform",
    subtitle: "Leading across architectural boundaries",
    topics: ["Technical leadership", "Systems architecture", "AI-native workflows"],
    summary:
      "Instead of treating unfamiliar components as black boxes, I can understand the consequences of proposed changes across the platform, identify cross-system risks earlier, and make better-informed architectural and product decisions.",
    body: `As a technical lead on [Gateless](https://gateless.com/)'s full-stack Customer Experience team, I work across a platform that spans customer-facing applications, RESTful services, distributed processing, document extraction, financial data integrations, and a large-scale underwriting expert system.

AI has fundamentally expanded my ability to reason across these systems.

Instead of treating unfamiliar components as black boxes, I can investigate their implementation, trace dependencies, explore behavior, and understand the consequences of proposed changes, even in areas I don't work with every day.

This allows me to make better-informed architectural and product decisions, identify cross-system risks earlier, and lead engineering efforts with a more comprehensive understanding of the platform.

For me, one of AI's most important contributions to engineering leadership is reducing the distance between the systems we're responsible for and the systems we deeply understand.`,
    placement: { kind: "breadth", priority: 2 },
    stages: ["organization"],
    withAI:
      "Investigating implementation, tracing dependencies, and exploring the behavior of components I don't work with every day.",
    withExperience:
      "Technical leadership across a platform that spans customer-facing applications, distributed processing, financial data integrations, and a large-scale underwriting expert system.",
    pullQuote:
      "One of AI's most important contributions to engineering leadership is reducing the distance between the systems we're responsible for and the systems we deeply understand.",
  },
];

export const projectHref = (slug: string) => `/projects/${slug}/`;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

const stageOrder: StageId[] = ["before", "during", "production", "organization"];
const weight = (p: Project) =>
  stageOrder.indexOf(p.stages[0]) * 100 +
  (p.placement.kind === "featured" ? 0 : 50) +
  p.placement.priority;

/**
 * Reading order follows the engineering lifecycle: before development → during →
 * in production → across the organization. Within a stage, featured work leads.
 * This order also preserves theme.md's featured priority (01, 03, 02).
 */
export function projectsInReadingOrder(): Project[] {
  return [...projects].sort((a, b) => weight(a) - weight(b));
}

export const featuredProjects = () =>
  projectsInReadingOrder().filter((p) => p.placement.kind === "featured");

export const breadthProjects = () =>
  projectsInReadingOrder().filter((p) => p.placement.kind === "breadth");

/** Next project in reading order, wrapping around. */
export function nextProject(slug: string): Project {
  const order = projectsInReadingOrder();
  const i = order.findIndex((p) => p.slug === slug);
  return order[(i + 1) % order.length];
}

/** "From implementation to understanding" — the narrative that connects the work. */
export type Stage = {
  id: StageId;
  label: string;
  line: string;
  description: string;
};

export const stages: Stage[] = [
  {
    id: "before",
    label: "Before development",
    line: "Explore the problem space",
    description:
      "Identify overlooked requirements, incompatible assumptions, and edge cases before implementation.",
  },
  {
    id: "during",
    label: "During development",
    line: "Build and verify with confidence",
    description:
      "Reproduce complex system behavior, examine rule interactions, and test changes against realistic scenarios.",
  },
  {
    id: "production",
    label: "In production",
    line: "Understand and respond",
    description:
      "Detect anomalous behavior, determine customer impact, and translate operational data into actionable evidence.",
  },
  {
    id: "organization",
    label: "Across the organization",
    line: "Lead with broader context",
    description:
      "Connect technical decisions to customer needs, product strategy, and the wider system architecture.",
  },
];

export const projectsForStage = (id: StageId) =>
  projectsInReadingOrder().filter((p) => p.stages.includes(id));

export const stageFor = (id: StageId) => stages.find((s) => s.id === id)!;

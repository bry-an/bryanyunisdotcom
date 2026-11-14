/**
 * Identity + foundations content.
 * Sources: ../../../copy/professional-introduction.md, ../../../copy/theme.md, ../../../copy/history.md.
 * Editorial planning notes in history.md (e.g. "establish architectural depth") stay in the source.
 */

export const site = {
  name: "Bryan Yunis",
  url: "https://bryanyunis.com",
  role: "Systems-oriented technical leader.",
  tagline: "I build complex software where correctness matters.",
  description:
    "Bryan Yunis is a systems-oriented technical leader who builds complex software where correctness matters, using AI to understand more and build better.",
  linkedin: "https://www.linkedin.com/in/bryan-yunis/",
};

export const signatureLine =
  "AI doesn't just help me build more. It helps me understand more, and build better.";

/** Approach — the professional introduction after the hero lines, verbatim. **bold** marks emphasis. */
export const introduction: string[] = [
  "I'm a software engineer and technical leader with eight years of experience building systems that solve challenging business problems.",
  "My work sits at the intersection of software architecture, product engineering, and AI-driven development. I consider myself a **technical owner of product outcomes**. I specialize in understanding complex systems, identifying the problems worth solving, and delivering reliable solutions in environments where the cost of error is high.",
  "I use AI to extend the reach of engineering expertise: exploring edge cases, validating complex behavior, investigating production anomalies, and reasoning across architectural boundaries.",
  "I believe the most important opportunity in AI-driven development is enabling engineers to **understand** more, anticipate more, and deliver **better outcomes** with greater confidence.",
];

/**
 * The thesis, adapted to first person from theme.md ("my most distinctive insight").
 * The site's through-line: AI as an instrument of comprehension, not just output.
 */
export const thesis = {
  contrast:
    "Most discussions of AI coding focus on how much faster software can be produced. My work suggests something more consequential:",
  claim:
    "AI can make systems that were previously too large, unfamiliar, or intricate for an individual engineer to reason about comprehensively much more accessible.",
  caveat:
    "That doesn't eliminate complexity or the need for verification, but it **can** change how effectively a skilled engineer navigates that complexity.",
};

/** Homepage closing — bookends the hero tagline. */
export const closingInvite =
  "If you're building complex software where correctness matters, I'd like to hear about it.";

export const historyIntro =
  "I spent years developing the technical depth, architectural judgment, and engineering discipline that now make me effective with AI. AI has allowed me to leverage those capabilities to produce better products.";

export const foundationsHeading = "Engineering across the stack. Ownership across the lifecycle.";

export type Role = {
  id: string; // About page anchor
  /** Where this role sits in the career progression described in history.md. */
  step: string;
  company: string;
  title: string;
  labels: string[];
  /** Brief homepage entry, drawn from the history narrative. */
  brief: string;
  /** Full About-page narrative, verbatim from history.md. */
  body: string[];
};

/** Stored reverse chronological (résumé order). */
export const roles: Role[] = [
  {
    id: "gateless",
    step: "Architecting complex distributed systems, then leading teams and owning product outcomes",
    company: "Gateless",
    title: "Engineering intelligent mortgage underwriting",
    labels: ["Full-stack engineering", "Distributed systems", "Expert systems"],
    brief:
      "Customer-facing applications built with Svelte, backend services written in Clojure, asynchronous processing workflows, external integrations, testing infrastructure, and a distributed expert system that evaluates mortgage loan data against thousands of business rules.",
    body: [
      "Mortgage underwriting involves complex financial calculations, interconnected business rules, document requirements, and integrations with external financial systems.",
      "At Gateless, I've contributed to the architecture and development of a platform designed to automate and streamline this process.",
      "My work spans customer-facing applications built with Svelte, backend services written in Clojure, and a distributed expert system responsible for evaluating mortgage loan data against thousands of business rules.",
      "I've helped design, implement, and maintain the systems connecting these components, including asynchronous processing workflows, external integrations, and the testing infrastructure necessary to support reliable operation.",
      "This experience has given me a deep understanding of how to build software in a regulated domain where correctness, traceability, and operational reliability are fundamental requirements.",
      "As my role evolved into technical leadership, so did my responsibilities: from implementing individual components to making architectural decisions, guiding engineering execution, and connecting product priorities to technical outcomes.",
    ],
  },
  {
    id: "remax",
    step: "Designing reusable platforms and engineering practices",
    company: "RE/MAX",
    title: "Building composable content infrastructure",
    labels: ["Platform engineering", "Node.js", "TypeScript", "Vue"],
    brief:
      "Led development of a headless Node.js and TypeScript service that rendered Vue components into email-compatible HTML for multiple applications, and helped establish the testing practices that supported the wider frontend organization.",
    body: [
      "Building personalized marketing experiences across multiple applications requires a flexible foundation for generating and delivering content.",
      "At RE/MAX, I led the development of a headless content service that programmatically rendered Vue components populated with dynamic data into email-compatible HTML.",
      "Built with Node.js and TypeScript, the service separated content generation from its consumers, allowing multiple applications and workflows to share a common rendering capability.",
      "Beyond feature development, I contributed to the engineering practices that supported the broader frontend organization. I helped establish testing infrastructure, developed shared testing utilities, wrote technical documentation, and trained other engineers in effective testing practices.",
      "This work reinforced an engineering principle that continues to guide me: the most valuable technical solutions often extend beyond the immediate feature, creating reusable capabilities that improve how entire teams build software.",
    ],
  },
  {
    id: "oppenheimerfunds",
    step: "Implementing enterprise software",
    company: "OppenheimerFunds (now Invesco)",
    title: "Transforming enterprise employee onboarding",
    labels: ["Enterprise integration", "Workflow automation"],
    brief:
      "Helped develop a unified HR provisioning dashboard that integrated three line-of-business systems into one workflow, reducing a process that could take days to as little as a few minutes.",
    body: [
      "Employee onboarding involved coordinating multiple departments and interacting with several disconnected enterprise applications.",
      "I helped develop a unified HR provisioning dashboard that integrated three line-of-business systems into a single workflow.",
      "By bringing previously fragmented processes together, the application streamlined employee provisioning and reduced a process that could take days to as little as a few minutes.",
      "This was an early example of a principle that has shaped my career: effective software engineering begins with understanding the operational problem, not merely implementing a technical solution.",
      "The most meaningful result wasn't the dashboard itself. It was the transformation of the process it enabled.",
    ],
  },
];

/** Earliest first: the progression reads as growth, and ends at the present work. */
export const rolesChronological = () => [...roles].reverse();

export const aboutHref = (id?: string) => (id ? `/about/#${id}` : "/about/");

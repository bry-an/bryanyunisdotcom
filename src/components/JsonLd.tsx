import { ldJson } from "@/lib/seo";

/** schema.org structured data for search engines and LLMs. */
export function JsonLd({ graph }: { graph: object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(graph) }} />;
}

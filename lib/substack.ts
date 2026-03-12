export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return (match?.[1] ?? match?.[2] ?? "").trim();
}

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const res = await fetch("https://sakshamchaudhary.substack.com/feed", {
      next: { revalidate: 3600 },
    });
    const xml = await res.text();

    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

    return itemMatches.map((item) => ({
      title: extractTag(item, "title"),
      link: extractTag(item, "link"),
      pubDate: extractTag(item, "pubDate"),
      description: extractTag(item, "description").replace(/<[^>]+>/g, "").slice(0, 200),
    }));
  } catch {
    return [];
  }
}

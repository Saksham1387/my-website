import fs from "node:fs";
import path from "node:path";

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
};

export type Article = ArticleMeta & {
  content: string;
};

const articlesDir = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { data: {} as Record<string, unknown>, content: raw };
  }

  const data: Record<string, unknown> = {};

  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (!key) continue;

    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else if (value === "true" || value === "false") {
      data[key] = value === "true";
    } else {
      data[key] = value.replace(/^["']|["']$/g, "");
    }
  }

  return { data, content: match[2] };
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function toArticle(slug: string, raw: string): Article {
  const { data, content } = parseFrontmatter(raw);

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    description: typeof data.description === "string" ? data.description : "",
    date: typeof data.date === "string" ? data.date : new Date().toISOString(),
    tags: Array.isArray(data.tags)
      ? (data.tags as string[])
      : typeof data.tags === "string" && data.tags
        ? [data.tags]
        : ["writing"],
    readingTime: readingTime(content),
    content,
  };
}

function readArticleFiles(): Article[] {
  if (!fs.existsSync(articlesDir)) return [];

  return fs
    .readdirSync(articlesDir)
    .filter((file) => /\.mdx?$/.test(file))
    .flatMap((file) => {
      const raw = fs.readFileSync(path.join(articlesDir, file), "utf8");
      const { data } = parseFrontmatter(raw);

      if (data.published === false) return [];

      const slug = file.replace(/\.mdx?$/, "");
      return [toArticle(slug, raw)];
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getLocalArticles(): Article[] {
  return readArticleFiles();
}

export function getArticleBySlug(slug: string): Article | undefined {
  return readArticleFiles().find((article) => article.slug === slug);
}

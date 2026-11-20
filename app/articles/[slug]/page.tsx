import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { ReadingProgress } from "@/components/ReadingProgress";
import { getArticleBySlug, getLocalArticles } from "@/lib/articles";
import { name } from "../../../info";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return getLocalArticles().map((article) => ({ slug: article.slug }));
}

function formatDate(date: string) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime())
    ? date
    : format(parsed, "d MMMM yyyy");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: `${article.title} — ${name}`,
    description: article.description,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <main className="article-main">
      <ReadingProgress />

      <nav className="article-nav">
        <Link href="/">← All writing</Link>
        <Link href="/">{name}</Link>
      </nav>

      <header className="article-header">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-meta">
          {formatDate(article.date)} · {article.readingTime} min read
        </div>
      </header>

      <article className="article-body">
        <MDXRemote
          source={article.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>

      <footer className="article-footer">
        <Link href="/">← All writing</Link>
        <span className="article-tags">
          {article.tags.map((tag) => `#${tag}`).join(" ")}
        </span>
      </footer>
    </main>
  );
}

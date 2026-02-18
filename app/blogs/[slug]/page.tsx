import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SimpleThemeToggle } from "@/components/ThemeToggle";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Saksham`,
    description: post.description,
  };
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-2xl font-bold mt-10 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-bold mt-8 mb-3 pb-2 border-b border-zinc-200 dark:border-zinc-800" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-semibold mt-6 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-sm leading-relaxed mb-4 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-zinc-900 dark:text-zinc-100 underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-600 hover:decoration-zinc-600 dark:hover:decoration-zinc-400 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-1 text-sm text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-1 text-sm text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-zinc-300 dark:border-zinc-700 pl-4 my-4 text-sm italic text-zinc-600 dark:text-zinc-400"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="text-xs bg-zinc-950 dark:bg-zinc-900 text-zinc-100 p-4 rounded-lg my-4 overflow-x-auto border border-zinc-800"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-left py-2 px-3 border-b-2 border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-400"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="py-2 px-3 border-b border-zinc-200 dark:border-zinc-800 text-xs"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-zinc-900 dark:text-zinc-100" {...props} />
  ),
  hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
      <main className="container mx-auto px-6 py-16 max-w-2xl">
        <div className="fixed top-6 right-6 z-50">
          <SimpleThemeToggle />
        </div>

        {/* Back link */}
        <Link
          href="/blogs"
          className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 mb-8 inline-flex items-center gap-1 text-sm transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          cd ~/blog
        </Link>

        <article className="mt-8">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime}
            </span>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500 border border-zinc-200/50 dark:border-zinc-700/50"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <hr className="border-zinc-200 dark:border-zinc-800 mb-8" />

          {/* MDX Content */}
          <div className="prose-mono">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypePrettyCode,
                      {
                        theme: "github-dark-default",
                        keepBackground: false,
                      },
                    ],
                    [
                      rehypeAutolinkHeadings,
                      {
                        behavior: "wrap",
                      },
                    ],
                  ],
                },
              }}
            />
          </div>

          {/* Author footer */}
          <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-sm font-bold">
                S
              </div>
              <div>
                <p className="text-sm font-medium">Saksham Chaudhary</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Software Engineer
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

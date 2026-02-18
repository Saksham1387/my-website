import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { SimpleThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Blog — Saksham",
  description: "Thoughts on engineering, AI, and building things.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
      <main className="container mx-auto px-6 py-16 max-w-2xl">
        <div className="fixed top-6 right-6 z-50">
          <SimpleThemeToggle />
        </div>

        {/* Header */}
        <header className="mb-10">
          <Link
            href="/"
            className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 inline-flex items-center gap-1.5 text-xs transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            cd ~
          </Link>

          <h1 className="text-xl font-bold mt-6">
            <span className="text-zinc-300 dark:text-zinc-700">~/</span>blog
          </h1>
          <p className="text-zinc-500 dark:text-zinc-500 text-xs mt-1.5 leading-relaxed">
            Thoughts on engineering, AI, and building things that scale.
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-400 dark:text-zinc-600 text-xs">
              No posts yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group flex items-baseline justify-between gap-4 py-3 hover:opacity-70 transition-opacity"
              >
                <div className="min-w-0">
                  <h2 className="text-sm font-medium truncate">
                    {post.title}
                  </h2>
                  <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5 truncate hidden sm:block">
                    {post.description}
                  </p>
                </div>

                <time className="text-[11px] text-zinc-400 dark:text-zinc-600 tabular-nums shrink-0">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </Link>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-zinc-100 dark:border-zinc-900">
          <p className="text-[11px] text-zinc-300 dark:text-zinc-700 text-center">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </p>
        </footer>
      </main>
    </div>
  );
}

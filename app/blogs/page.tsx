import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { SimpleThemeToggle } from "@/components/ThemeToggle";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";

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
        <div className="mb-12">
          <Link
            href="/"
            className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 mb-6 inline-flex items-center gap-1 text-sm transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            cd ~
          </Link>

          <h1 className="text-2xl font-bold mt-4 mb-2">
            <span className="text-zinc-400 dark:text-zinc-600">~/</span>blog
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Thoughts on engineering, AI, and building things that scale.
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-400 dark:text-zinc-600 text-sm">
              No posts yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group block py-4 -mx-4 px-4 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-medium group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors truncate">
                      {post.title}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500 shrink-0 sm:mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500 border border-zinc-200/50 dark:border-zinc-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center">
            {posts.length} post{posts.length !== 1 ? "s" : ""} published
          </p>
        </div>
      </main>
    </div>
  );
}

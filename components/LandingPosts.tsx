import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export const LandingPosts = () => {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="mt-6 space-y-4">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="border-b border-zinc-200 dark:border-zinc-800 pb-4"
        >
          <Link
            href={`/blogs/${post.slug}`}
            className="text-lg font-medium hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors block mb-1"
          >
            {post.title}
          </Link>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      ))}
    </div>
  );
};

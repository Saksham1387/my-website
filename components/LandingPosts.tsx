"use client";
import { usePosts } from "@/hooks/use-posts";
import Link from "next/link";
import { format } from "date-fns";

export const LandingPosts = () => {
  const { posts } = usePosts();

  console.log(posts);
  return (
    <div className="mt-6 space-y-4">
      {posts.map((
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        post: any,index:number) => (
        <div key={index} className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <Link
            href={`/blogs/${post.slug.current}`}
            className="text-lg font-medium hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors block mb-1"
          >
            {post.title}
          </Link>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {format(new Date(post.publishedAt), "dd/MM/yyyy HH:mm")}
          </p>
        </div>
      ))}
    </div>
  );
};

"use client";

import Link from "next/link";

export type WritingItem = {
  title: string;
  href: string;
  meta: string;
  tags: string[];
  external?: boolean;
};

export function WritingList({ posts }: { posts: WritingItem[] }) {
  return (
    <div className="writing">
      <div className="posts">
        {posts.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            {...(post.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <span className="post-title">{post.title}</span>
            <span className="post-meta">{post.meta}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

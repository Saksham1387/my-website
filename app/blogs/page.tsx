import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlogCard = ({ post }: { post: any }) => {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log(post);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md dark:bg-zinc-800/70 dark:hover:bg-zinc-800/90 border border-border">
      <CardHeader className="p-4 pb-0">
        <CardTitle>
          <Link
            href={`/blogs/${post.slug.current}`}
            className="text-xl font-semibold hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4" />
            <span>{publishedDate}</span>

            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>3 min read</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BlogsSkeleton = () => (
  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
    {[1, 2, 3, 4].map((i) => (
      <Card key={i} className="overflow-hidden">
        <CardHeader className="p-4 pb-0">
          <Skeleton className="h-6 w-3/4 mb-2" />
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <div className="flex items-center justify-between mt-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

const Blogs = async () => {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const isLoading = false;

  console.log(posts);
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
      <main className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="mb-8">
          <Link
            href="/"
            className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 mb-6 inline-block"
          >
            ← Back to home
          </Link>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Thoughts, stories, and ideas about technology and development
          </p>
        </div>

        {isLoading ? (
          <BlogsSkeleton />
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}

        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  );
};

export default Blogs;

import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText, SanityDocument } from "next-sanity";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options
  );
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  const isLoading = false;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
      <main className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <Link
          href="/blogs"
          className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 mb-8 inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all posts
        </Link>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <div className="flex justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-48 w-full mt-6" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : post ? (
          <article>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center justify-between mb-8 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} read</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            <div className="pt-3 pb-3 items-center justify-center ">
              <img src={postImageUrl!} alt={"fs"} className="rounded-2xl" />
            </div>

            {Array.isArray(post.body) && <PortableText value={post.body} />}
            <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <img
                  src="https://fuchsia-legal-roundworm-794.mypinata.cloud/ipfs/bafybeic5ytt45ns75xe5i62ri3chfiwctamq3dxx4zbeda5dm2teby7syy"
                  alt={"fs"}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">Saksham</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Software engineer
                  </p>
                </div>
              </div>
            </div>
          </article>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">Post not found</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              The blog post you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
            <Button asChild>
              <Link href="/blogs">View all posts</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

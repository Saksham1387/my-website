"use client";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import React, { useEffect } from "react";

const POSTS_QUERY = `*[
    _type == "post"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export function usePosts() {
  const [posts, setPosts] = React.useState<any>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await client.fetch<SanityDocument[]>(
        POSTS_QUERY,
        {},
        options
      );
      setPosts(response);
    };

    fetchPosts();
  }, []);

  return { posts };
}

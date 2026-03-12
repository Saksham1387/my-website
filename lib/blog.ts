import { allPosts } from ".contentlayer/generated";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  bodyCode: string;
  published: boolean;
}

export function getAllPosts(): BlogPost[] {
  return allPosts
    .filter((post) => post.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      tags: post.tags ?? [],
      readingTime: post.readingTime,
      bodyCode: post.body.code,
      published: post.published ?? true,
    }));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return null;
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags ?? [],
    readingTime: post.readingTime,
    bodyCode: post.body.code,
    published: post.published ?? true,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

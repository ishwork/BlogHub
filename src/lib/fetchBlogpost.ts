import { BlogPost } from '@/src/types';

import { client } from '@/src/lib/sanityClient';

export type BlogPostResponse = {
  posts: BlogPost[];
  totalPages?: number;
};

export type PaginatedBlogPostParams = {
  start?: number;
  limit?: number;
};

export const getPaginatedBlogPosts = async ({
  start = 0,
  limit = 5,
}: PaginatedBlogPostParams): Promise<BlogPostResponse> => {
  const query = `*[_type == "blogPost"] | order(publishedAt desc)[$start...$end] {
    _id,
    title,
    slug,
    author,
    mainImage,
    imageCredit,
    publishedAt,
    body
  }`;

  const [posts, totalCount] = await Promise.all([
    client.fetch(query, {
      start: start,
      end: start + limit,
    }),
    client.fetch(`count(*[_type == "blogPost"])`),
  ]);

  const totalPages = Math.ceil((totalCount || 0) / limit) || 0;

  return {
    posts: posts || [],
    totalPages,
  };
};

export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  const query = `*[_type == "blogPost" && slug.current == "${slug}"][0]{
    _id,
    title,
    slug,
    author,
    mainImage,
    imageCredit,
    publishedAt,
    body
  }`;
  const post = await client.fetch(query);
  return post || null;
};

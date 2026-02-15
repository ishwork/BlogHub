import { cache } from 'react';
import { client } from './sanityClient';

import { BlogPost } from '@/src/types';

export type PaginatedBlogPostsPage = {
  posts: BlogPost[];
  totalPages: number;
};

export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    mainImage,
    publishedAt,
    body
  }`;

  const posts = await client.fetch(query);
  return posts;
});

export const getPaginatedBlogPosts = cache(
  async (start = 0, limit = 5): Promise<PaginatedBlogPostsPage> => {
    const query = `*[_type == "blogPost"] | order(publishedAt desc)[$start...$end] {
      _id,
      title,
      slug,
      author,
      mainImage,
      publishedAt,
      body
    }`;

    const [posts, totalCount] = await Promise.all([
      client.fetch(query, {
        start,
        end: start + limit,
      }),
      client.fetch(`count(*[_type == "blogPost"])`),
    ]);

    const totalPages = Math.ceil((totalCount || 0) / limit) || 0;

    return {
      posts,
      totalPages,
    };
  },
);

export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  const posts = await getAllBlogPosts();
  const post = posts.find((post) => post.slug.current === slug);
  return post || null;
});

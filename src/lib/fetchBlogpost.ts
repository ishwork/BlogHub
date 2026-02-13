import { cache } from 'react';
import { client } from './sanityClient';

import { BlogPost } from '@/src/types';

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

export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  const posts = await getAllBlogPosts();
  const post = posts.find((post) => post.slug.current === slug);
  return post || null;
});

import { z } from 'zod';

import {
  BlogPostSchema,
  PaginatedBlogPostsSchema,
  PaginatedBlogPostParamsSchema,
} from '@/src/lib/schemas';

export type BlogPost = z.infer<typeof BlogPostSchema>;
export type PaginatedBlogPosts = z.infer<typeof PaginatedBlogPostsSchema>;
export type PaginatedBlogPostParams = z.infer<typeof PaginatedBlogPostParamsSchema>;

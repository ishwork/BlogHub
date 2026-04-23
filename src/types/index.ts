import { z } from 'zod';

import {
  BlogPostSchema,
  BlogPostResponseSchema,
  PaginatedBlogPostParamsSchema,
} from '@/src/lib/schemas';

export type BlogPost = z.infer<typeof BlogPostSchema>;
export type BlogPostResponse = z.infer<typeof BlogPostResponseSchema>;
export type PaginatedBlogPostParams = z.infer<typeof PaginatedBlogPostParamsSchema>;

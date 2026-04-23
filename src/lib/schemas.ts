import { z } from 'zod';

export const MarkDefSchema = z.object({
  _key: z.string(),
  _type: z.literal('link'),
  href: z.string().url(),
});

export const BlockChildSchema = z.object({
  text: z.string(),
  marks: z.array(z.string()).optional(),
});

export const BlockBodySchema = z.object({
  _type: z.literal('block'),
  style: z.enum(['normal', 'h2', 'h3']).optional(),
  children: z.array(BlockChildSchema),
  markDefs: z.array(MarkDefSchema).optional(),
});

export const ImageBodySchema = z.object({
  _type: z.literal('image'),
  asset: z.object({ _ref: z.string() }),
  alt: z.string().optional(),
  caption: z.string().optional(),
  imageCredit: z.string().optional(),
});

export const BlogPostSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.object({ current: z.string() }),
  author: z.string(),
  mainImage: z.object({
    asset: z.object({ _ref: z.string() }),
  }),
  imageCredit: z.string().optional(),
  publishedAt: z.string().datetime({ offset: true }),
  body: z.array(z.discriminatedUnion('_type', [BlockBodySchema, ImageBodySchema])),
});

export const BlogPostResponseSchema = z.object({
  posts: z.array(BlogPostSchema),
  totalPages: z.number().int().nonnegative().optional(),
});

export const PaginatedBlogPostParamsSchema = z.object({
  start: z.coerce.number().int().nonnegative().default(0),
  limit: z.coerce.number().int().positive().max(100).default(5),
});

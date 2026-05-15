import { BlogPost, PaginatedBlogPosts, PaginatedBlogPostParams } from '@/src/types';
import { BlogPostSchema, PaginatedBlogPostParamsSchema } from '@/src/lib/schemas';
import { client } from '@/src/lib/sanityClient';
import { enrichBlogPost } from '@/src/lib/utils/enrichBlogPost';

export const getPaginatedBlogPosts = async (
  params: PaginatedBlogPostParams,
): Promise<PaginatedBlogPosts> => {
  const { start, limit } = PaginatedBlogPostParamsSchema.parse(params);

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

  const [rawPosts, totalCount] = await Promise.all([
    client.fetch(query, { start, end: start + limit }),
    client.fetch(`count(*[_type == "blogPost"])`),
  ]);

  const posts = BlogPostSchema.array()
    .parse(rawPosts ?? [])
    .map(enrichBlogPost);
  const totalPages = Math.ceil((totalCount || 0) / limit) || 0;

  return { posts, totalPages };
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

  const rawPost = await client.fetch(query);
  if (!rawPost) return null;

  const post = BlogPostSchema.parse(rawPost);
  return enrichBlogPost(post);
};

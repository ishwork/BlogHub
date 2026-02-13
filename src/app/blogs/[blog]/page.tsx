import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FAVICON_ICON, BLOG_NAME } from '@/src/constants';
import { getBlogPost } from '@/src/lib/fetchBlogpost';
import { urlFor } from '@/src/lib/sanityClient';

import BlogPostDetail from '@/src/components/BlogPostDetail';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ blog: string }>;
}): Promise<Metadata> => {
  const { blog } = await params;
  const post = await getBlogPost(blog);

  if (!post) {
    return {
      title: 'BlogHub - Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: `${post.title}`,
    description: `Read "${post.title}" on BlogHub by ${post.author}.`,
    openGraph: {
      title: `${post.title}`,
      description: `Read "${post.title}" on BlogHub by ${post.author}.`,
      siteName: 'BlogHub',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: urlFor(post.mainImage.asset).url() || BLOG_NAME,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    icons: {
      icon: FAVICON_ICON,
    },
    robots: 'index, follow',
  };
};

const BlogPostPage = async ({ params }: { params: Promise<{ blog: string }> }) => {
  const { blog } = await params;
  const post = await getBlogPost(blog);

  if (!post) return notFound();

  return <BlogPostDetail post={post} />;
};

export default BlogPostPage;

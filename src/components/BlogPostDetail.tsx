import Image from 'next/image';
import Link from 'next/link';

import { urlFor } from '@/src/lib/sanityClient';

import { BlogPost } from '@/src/types';

type BlogPostDetailProps = {
  post: BlogPost;
};

const BlogPostDetail = ({ post }: BlogPostDetailProps) => {
  return (
    <article className="bg-background min-h-screen py-12 w-full flex justify-center">
      <div className="px-4 sm:px-6 w-full card-max-width">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-text/70 hover:text-text mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to all posts
        </Link>

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">{post.title}</h1>
          <div className="flex items-center text-text/70 mb-6">
            <span className="font-medium text-lg">{post.author}</span>
            <span className="mx-3">•</span>
            <time className="text-lg">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={urlFor(post.mainImage).width(1280).height(720).url()}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 1200px, 100vw"
              priority
            />
          </div>
        )}

        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          {post.body &&
            post.body.map((block, index) => {
              if (block._type === 'block') {
                return (
                  <p key={index} className="text-text/80 text-lg leading-relaxed mb-6">
                    {block.children.map((child) => child.text).join(' ')}
                  </p>
                );
              }

              if (block._type === 'image' && block.asset?._ref) {
                return (
                  <figure key={index} className="my-8">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={urlFor(block).width(1200).url()}
                        alt={block.alt || post.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 630px, 100vw"
                      />
                    </div>
                  </figure>
                );
              }

              return null;
            })}
        </div>
      </div>
    </article>
  );
};

export default BlogPostDetail;

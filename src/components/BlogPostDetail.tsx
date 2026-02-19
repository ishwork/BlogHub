import Image from 'next/image';
import Link from 'next/link';

import { BlogPost } from '@/src/types';
import { urlFor } from '@/src/lib/sanityClient';

import ShareBlog from '@/src/components/ShareBlog';

type BlogPostDetailProps = {
  post: BlogPost;
};

const BlogPostDetail = ({ post }: BlogPostDetailProps) => (
  <article className="bg-background min-h-screen py-12 w-full flex justify-center">
    <div className="px-4 sm:px-6 w-full card-max-width">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-text/70 hover:text-text mb-8 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
          <ShareBlog />
        </div>
      </header>

      {/* Featured Image */}
      {post.mainImage && (
        <div className="mb-6 flex flex-col items-center">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
            <Image
              src={urlFor(post.mainImage).width(760).height(428).format('webp').url()}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(min-width: 640px) 100vw, 380px"
              priority
            />
          </div>
          {post.imageCredit && (
            <span className="text-text/90 text-sm italic mt-2">
              Image credit: {post.imageCredit}
            </span>
          )}
        </div>
      )}

      {/* Post Content */}
      <div className="prose prose-lg max-w-none">
        {post.body &&
          post.body.map((block, index) => {
            if (block._type === 'block') {
              return (
                <p key={index} className="text-text/80 text-lg leading-relaxed mb-6">
                  {block.children.map((child, childIdx) => {
                    // If child has marks and includes 'strong', render as bold
                    if (child.marks && child.marks.includes('strong')) {
                      return <strong key={childIdx}>{child.text}</strong>;
                    }
                    return child.text;
                  })}
                </p>
              );
            }

            if (block._type === 'image' && block.asset?._ref) {
              return (
                <figure key={index} className="my-8">
                  <div className="w-full rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={urlFor(block).width(760).format('webp').url()}
                      alt={block.alt || post.title}
                      width={760}
                      height={428}
                      className="w-full h-auto"
                      sizes="(min-width: 640px) 100vw, 380px"
                    />
                  </div>
                  {(block.caption || block.imageCredit) && (
                    <div className="flex justify-center items-center flex-wrap gap-x-1 mt-2 text-text/90 text-sm italic">
                      <p>
                        {block.caption}
                        {block.imageCredit && (
                          <span className="ml-2">( Image credit: {block.imageCredit} )</span>
                        )}
                      </p>
                    </div>
                  )}
                </figure>
              );
            }
            return null;
          })}
      </div>
    </div>
  </article>
);

export default BlogPostDetail;

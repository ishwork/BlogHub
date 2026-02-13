import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/src/lib/sanityClient';

import { BlogPost } from '@/src/types';

type BlogCardProps = {
  post: BlogPost;
  priority?: boolean;
};

const BlogCard = ({ post, priority = false }: BlogCardProps) => {
  return (
    <Link href={`/blogs/${post.slug.current}`} className="group">
      <article className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {post.mainImage && (
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={urlFor(post.mainImage).width(1280).height(720).url()}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 630px, 100vw"
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
            />
          </div>
        )}
        <div className="p-6 grow flex flex-col">
          <h2 className="text-2xl font-semibold text-text mb-3 group-hover:text-text/80 transition-colors">
            {post.title}
          </h2>
          <div className="flex items-center text-sm text-text/70">
            <span className="font-medium">{post.author}</span>
            <span className="mx-2">•</span>
            <time>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;

'use client';

import { BlogPost } from '@/src/types';
import type { BlogPostResponse } from '@/src/lib/fetchBlogpost';

import useFetchInfinitePosts from '@/src/hooks/useFetchInfinitePosts';

import BlogCard from '@/src/components/BlogCard';
import Hero from '@/src/components/Hero';
import LoadMore from '@/src/components/LoadMore';

const LIMIT = 5;

type FrontpageProps = {
  initialPosts: BlogPost[];
};

// Fetch paginated posts for infinite loading on the front page
const fetchPaginatedPosts = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<BlogPostResponse> => {
  // pageParam=0: start=0, pageParam=1: start=5, etc.
  const start = pageParam * LIMIT;
  try {
    const response = await fetch(`/api/frontpage?start=${start}&limit=${LIMIT}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], totalPages: 0 };
  }
};

const Frontpage = ({ initialPosts }: FrontpageProps) => {
  const initialData: BlogPostResponse = {
    posts: initialPosts,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchInfinitePosts(
    'frontpage-posts',
    initialData,
    fetchPaginatedPosts,
  ) as {
    data: { pages: BlogPostResponse[] } | undefined;
    fetchNextPage: () => void;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
  };

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* All Blog Posts */}
        <div className="flex flex-wrap flex-col items-center justify-center gap-8 w-full">
          {allPosts.map((post, index) => (
            <div key={`${post._id}-${index}`} className="w-full card-max-width">
              <BlogCard post={post} priority={index === 0} />
            </div>
          ))}
          {(isFetchingNextPage || hasNextPage) && <LoadMore fetchNextPage={fetchNextPage} />}
        </div>

        {allPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text/70 text-lg">No blog posts found. Check back soon!</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Frontpage;

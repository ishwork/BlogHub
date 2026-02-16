'use client';

import { BlogPost } from '@/src/types';
import useFetchInfinitePosts from '@/src/hooks/useFetchInfinitePosts';

import BlogCard from '@/src/components/BlogCard';
import LoadMore from '@/src/components/LoadMore';

const LIMIT = 5;

type LoadMorePostsProps = {
  initialPosts: BlogPost[];
};

type PostsResponse = {
  posts: BlogPost[];
  totalPages: number;
};

// Fetch paginated posts for infinite loading on the front page
const fetchPaginatedPosts = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<PostsResponse> => {
  try {
    const response = await fetch(`/api/posts?start=${pageParam * LIMIT}&limit=${LIMIT}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], totalPages: 0 };
  }
};

const LoadMorePosts = ({ initialPosts }: LoadMorePostsProps) => {
  const initialData: PostsResponse = {
    posts: initialPosts,
    totalPages: initialPosts.length === LIMIT ? Math.ceil(100 / LIMIT) : 1,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchInfinitePosts(
    'posts',
    initialData,
    fetchPaginatedPosts,
  ) as {
    data: { pages: PostsResponse[] } | undefined;
    fetchNextPage: () => void;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
  };

  const allPosts = data?.pages?.flatMap((page: PostsResponse) => page.posts) || [];

  return (
    <div className="flex flex-wrap flex-col items-center justify-center gap-8 w-full">
      {allPosts.map((post, index) => (
        <div key={post._id} className="w-full card-max-width">
          <BlogCard post={post} priority={index === 0} />
        </div>
      ))}
      {(isFetchingNextPage || hasNextPage) && <LoadMore fetchNextPage={fetchNextPage} />}
    </div>
  );
};

export default LoadMorePosts;

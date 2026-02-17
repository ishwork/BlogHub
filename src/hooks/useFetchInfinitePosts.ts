import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';

import { BlogPost } from '@/src/types';

type PostsResponse = {
  posts: BlogPost[];
  totalPages?: number;
};

type UseFetchInfinitePosts = (
  queryKey: string,
  initialData: PostsResponse,
  fetchFn: (params: { pageParam?: number }) => Promise<PostsResponse>,
) => UseInfiniteQueryResult<PostsResponse>;

const useFetchInfinitePosts: UseFetchInfinitePosts = (queryKey, initialData, fetchFn) =>
  useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchFn,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage?.totalPages ?? 0;
      const fetchedPages = allPages.length;
      return totalPages > fetchedPages ? fetchedPages : undefined;
    },
    initialPageParam: 1, // Start from page 1 since page 0 is SSR
    enabled: !!queryKey,
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [0],
        }
      : undefined,
  });

export default useFetchInfinitePosts;

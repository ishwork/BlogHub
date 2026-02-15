'use client';

import { useEffect, useRef } from 'react';

type LoadMorePropsTypes = {
  fetchNextPage: () => void;
};

const LoadMore = ({ fetchNextPage }: LoadMorePropsTypes) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Intersection Observer to auto-trigger fetchNextPage
  useEffect(() => {
    if (!ref.current) return;
    const divRef = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;
        if (isVisible) fetchNextPage();
      },
      { threshold: 1.0 }, // Trigger when the LoadMore component is fully visible
    );
    observer.observe(divRef);
    return () => observer.unobserve(divRef);
  }, [fetchNextPage]);

  return (
    <div ref={ref} className="px-6 py-3 my-6 text-center font-bold cursor-pointer ">
      Loading More ...
    </div>
  );
};

export default LoadMore;

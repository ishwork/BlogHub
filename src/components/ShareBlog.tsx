'use client';

import Image from 'next/image';

import { SHARE } from '@/src/constants';

const ShareBlog = () => {
  const handleShare = async () => {
    const shareData = {
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div
      role="button"
      title="Share"
      tabIndex={0}
      aria-label="Share blog post"
      className="inline-flex items-center self-center ml-5 cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 transition"
      onClick={handleShare}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleShare();
        }
      }}
    >
      <Image
        src={SHARE}
        alt="Share"
        width={24}
        height={24}
        data-testid="share-icon"
        className="dark:invert mb-1"
      />
      <span className="ml-0.5 text-xs sm:text-sm text-text/70">Share</span>
    </div>
  );
};

export default ShareBlog;

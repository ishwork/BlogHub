import { BlogPost } from '@/src/types';

import LoadMorePosts from '@/src/components/LoadMorePosts';

type FrontpageProps = {
  initialPosts: BlogPost[];
};

const Frontpage = ({ initialPosts }: FrontpageProps) => {
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-text mb-4">Welcome to BlogHub</h1>
        </div>

        {/* All Blog Posts */}
        {initialPosts.length > 0 && <LoadMorePosts initialPosts={initialPosts} />}

        {initialPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text/70 text-lg">No blog posts found. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Frontpage;

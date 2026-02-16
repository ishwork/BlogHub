import { BlogPost } from '@/src/types';

import Hero from '@/src/components/Hero';
import LoadMorePosts from '@/src/components/LoadMorePosts';

type FrontpageProps = {
  initialPosts: BlogPost[];
};

const Frontpage = ({ initialPosts }: FrontpageProps) => {
  return (
    <>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* All Blog Posts */}
        {initialPosts.length > 0 && <LoadMorePosts initialPosts={initialPosts} />}

        {initialPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text/70 text-lg">No blog posts found. Check back soon!</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Frontpage;

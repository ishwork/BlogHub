import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FAVICON_ICON, BLOG_OG_IMAGE, SITE_URL } from '@/src/constants';

import { getPaginatedBlogPosts } from '@/src/lib/fetchBlogpost';

import Frontpage from '@/src/components/Frontpage';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'BlogHub - Home',
  description:
    'Welcome to BlogHub, your go-to platform for amazing blog posts on tech, life, and more.',
  openGraph: {
    title: 'BlogHub - Home',
    description:
      'Welcome to BlogHub, your go-to platform for amazing blog posts on tech, life, and more.',
    url: SITE_URL,
    siteName: 'BlogHub',
    images: [
      {
        url: BLOG_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'BlogHub Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: FAVICON_ICON,
  },
  robots: 'index, follow',
};

const Home = async () => {
  const { posts } = await getPaginatedBlogPosts(0, 5);

  if (!posts) return notFound();

  return <Frontpage initialPosts={posts} />;
};

export default Home;

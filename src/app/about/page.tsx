import { Metadata } from 'next';

import { FAVICON_ICON, SITE_URL } from '@/src/constants';

import About from '@/src/components/About';

export const metadata: Metadata = {
  title: 'About - BlogHub',
  description: 'Learn about BlogHub, our mission, vision, and values.',
  openGraph: {
    title: 'About BlogHub',
    description: 'Learn about BlogHub, our mission, vision, and values.',
    url: `${SITE_URL}/about`,
    siteName: 'BlogHub',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: FAVICON_ICON,
  },
};

const AboutPage = () => (
  <main className="bg-background min-h-screen py-12 w-full flex justify-center">
    <div className="px-4 sm:px-6 w-full card-max-width">
      <About />
    </div>
  </main>
);

export default AboutPage;

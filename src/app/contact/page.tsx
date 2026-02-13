import { Metadata } from 'next';

import { FAVICON_ICON, SITE_URL } from '@/src/constants';

import Contact from '@/src/components/Contact';

export const metadata: Metadata = {
  title: 'Contact - BlogHub',
  description: 'Get in touch with BlogHub. We would love to hear from you.',
  openGraph: {
    title: 'Contact BlogHub',
    description: 'Get in touch with BlogHub. We would love to hear from you.',
    url: `${SITE_URL}/contact`,
    siteName: 'BlogHub',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: FAVICON_ICON,
  },
};

const ContactPage = () => (
  <main className="bg-background min-h-screen py-12 w-full flex justify-center">
    <div className="px-4 sm:px-6 w-full card-max-width">
      <Contact />
    </div>
  </main>
);

export default ContactPage;

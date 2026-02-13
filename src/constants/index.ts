const FAVICON_ICON = '/favicon/blogHub.ico';
const BLOG_IMAGE = '/images/blogHub.svg';
const LOGO_IMAGE = '/images/logo.svg';
const SUN_ICON = '/images/sun-icon.svg';
const MOON_ICON = '/images/moon-icon.svg';

// Site URL based on environment
const SITE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : 'http://localhost:3000';

// Absolute OG image URL
const BLOG_OG_IMAGE = `${SITE_URL}${BLOG_IMAGE}`;

export { FAVICON_ICON, BLOG_OG_IMAGE, BLOG_IMAGE, LOGO_IMAGE, SUN_ICON, MOON_ICON, SITE_URL };

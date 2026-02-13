## BlogHub

BlogHub is a clean, responsive blog platform built with Next.js and Sanity. It fetches posts from a Sanity dataset, renders a card-based homepage, and provides a detail view for each blog post.

## Features

- Homepage with recent blog posts and featured cards
- Dynamic blog post pages at `/blogs/[blog]`
- Sanity CMS integration for content and images
- Theme support with `next-themes`
- SEO-friendly metadata and Open Graph tags

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Sanity client + image URL builder
- Tailwind CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env.local` file with the following values:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

- `npm run dev` - start the dev server
- `npm run build` - build for production
- `npm run start` - start the production server
- `npm run eslint` - run linting
- `npm run format` - format with Prettier
- `npm run test:audit` - run npm audit (high and above)

## Project Structure

- `src/app` - App Router pages and layouts
- `src/components` - UI components (cards, header, footer, theme toggle)
- `src/lib` - Sanity client and data fetching
- `src/types` - shared TypeScript types

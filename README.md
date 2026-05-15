## BlogHub

BlogHub is a clean, responsive blog platform built with Next.js and Sanity. It fetches posts from a Sanity dataset, renders a card-based homepage, and provides a detail view for each blog post.

🔗 **Live:**

- Vercel: [https://blog-hub-web.vercel.app](https://blog-hub-web.vercel.app)

## Project Architecture

- **Presentation layer (components)**
  - Reusable UI lives in `src/components` (`Header`, `Footer`, `Hero`, `BlogCard`, `BlogPostDetail`, etc.).
  - Static content pages (`About`, `Contact`) are rendered from local data modules.
- **Routing layer (app router)**
  - Route entry points are in `src/app` (`/`, `/about`, `/contact`, and dynamic `/blogs/[blog]`).
  - Global shell is composed in `layout.tsx` with shared providers, header/footer, and analytics.
  - Error boundaries are handled through `error.tsx` and `not-found.tsx`.
- **Data layer**
  - CMS fetch logic is centralized in `src/lib/fetchBlogpost.ts`.
  - Sanity client (`src/lib/sanityClient.ts`) fetches CMS data; image URLs are built in `src/lib/enrichBlogPost.ts`.
  - Server-side route handler `src/app/api/frontpage/route.ts` serves paginated frontpage data.
- **State and fetching**
  - `QueryProvider` sets up TanStack Query globally.
  - `useFetchInfinitePosts` encapsulates infinite-query pagination behavior.
  - `LoadMore` uses Intersection Observer to trigger next-page fetches.
- **Other features**
  - Theme management is handled by `next-themes` through `ThemeProvider`.
  - SEO metadata is defined per route with Next.js Metadata API and Open Graph fields.
  - Shared constants and domain types are defined under `src/constants` and `src/types`.

## Rendering Strategy

Uses a hybrid rendering model:

- **Server-side rendering (SSR) for route entry**
  - Home (`src/app/page.tsx`) fetches the initial post batch on the server.
  - Blog detail (`src/app/blogs/[blog]/page.tsx`) fetches the post by slug on the server.
- **Client-side rendering (CSR) for interactive pagination**
  - `Frontpage` and `LoadMore` are client components.
  - TanStack Query + Intersection Observer progressively load additional pages in the browser.

## Tech Stack

- Next.js 16 App Router
- React 19 + TypeScript
- Zod (runtime schema validation)
- TanStack Query (infinite queries + client caching)
- Sanity (`@sanity/client`, `@sanity/image-url`)
- Tailwind CSS v4
- next-themes (light/dark theme handling)
- Jest + Testing Library (component tests)
- ESLint + Prettier
- Docker + Docker Compose
- GitHub Actions CI (build, tests, audit, lint)

## Project Structure

- `src/app` - route segments, page entry points, metadata, API route handlers, and error boundaries
- `src/components` - shared presentational and container components
- `src/hooks` - reusable client hooks (infinite loading logic)
- `src/lib` - external integration clients and server data fetchers
- `src/lib/utils` - content rendering helpers (portable text mark handling)
- `src/data` - static content sources for non-CMS pages
- `src/constants` - app-wide constants and URL configuration
- `src/styles` - global style entrypoint
- `src/types` - shared domain and component types
- `.github/workflows` - CI pipelines for build/test/lint/audit

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env.local` file with the following values:

```bash
NEXT_PUBLIC_BASE_URL=https://blog-hub-web.vercel.app
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=your_dataset
SANITY_API_VERSION=2024-01-01
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

- `npm run dev` - start the dev server
- `npm run build` - build for production
- `npm run analyze` - analyze bundle size
- `npm run start` - start the production server
- `npm run eslint` - run linting
- `npm run format` - format with Prettier
- `npm run test:react` - run Jest + React Testing Library tests
- `npm run test:audit` - run npm audit (high and above)

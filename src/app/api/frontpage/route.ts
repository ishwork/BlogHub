import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { getPaginatedBlogPosts } from '@/src/lib/fetchBlogpost';
import { PaginatedBlogPostParamsSchema } from '@/src/lib/schemas';

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const params = PaginatedBlogPostParamsSchema.parse({
      start: searchParams.get('start') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
    });

    const result = await getPaginatedBlogPosts(params);

    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    console.error('Error fetching posts:', error);
    return NextResponse.json({ posts: [], totalPages: 0 }, { status: 500 });
  }
};

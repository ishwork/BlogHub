import { NextRequest, NextResponse } from 'next/server';

import { getPaginatedBlogPosts } from '@/src/lib/fetchBlogpost';

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const start = parseInt(searchParams.get('start') || '0', 10);
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    const safeStart = Number.isNaN(start) ? 0 : start;
    const safeLimit = Number.isNaN(limit) ? 5 : limit;

    const result = await getPaginatedBlogPosts({ start: safeStart, limit: safeLimit });
    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      {
        posts: [],
        totalPages: 0,
      },
      { status: 500 },
    );
  }
};

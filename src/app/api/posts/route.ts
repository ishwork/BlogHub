import { NextRequest, NextResponse } from 'next/server';

import { BlogPost } from '@/src/types/index';
import { client } from '@/src/lib/sanityClient';

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const start = Number(searchParams.get('start') || '0');
    const limit = Number(searchParams.get('limit') || '5');

    const safeStart = Number.isFinite(start) && start >= 0 ? start : 0;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 5;

    const query = `*[_type == "blogPost"] | order(publishedAt desc)[$start...$end] {
    _id,
    title,
    slug,
    author,
    mainImage,
    publishedAt,
    body
  }`;

    const [posts, totalCount] = await Promise.all([
      client.fetch(query, {
        start: safeStart,
        end: safeStart + safeLimit,
      }),
      client.fetch(`count(*[_type == "blogPost"])`),
    ]);

    const totalPages = Math.ceil((totalCount || 0) / safeLimit) || 0;

    return NextResponse.json({
      posts: posts as BlogPost[],
      totalPages,
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

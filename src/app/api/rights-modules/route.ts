import { NextRequest, NextResponse } from 'next/server';
import { db, rightsModules } from '@/lib/db';
import { eq, ilike, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let whereConditions = [];

    if (query) {
      whereConditions.push(
        or(
          ilike(rightsModules.title, `%${query}%`),
          ilike(rightsModules.summary, `%${query}%`),
          ilike(rightsModules.detailedContent, `%${query}%`)
        )
      );
    }

    if (category) {
      whereConditions.push(eq(rightsModules.type, category));
    }

    const modules = await db
      .select()
      .from(rightsModules)
      .where(whereConditions.length > 0 ? whereConditions[0] : undefined)
      .limit(limit)
      .offset(offset)
      .orderBy(rightsModules.createdAt);

    return NextResponse.json({
      success: true,
      data: modules,
      pagination: {
        limit,
        offset,
        total: modules.length,
      },
    });
  } catch (error) {
    console.error('Error fetching rights modules:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rights modules' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, summary, detailedContent, tags, type, isPremium } = body;

    if (!title || !summary || !detailedContent || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newModule = await db
      .insert(rightsModules)
      .values({
        title,
        summary,
        detailedContent,
        tags: tags || [],
        type,
        isPremium: isPremium || false,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newModule[0],
    });
  } catch (error) {
    console.error('Error creating rights module:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create rights module' },
      { status: 500 }
    );
  }
}

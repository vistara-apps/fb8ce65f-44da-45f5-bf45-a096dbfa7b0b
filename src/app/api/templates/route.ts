import { NextRequest, NextResponse } from 'next/server';
import { db, templates } from '@/lib/db';
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
          ilike(templates.title, `%${query}%`),
          ilike(templates.body, `%${query}%`),
          ilike(templates.category, `%${query}%`)
        )
      );
    }

    if (category) {
      whereConditions.push(eq(templates.category, category));
    }

    const templateList = await db
      .select()
      .from(templates)
      .where(whereConditions.length > 0 ? whereConditions[0] : undefined)
      .limit(limit)
      .offset(offset)
      .orderBy(templates.createdAt);

    return NextResponse.json({
      success: true,
      data: templateList,
      pagination: {
        limit,
        offset,
        total: templateList.length,
      },
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, body: templateBody, usageInstructions, category, isPremium, price } = body;

    if (!title || !templateBody || !usageInstructions || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newTemplate = await db
      .insert(templates)
      .values({
        title,
        body: templateBody,
        usageInstructions,
        category,
        isPremium: isPremium || true,
        price: price || '0.01',
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newTemplate[0],
    });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create template' },
      { status: 500 }
    );
  }
}

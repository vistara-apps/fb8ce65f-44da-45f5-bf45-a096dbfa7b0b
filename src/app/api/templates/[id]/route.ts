import { NextRequest, NextResponse } from 'next/server';
import { getTemplateById } from '@/lib/supabase';
import { customizeTemplate } from '@/lib/openai';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const template = await getTemplateById(params.id);

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: template,
    });

  } catch (error) {
    console.error('Template API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userContext } = await request.json();

    if (!userContext) {
      return NextResponse.json(
        { error: 'User context is required for customization' },
        { status: 400 }
      );
    }

    const template = await getTemplateById(params.id);

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Customize the template based on user context
    const customizedContent = await customizeTemplate(template, userContext);

    return NextResponse.json({
      success: true,
      data: {
        ...template,
        customizedBody: customizedContent,
      },
    });

  } catch (error) {
    console.error('Template customization API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

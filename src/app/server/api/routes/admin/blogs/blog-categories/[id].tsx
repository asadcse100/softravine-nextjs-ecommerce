import { NextResponse } from "next/server";
import { updateBlogCategory, deleteBlogCategory } from '@/app/server/controllers/BlogCategoryController';
import type { NextRequest } from 'next/server';

export async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (req.method === 'PUT') {
    const { categoryName } = await req.json();

    if (!categoryName || typeof categoryName !== 'string' || categoryName.length > 255) {
      return NextResponse.json({ error: 'Category name is required and must be less than 255 characters.' }, { status: 400 });
    }

    try {
      const category = await updateBlogCategory(Number(id), categoryName);
      return NextResponse.json({ category }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else if (req.method === 'DELETE') {
    try {
      await deleteBlogCategory(Number(id));
      return NextResponse.json({ message: 'Blog category deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405, headers: { Allow: 'PUT, DELETE' } });
  }
}

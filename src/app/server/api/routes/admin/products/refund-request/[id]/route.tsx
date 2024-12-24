import { NextResponse } from "next/server";
import { deleteAffiliate } from '@/app/server/controllers/AffiliateController';
import type { NextRequest } from 'next/server';

// export async function PUT(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get('id');

export async function PUT(req: Request, { params }: { params: { id: number } }) {
    const id = params.id;

    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: 'Invalid or missing ID.' }, { status: 400 });
    }

    try {
        const { categoryName } = await req.json();

        if (!categoryName || typeof categoryName !== 'string' || categoryName.length > 255) {
            return NextResponse.json(
                { error: 'Category name is required and must be less than 255 characters.' },
                { status: 400 }
            );
        }

        const category = await updateBlogCategory(Number(id), categoryName);
        return NextResponse.json({ category }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
    const id = params.id;

    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: 'Invalid or missing ID.' }, { status: 400 });
    }

    try {
        await deleteAffiliate(Number(id));
        return NextResponse.json({ message: 'Blog category deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

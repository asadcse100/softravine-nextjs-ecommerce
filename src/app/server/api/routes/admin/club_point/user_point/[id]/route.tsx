import { NextResponse } from "next/server";
import { createOrUpdateClubPoint, deleteClubPoint, getClubPointById } from '@/app/server/controllers/ClubPointController';

export async function GET(req: Request, { params }: { params: { id: number } }) {
    const id = params.id;

    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: 'Invalid or missing ID.' }, { status: 400 });
    }
    try {
        const result = await getClubPointById(Number(id));
        const blogcategories = result.data;
        return NextResponse.json(blogcategories);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

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

        const category = await createOrUpdateClubPoint(Number(id), categoryName);
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
        await deleteClubPoint(Number(id));
        return NextResponse.json({ message: 'Blog category deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

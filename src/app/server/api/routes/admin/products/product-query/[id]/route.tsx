import { NextResponse } from "next/server";
import { getProductQueryById, createOrUpdateProductQuery } from '@/app/server/controllers/ProductQueryController';

export async function GET(req: Request, { params }: { params: { id: number } }) {
    const id = params.id;

    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: 'Invalid or missing ID.' }, { status: 400 });
    }
    try {
        const result = await getProductQueryById(Number(id));
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
        const category = await createOrUpdateProductQuery(Number(id), categoryName);
        return NextResponse.json({ category }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// export async function DELETE(req: Request, { params }: { params: { id: number } }) {
//     const id = params.id;

//     if (!id || isNaN(Number(id))) {
//         return NextResponse.json({ error: 'Invalid or missing ID.' }, { status: 400 });
//     }

//     try {
//         await deleteProductQuery(Number(id));
//         return NextResponse.json({ message: 'Blog category deleted successfully' }, { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }

import { NextResponse } from "next/server";
import { createOrUpdateAffiliateConfiguration, AffiliateConfigurationById } from '@/app/server/controllers/AffiliateController';
import type { NextRequest } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: number } }) {
    const id = params.id;

    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: 'Invalid or missing ID.' }, { status: 400 });
    }
    try {
        const result = await AffiliateConfigurationById(Number(id));
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
        const category = await createOrUpdateAffiliateConfiguration(Number(id), categoryName);
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
//         await deleteBlogCategory(Number(id));
//         return NextResponse.json({ message: 'Blog category deleted successfully' }, { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }

import { NextResponse } from "next/server";
import { updateUser } from '@/app/server/controllers/ProfileController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        await updateUser(req, res);
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

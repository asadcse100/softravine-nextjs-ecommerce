import { NextResponse } from "next/server";
import { cancelOrder } from '@/app/server/controllers/PurchaseHistoryController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const orderId = Number(req.query.id);
            const userId = Number(req.headers.userid); // Assuming you're passing user ID in headers
            await cancelOrder(orderId, userId);
            return res.status(200).json({ success: true, message: 'Order canceled successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

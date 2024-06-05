import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { CombinedOrder } from '../../../models/CombinedOrder';
import { SSLCommerz } from '../../../services/SSLCommerz';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const session = await getSession({ req });

        if (session) {
            const { payment_type } = req.body;

            if (payment_type === 'cart_payment') {
                const combined_order = await CombinedOrder.findById(req.body.combined_order_id);
                if (combined_order) {
                    const post_data = {
                        total_amount: combined_order.grand_total,
                        currency: "BDT",
                        tran_id: Math.random().toString(36).substring(7), // Generate unique transaction ID
                        value_a: req.body.combined_order_id,
                        value_b: req.body.combined_order_id,
                        value_c: payment_type,
                        // Add customer information if needed
                    };

                    const sslc = new SSLCommerz();
                    const payment_options = sslc.initiate(post_data, false);
                    res.status(200).json(payment_options);
                    return;
                }
            } else if (payment_type === 'wallet_payment') {
                // Handle wallet payment
            } else if (payment_type === 'customer_package_payment') {
                // Handle customer package payment
            } else if (payment_type === 'seller_package_payment') {
                // Handle seller package payment
            }
        }

        res.status(401).json({ error: 'Unauthorized' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

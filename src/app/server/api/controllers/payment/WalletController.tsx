import { NextApiRequest, NextApiResponse } from 'next';
import { CombinedOrder } from '../../../models/CombinedOrder';
import { CustomerPackage } from '../../../models/CustomerPackage';
import { SellerPackage } from '../../../models/SellerPackage';
import { getSession } from 'next-auth/client';
import { User } from '../../../models/User';

const pay = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (req.method === 'POST') {
            const { paymentType, paymentData, combinedOrderId } = req.body;

            if (paymentType === 'cart_payment') {
                const user = await User.findOne({ where: { id: session.user.id } });
                const combinedOrder = await CombinedOrder.findByPk(combinedOrderId);

                if (!user || !combinedOrder) {
                    return res.status(404).json({ error: 'User or combined order not found' });
                }

                if (user.balance >= combinedOrder.grandTotal) {
                    user.balance -= combinedOrder.grandTotal;
                    await user.save();
                    return res.status(200).json({ message: 'Checkout done' });
                } else {
                    return res.status(400).json({ error: 'Insufficient balance' });
                }
            } else if (paymentType === 'customer_package_payment') {
                const customerPackage = await CustomerPackage.findByPk(paymentData.customerPackageId);

                if (!customerPackage) {
                    return res.status(404).json({ error: 'Customer package not found' });
                }

                // Handle customer package payment
                // Assuming some action needs to be performed here
            } else if (paymentType === 'seller_package_payment') {
                const sellerPackage = await SellerPackage.findByPk(paymentData.sellerPackageId);

                if (!sellerPackage) {
                    return res.status(404).json({ error: 'Seller package not found' });
                }

                // Handle seller package payment
                // Assuming some action needs to be performed here
            } else {
                return res.status(400).json({ error: 'Invalid payment type' });
            }
        } else {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default pay;

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export const getSellerWithdrawRequests = async () => {
// export async function getSellerWithdrawRequests(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         const sellerWithdrawRequests = await prisma.sellerWithdrawRequest.findMany({
//             orderBy: { createdAt: 'desc' },
//         });
//         return sellerWithdrawRequests;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Failed to fetch seller withdraw requests');
//     }
// };

export const getSellerWithdrawRequests = async () => {
  try {
    const sellerWithdrawRequests = await prisma.seller_withdraw_requests.findMany();
    // Convert BigInt fields to strings
    const serializedSellerWithdrawRequest = sellerWithdrawRequests.map(sellerWithdrawRequest => ({
      ...sellerWithdrawRequest,
      user_id: sellerWithdrawRequest.user_id.toString(), // Assuming id is the BigInt field
    }));
    return { success: true, data: serializedSellerWithdrawRequest };
  } catch (error) {
    return { success: false, error };
  }
}

export const storeWithdrawRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { amount, message } = req.body;

  if (!req.user || !req.user.shopId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const withdrawRequest = await prisma.sellerWithdrawRequest.create({
      data: {
        userId: req.user.shopId,
        amount: parseFloat(amount),
        message: message,
        status: '0',
        viewed: false
      }
    });

    res.status(200).json({ message: 'Request has been sent successfully', data: withdrawRequest });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};


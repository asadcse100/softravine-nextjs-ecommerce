// pages/api/flash-deals/update-featured.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { updateFlashDealFeatured } from '@/app/server/controllers/FlashDealController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { id, featured } = req.body;
      const updatedFlashDeal = await updateFlashDealFeatured(id, featured);
      res.status(200).json({ message: 'Flash deal featured status updated successfully', flashDeal: updatedFlashDeal });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

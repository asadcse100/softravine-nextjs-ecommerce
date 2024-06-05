// pages/api/flash-deals/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { updateFlashDeal, deleteFlashDeal } from '@/app/server/controllers/FlashDealController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const id = parseInt(req.query.id as string, 10);
      const flashDeal = await updateFlashDeal({ ...req.body, id });
      res.status(200).json({ message: 'Flash Deal has been updated successfully', flashDeal });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }
  
  if (req.method === 'DELETE') {
    try {
      const id = parseInt(req.query.id as string, 10);
      const message = await deleteFlashDeal(id);
      res.status(200).json({ message });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }
};

// import { Request, Response } from 'express';
// import { CommissionHistory } from '../models/CommissionHistory'; // Make sure to import your CommissionHistory model

// export async function index(req: Request, res: Response) {
//     const seller_id = req.user.id; // Assuming user id is stored in req.user.id
//     let date_range: string | null = null;

//     let commission_history = CommissionHistory.find({ seller_id }).sort({ created_at: 'desc' });

//     if (req.query.date_range) {
//         date_range = req.query.date_range as string;
//         const [startDate, endDate] = date_range.split(" / ");
//         commission_history = commission_history.where('created_at').gte(startDate).lte(endDate);
//     }

//     try {
//         const commissionHistoryResult = await commission_history.paginate(10);
//         res.render('seller.commission_history.index', { commission_history: commissionHistoryResult, seller_id, date_range });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCommissionHistories = async () => {
  try {
    const commission_history = await prisma.commission_histories.findMany();
    return { success: true, data: commission_history };
  } catch (error) {
    console.error("Error fetching commission history:", error);
    return { success: false, error };
  }
}
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// export default async function index(req: NextApiRequest, res: NextApiResponse) {
export const index = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const userId = req.headers['user-id'] as string; // Assuming user ID is passed in the headers
        if (!userId) {
            res.status(400).json({ error: 'User ID not provided' });
            return;
        }

        const wallets = await prisma.wallet.findMany({
            where: {
                user_id: parseInt(userId),
            },
            orderBy: {
                created_at: 'desc',
            },
        });

        res.status(200).json(wallets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// export default async function recharge(req: NextApiRequest, res: NextApiResponse) {
    export const recharge = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { amount, payment_option } = req.body;
  
      // Store recharge data in session for payment processing
      req.session.payment_type = 'wallet_payment';
      req.session.payment_data = {
        amount,
        payment_method: payment_option,
      };
  
      // Form the controller class name based on payment option
      const controllerClassName = payment_option.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Controller';
  
      // Check if the controller class exists
      const PaymentController = require(`../Payment/${controllerClassName}`).default;
      if (PaymentController) {
        return PaymentController.pay(req, res); // Assuming pay method handles payment processing
      } else {
        throw new Error('Payment controller not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  user_id: number;
  product_stock_id: number;
  amount: number;
  payment_method?: string;
  payment_details?: string;
  approval: number;
  offline_payment: number;
  reciept?: string;
  created_at?: string;
};

export const getWalletById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.wallets.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return { success: false, error: "Record does not exist." };
    }

    return { success: true, data: existingCategory };
  } catch (error) {
    // console.error("Error category:", error);
    return { success: false, error };
  }
};

// export default async function index(req: NextApiRequest, res: NextApiResponse) {
// export const index = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const userId = req.headers['user-id'] as string; // Assuming user ID is passed in the headers
//         if (!userId) {
//             res.status(400).json({ error: 'User ID not provided' });
//             return;
//         }

//         const wallets = await prisma.wallet.findMany({
//             where: {
//                 user_id: parseInt(userId),
//             },
//             orderBy: {
//                 created_at: 'desc',
//             },
//         });

//         res.status(200).json(wallets);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

export const index = async () => {
  try {
    const wallets = await prisma.wallets.findMany();
    // Convert BigInt fields to strings
    const serializedWallet = wallets.map(wallet => ({
      ...wallet,
      user_id: wallet.user_id.toString(), // Assuming id is the BigInt field
    }));
    return { success: true, data: serializedWallet };
  } catch (error) {
    // console.error("Error fetching wallet:", error);
    return { success: false, error };
  }
}

export const customerWallet = async () => {
  try {
    const wallets = await prisma.wallets.findMany();
    // Convert BigInt fields to strings
    const serializedWallet = wallets.map(wallet => ({
      ...wallet,
      user_id: wallet.user_id.toString(), // Assuming id is the BigInt field
    }));
    return { success: true, data: serializedWallet };
  } catch (error) {
    // console.error("Error fetching wallet:", error);
    return { success: false, error };
  }
}

// export default async function recharge(req: NextApiRequest, res: NextApiResponse) {
// export const recharge = async () => {
  export const recharge = async (id: number) => {
  try {
    // const { amount, payment_option } = req.body;

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
    // return { success: true, data: PaymentController };
  } catch (error) {
    return { success: false, error };
    // console.error(error);
    // res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function walletPaymentDone() {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { amount, paymentMethod, paymentDetails } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await prisma.users.update({
      where: { id: user.id },
      data: { balance: user.balance + amount }
    });

    const wallet = await prisma.wallet.create({
      data: {
        userId: user.id,
        amount,
        paymentMethod,
        paymentDetails
      }
    });

    // Clear session data equivalent
    // This might not be directly applicable in Next.js; instead, manage the session as needed
    // Example: req.session.paymentData = null;
    // Example: req.session.paymentType = null;
    return { success: true, data: wallet, updatedUser };
    // return res.status(200).json({ message: 'Recharge completed', user: updatedUser, wallet });
  } catch (error) {
    return { success: false, error };
    // return res.status(500).json({ error: 'Internal server error' });
  }
}


export async function offlineRecharge() {
  const session = await getSession({ req });
  if (!session) {
    // return res.status(401).json({ error: 'Unauthorized' });
    return { success: false, error: "Unauthorized" };
  }

  const { amount, paymentOption, trxId, photo } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: { email: session.users.email }
    });

    if (!user) {
      // return res.status(404).json({ error: 'User not found' });
      return { success: false, error: "Record does not exist." };
    }

    const wallet = await prisma.wallets.create({
      data: {
        userId: user.id,
        amount,
        paymentMethod: paymentOption,
        paymentDetails: trxId,
        approval: false,
        offlinePayment: true,
        receipt: photo
      }
    });
    return { success: true, data: wallet };
    // return res.status(200).json({ message: 'Offline Recharge has been done. Please wait for response.', wallet });
  } catch (error) {
    // return res.status(500).json({ error: 'Internal server error' });
    return { success: false, error };
  }
}

export async function getOfflineRechargeRequests() {
  try {
    const wallets = await prisma.wallets.findMany({
      where: { offlinePayment: true },
      include: { user: true } // Include related user data if needed
    });
    return { success: true, data: wallets };
    // return res.status(200).json(wallets);
  } catch (error) {
    // return res.status(500).json({ error: 'Internal server error' });
    return { success: false, error };
  }
}


// export async function updateApproved() {

export const updateApproved = async (id: number) => {
  // const { id, status } = req.body;

  try {
    const wallet = await prisma.wallets.findUnique({
      where: { id: Number(id) },
      include: { users: true },
    });

    if (!wallet) {
      // return res.status(404).json({ error: 'Wallet not found' });
      return { success: false, error: "Record does not exist." };
    }

    const user = wallet.users;

    if (status === 1) {
      await prisma.users.update({
        where: { id: user.id },
        data: { balance: user.balance + wallet.amount },
      });
    } else {
      await prisma.users.update({
        where: { id: user.id },
        data: { balance: user.balance - wallet.amount },
      });
    }

    const updatedWallet = await prisma.wallets.update({
      where: { id: Number(id) },
      data: { approval: status },
    });

    if (updatedWallet) {
      return { success: true, data: updatedWallet };
      // return res.status(200).json({ success: true });
    }
    return { success: false };
    // return res.status(500).json({ success: false });
  } catch (error) {
    // return res.status(500).json({ error: 'Internal server error' });
    return { success: false, error };
  }
}
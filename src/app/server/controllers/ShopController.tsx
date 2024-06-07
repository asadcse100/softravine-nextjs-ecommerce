// controllers/sellerController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { sendEmailVerification } from '../utils/sendEmailVerification';

const prisma = new PrismaClient();

export const createSeller = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.isAuthenticated()) {
    const user = req.user;

    if (user.userType === 'admin' || user.userType === 'customer') {
      return res.status(400).json({ error: 'Admin or Customer cannot be a seller' });
    }
    
    if (user.userType === 'seller') {
      return res.status(400).json({ error: 'This user is already a seller' });
    }
  } else {
    return res.status(200).json({ view: 'frontend.seller_form' });
  }
};


export const storeSeller = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, email, password, shopName, address } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          name,
          email,
          userType: 'seller',
          password: hashedPassword,
        },
      });
  
      const shopSlug = shopName.replace(/\s+/g, '-').replace(/\//g, ' ');
  
      const shop = await prisma.shop.create({
        data: {
          userId: user.id,
          name: shopName,
          address,
          slug: shopSlug,
        },
      });
  
      // Assuming a function to authenticate and login the user
      await loginUser(req, res, user);
  
      const emailVerificationSetting = await prisma.businessSetting.findUnique({
        where: { type: 'email_verification' },
      });
  
      if (emailVerificationSetting?.value == 0) {
        await prisma.user.update({
          where: { id: user.id },
          data: { emailVerifiedAt: new Date() },
        });
      } else {
        sendEmailVerification(user);
      }
  
      res.status(200).json({ message: 'Your Shop has been created successfully!', shop });
    } catch (error) {
      res.status(500).json({ error: 'Sorry! Something went wrong.' });
    }
  };
  
  // Dummy login function, replace with actual authentication logic
  async function loginUser(req: NextApiRequest, res: NextApiResponse, user: any) {
    // Login logic here, for example using NextAuth or a custom session
  }
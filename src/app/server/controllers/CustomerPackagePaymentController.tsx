import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export const getOfflinePaymentRequests = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     // Retrieve offline payment requests
//     const packagePaymentRequests = await prisma.customerPackagePayment.findMany({
//       where: {
//         offline_payment: true,
//       },
//       orderBy: {
//         id: 'desc',
//       },
//     });

//     res.status(200).json(packagePaymentRequests);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to retrieve offline payment requests' });
//   }
// };

export const getOfflinePaymentRequests = async () => {
  try{
      const packagePaymentRequests = await prisma.customer_package_payments.findMany();
      return { success: true, data: packagePaymentRequests };
  }catch(error){
      console.error("Error fetching packagePaymentRequests:", error);
      return { success: false, error };
  }
}

export const approveOfflinePayment = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id, status } = req.body;
  
      // Retrieve the package payment and its details
      const packagePayment = await prisma.customerPackagePayment.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          customer_package: true,
          user: true,
        },
      });
  
      // Update approval status of the package payment
      const updatedPackagePayment = await prisma.customerPackagePayment.update({
        where: {
          id: packagePayment.id,
        },
        data: {
          approval: status,
        },
      });
  
      // Update user's package and remaining uploads if payment is approved
      if (status === 1) {
        await prisma.user.update({
          where: {
            id: packagePayment.user.id,
          },
          data: {
            customer_package_id: packagePayment.customer_package_id,
            remaining_uploads: {
              increment: packagePayment.customer_package.product_upload,
            },
          },
        });
      }
  
      res.status(200).json({ success: 'Offline payment request updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update offline payment request' });
    }
  };
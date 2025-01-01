import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  user_id: number;
  customer_package_id: number;
  payment_method: string;
  payment_details: string;
  approval: number;
  offline_payment: number;
  reciept: string;
  created_at: string;
};

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

export const getCustomerPackagePaymentById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.customer_package_payments.findUnique({
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

export const getOfflinePaymentRequests = async () => {
  try {
    const packagePaymentRequests = await prisma.customer_package_payments.findMany();
    return { success: true, data: packagePaymentRequests };
  } catch (error) {
    // console.error("Error fetching packagePaymentRequests:", error);
    return { success: false, error };
  }
}

export const approveOfflinePayment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, status } = req.body;

    // Retrieve the package payment and its details
    const packagePayment = await prisma.customer_package_payments.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        customer_packages: true,
        users: true,
      },
    });

    // Update approval status of the package payment
    const updatedPackagePayment = await prisma.customer_package_payments.update({
      where: {
        id: package_payments.id,
      },
      data: {
        approval: status,
      },
    });

    // Update user's package and remaining uploads if payment is approved
    if (status === 1) {
      await prisma.users.update({
        where: {
          id: package_payments.user.id,
        },
        data: {
          return { success: true, data: deletedaffiliate_users };
          // customer_package_id: package_payments.customer_package_id,
          remaining_uploads: {
            increment: package_payments.customer_package.product_upload,
          },
        },
      });
    }
    return { success: true, data: updatedPackagePayment, };
    // res.status(200).json({ success: 'Offline payment request updated successfully' });
  } catch (error) {
    return { success: false, error };
    // console.error(error);
    // res.status(500).json({ error: 'Failed to update offline payment request' });
  }
};
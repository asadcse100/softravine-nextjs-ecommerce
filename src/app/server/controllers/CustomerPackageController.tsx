
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  name: string;
  amount: number;
  product_upload: number;
  logo: number;
  created_at?: string;
};

// export const getAllCustomerPackages = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     // Retrieve all customer packages
//     const customerPackages = await prisma.customerPackage.findMany();

//     res.status(200).json(customerPackages);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to retrieve customer packages' });
//   }
// };

export const getAllCustomerPackages = async () => {
  try{
      const customerPackages = await prisma.customer_packages.findMany();
      return { success: true, data: customerPackages };
  }catch(error){
      console.error("Error fetching customerPackages:", error);
      return { success: false, error };
  }
}

export const createOrUpdateCustomerPackage = async () => {
    try {
      const { name, amount, product_upload, logo } = req.body;
  
      // Create the customer package
      const customerPackage = await prisma.customer_packages.create({
        data: {
          name,
          amount,
          product_upload,
          logo,
          translations: {
            create: {
              lang: process.env.DEFAULT_LANGUAGE, // Default language from environment variables
              name,
            },
          },
        },
      });
  
      res.status(201).json({ success: 'Package has been inserted successfully', customerPackage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to insert package' });
    }
  };

  // export const updateCustomerPackage = async (req: NextApiRequest, res: NextApiResponse) => {
  //   try {
  //     const { id } = req.query;
  //     const { name, amount, product_upload, logo, lang } = req.body;
  
  //     // Find the customer package by ID
  //     const customerPackage = await prisma.customer_packages.findUnique({
  //       where: {
  //         id: Number(id),
  //       },
  //     });
  
  //     if (!customerPackage) {
  //       return res.status(404).json({ error: 'Customer package not found' });
  //     }
  
  //     // Update customer package fields
  //     if (lang === process.env.DEFAULT_LANGUAGE) {
  //       customerPackage.name = name;
  //     }
  //     customerPackage.amount = amount;
  //     customerPackage.product_upload = product_upload;
  //     customerPackage.logo = logo;
  
  //     // Save the changes
  //     await prisma.customer_packages.update({
  //       where: {
  //         id: Number(id),
  //       },
  //       data: {
  //         name: customerPackage.name,
  //         amount: customerPackage.amount,
  //         product_upload: customerPackage.product_upload,
  //         logo: customerPackage.logo,
  //         translations: {
  //           upsert: {
  //             where: {
  //               lang_customerPackage_id: {
  //                 lang,
  //                 customerPackage_id: Number(id),
  //               },
  //             },
  //             update: {
  //               name: customerPackage.name,
  //             },
  //             create: {
  //               lang,
  //               name: customerPackage.name,
  //               customerPackage_id: customerPackage.id,
  //             },
  //           },
  //         },
  //       },
  //     });
  
  //     res.status(200).json({ success: 'Package has been updated successfully' });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Failed to update package' });
  //   }
  // };

  export const deleteCustomerPackage = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
  
      // Delete customer package translations
      await prisma.customer_package_translations.deleteMany({
        where: {
          customer_package_id: Number(id),
        },
      });
  
      // Delete customer package
      await prisma.customer_packages.delete({
        where: {
          id: Number(id),
        },
      });
  
      res.status(200).json({ success: 'Package has been deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete package' });
    }
  };


  export const purchasePackage = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { customer_package_id, payment_option } = req.body;
  
      // Store payment data in session
      const paymentData: PaymentData = {
        customer_package_id,
        payment_method: payment_option,
      };
      req.session.payment_type = 'customer_package_payment';
      req.session.payment_data = paymentData;
  
      // Retrieve customer package details
      const customerPackage = await prisma.customer_packages.findUnique({
        where: {
          id: customer_package_id,
        },
      });
  
      // Handle free package
      if (customerPackage.amount === 0) {
        const user = await prisma.users.findUnique({
          where: {
            id: req.users.id,
          },
        });
        if (users.customer_package_id !== customerPackage.id) {
          return purchasePaymentDone(req, res, null);
        } else {
          return res.status(400).json({ error: 'You cannot purchase this package anymore' });
        }
      }
  
      // Initiate payment process based on selected payment method
      const paymentController = require(`../controllers/payment/${payment_option}Controller`);
      if (paymentController && typeof paymentController.pay === 'function') {
        return paymentController.pay(req, res);
      } else {
        return res.status(400).json({ error: 'Payment method not supported' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to initiate purchase process' });
    }
  };

  export const purchasePaymentDone = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const paymentData = req.session.payment_data;
      const user = await prisma.users.findUnique({
        where: {
          id: req.users.id,
        },
      });
  
      // Update user's customer package and remaining uploads
      await prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
          customer_package_id: paymentData.customer_package_id,
          remaining_uploads: {
            increment: paymentData.product_upload,
          },
        },
      });
  
      res.status(200).json({ success: 'Package purchasing successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to complete purchase' });
    }
  };

  export const purchasePackageOffline = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { package_id, payment_option, trx_id, photo } = req.body;
  
      // Create a new customer package payment entry
      await prisma.customer_package_payments.create({
        data: {
          users: {
            connect: {
              id: req.users.id,
            },
          },
          customer_packages: {
            connect: {
              id: package_id,
            },
          },
          payment_method: payment_option,
          payment_details: trx_id,
          approval: 0,
          offline_payments: true,
          reciept: photo || '',
        },
      });
  
      res.status(200).json({ success: 'Offline payment has been done. Please wait for response.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to initiate offline payment' });
    }
  };
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  type: string;
  heading: string;
  description: string;
  bank_info: string;
  photo: string;
  created_at?: string;
};

// export const getManualPaymentMethods = async (data: createOrUpdateData) => {
//   try {
//     const manualPaymentMethods = await prisma.manualPaymentMethod.findMany();
//     res.status(200).json(manualPaymentMethods);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

export const getManualPaymentMethods = async () => {
  try{
      const manualPaymentMethods = await prisma.manual_payment_methods.findMany();
      return { success: true, data: manualPaymentMethods };
  }catch(error){
      // console.error("Error fetching manualPaymentMethods:", error);
      return { success: false, error };
  }
}

export const storeManualPaymentMethod = async (data: createOrUpdateData) => {
    const { type, photo, heading, description, bank_name, account_name, account_number, routing_number } = req.body;
  
    try {
      let bankInfo = null;
  
      if (type === 'bank_payment') {
        const banksInformations = bank_name.map((_, i) => ({
          bank_name: bank_name[i],
          account_name: account_name[i],
          account_number: account_number[i],
          routing_number: routing_number[i],
        }));
  
        bankInfo = JSON.stringify(banksInformations);
      }
  
      const manualPaymentMethod = await prisma.manual_payment_methods.create({
        data: {
          type,
          photo,
          heading,
          description,
          bank_info: bankInfo,
        },
      });
      return { success: true, data: manualPaymentMethod };
      // res.status(201).json({ message: 'Method has been inserted successfully', manualPaymentMethod });
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: 'Internal server error' });
      return { success: false, error };
    }
  };


  export const updateManualPaymentMethod = async (data: createOrUpdateData) => {
    // const { id } = req.query;
    const id = data.id;
    const { type, photo, heading, description, bank_name, account_name, account_number, routing_number } = req.body;
  
    try {
      let bankInfo = null;
  
      if (type === 'bank_payment') {
        const banksInformations = bank_name.map((_, i) => ({
          bank_name: bank_name[i],
          account_name: account_name[i],
          account_number: account_number[i],
          routing_number: routing_number[i],
        }));
  
        bankInfo = JSON.stringify(banksInformations);
      }
  
      const manualPaymentMethod = await prisma.manual_payment_methods.update({
        where: { id: Number(id) },
        data: {
          type,
          photo,
          heading,
          description,
          bank_info: bankInfo,
        },
      });
      return { success: true, data: manualPaymentMethod };
      // res.status(200).json({ message: 'Method has been updated successfully', manualPaymentMethod });
    } catch (error) {
      return { success: false, error };
      // console.error(error);
      // res.status(500).json({ error: 'Internal server error' });
    }
  };

  // export const deleteManualPaymentMethod = async (data: createOrUpdateData) => {
  //   const { id } = req.query;
  
  //   try {
  //     const deletedManualPaymentMethod = await prisma.manual_payment_methods.delete({
  //       where: { id: Number(id) },
  //     });
  
  //     res.status(200).json({ message: 'Method has been deleted successfully', deletedManualPaymentMethod });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Something went wrong' });
  //   }
  // };
  
  export const deleteManualPaymentMethod = async (id: number) => {
    try {
      // Check if the record exists
      const existingManualPaymentMethods = await prisma.manual_payment_methods.findUnique({
        where: { id },
      });
  
      if (!existingManualPaymentMethods) {
        return { success: false, error: "Record does not exist." };
      }
  
      const deletedManualPaymentMethods = await prisma.manual_payment_methods.delete({
        where: { id },
      });
      return { success: true, data: deletedManualPaymentMethods };
    } catch (error) {
      console.error("Error deleting ManualPaymentMethods:", error);
      return { success: false, error };
    }
  };

  export const submitOfflinePayment = async (data: createOrUpdateData) => {
    const { order_id, name, amount, trx_id, photo, payment_option } = req.body;
  
    if (!name || !amount || !trx_id) {
      return { success: false, error };
      // res.status(400).json({ error: 'Please fill all the fields' });
      // return;
    }
  
    try {
      const order = await prisma.orders.findUnique({ where: { id: Number(order_id) } });
  
      if (!order) {
        return { success: false, error };
        // res.status(404).json({ error: 'Order not found' });
        // return;
      }
  
      const manualPaymentData = {
        name,
        amount,
        trx_id,
        photo,
      };
  
      const updatedOrder = await prisma.orders.update({
        where: { id: Number(order_id) },
        data: {
          manual_payment_data: JSON.stringify(manualPaymentData),
          payment_type: payment_option,
          payment_status: 'Submitted',
          manual_payments: true,
        },
      });
      return { success: true, data: updatedOrder };
      // res.status(200).json({ message: 'Your payment data has been submitted successfully', updatedOrder });
    } catch (error) {
      return { success: false, error };
      // console.error(error);
      // res.status(500).json({ error: 'Internal server error' });
    }
  };

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  customer_package_id: number;
  referred_by: number;
  provider: string;
  provider_id: string;
  refresh_token: string;
  access_token: string;
  user_type: string;
  name: string;
  email: string;
  email_verified_at?: string;
  verification_code: string;
  new_email_verificiation_code: string;
  password: string;
  remember_token: string;
  device_token: string;
  avatar: string;
  avatar_original: string;
  address: string;
  country: string;
  state: string;
  city: string;
  postal_code: string;
  phone: string;
  balance: number;
  banned: number;
  referral_code: string;
  remaining_uploads: number;
  created_at: string;
};

export const selectCustomers = async () => {
  try{
      const customers = await prisma.users.findMany({
        select: {
            name: true,
        },
    });
    return { success: true, data: customers };

  }catch(error){
      console.error("Error fetching customer:", error);
      return { success: false, error };
  }
}

// export const getCustomerList = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { search } = req.query;
//     const sortSearch = search ? String(search) : null;

//     const customers = await prisma.user.findMany({
//       where: {
//         user_type: 'customer',
//         email_verified_at: {
//           not: null,
//         },
//         OR: [
//           {
//             name: {
//               contains: sortSearch,
//               mode: 'insensitive',
//             },
//           },
//           {
//             email: {
//               contains: sortSearch,
//               mode: 'insensitive',
//             },
//           },
//         ],
//       },
//       orderBy: {
//         created_at: 'desc',
//       },
//       take: 15,
//     });

//     res.status(200).json({ customers, sort_search: sortSearch });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch customers' });
//   }
// };

export const getCustomerList = async () => {
  try {
    const customers = await prisma.users.findMany();
    // Convert BigInt fields to strings
    const serializedCustomers = customers.map(customer => ({
      ...customer,
      id: customer.id.toString(), // Assuming id is the BigInt field
    }));
    return { success: true, data: serializedCustomers };
  } catch (error) {
    console.error("Error fetching customers:", error);
    return { success: false, error };
  }
}

export const createUserAndCustomer = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, email, phone } = req.body;

    // Validate the request data
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    // Check if the email and phone are unique
    const existingUserWithEmail = await prisma.users.findFirst({
      where: { email },
    });
    const existingUserWithPhone = await prisma.users.findFirst({
      where: { phone },
    });

    if (existingUserWithEmail || existingUserWithPhone) {
      return res.status(400).json({ error: 'Email or phone already exists' });
    }

    // Create the user
    const user = await prisma.users.create({
      data: {
        name,
        email,
        phone,
      },
    });

    // Create the associated customer
    await prisma.users.create({
      data: {
        user_id: user.id,
      },
    });

    // Build HTML response
    let html = '';
    html += '<option value="">'.concat('Walk In Customer', '</option>');
    const customers = await prisma.users.findMany();
    customers.forEach((customer) => {
      if (customer.user_id) {
        html += '<option value="'.concat(customer.user.id, '" data-contact="').concat(customer.user.email, '">').concat(customer.user.name, '</option>');
      }
    });

    return res.status(200).json({ status: 'Success', html });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create user and customer' });
  }
};


export const deleteCustomer = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    // Delete associated customer products
    await prisma.customer_products.deleteMany({
      where: {
        customer_id: Number(id),
      },
    });

    // Delete the customer
    await prisma.users.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ success: 'Customer has been deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};

export const bulkDeleteCustomers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { ids } = req.body;

    for (const id of ids) {
      // Delete associated customer products
      await prisma.customer_products.deleteMany({
        where: {
          customer_id: Number(id),
        },
      });

      // Delete the customer
      await prisma.users.delete({
        where: {
          id: Number(id),
        },
      });
    }

    res.status(200).json({ success: 'Customers have been deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete customers' });
  }
};

export const loginUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    // Find the user by their ID
    const user = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Log in the user
    req.sessions.user = user;

    res.status(200).json({ success: 'User logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log in user' });
  }
};

export const toggleUserBanStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    // Find the user by their ID
    const user = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Toggle the user's banned status
    user.banned = !user.banned;

    await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        banned: user.banned,
      },
    });

    const successMessage = user.banned ? 'Customer Banned Successfully' : 'Customer Unbanned Successfully';
    res.status(200).json({ success: successMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to toggle user ban status' });
  }
};
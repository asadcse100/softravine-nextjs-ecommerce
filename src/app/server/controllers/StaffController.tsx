// controllers/staffController.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  user_id: number;
  role_id: number;
  created_at?: string;
};

// export const getStaffs = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const staffs = await prisma.staff.findMany();
//     res.status(200).json({ staffs });
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong while fetching the staffs.' });
//   }
// };

// export const getStaffs = async () => {
//   try{
//       const staffs = await prisma.users.findMany();
//       return { success: true, data: staffs };
//   }catch(error){
//       console.error("Error fetching staffs:", error);
//       return { success: false, error };
//   }
// }


type staffData = {
  name: string;
  email: string;
  mobile: any;
  password: any;
};

export const roles = async () => {
  try {
    const roles = await prisma.roles.findMany({
      select: {
        name: true,
      },
    });
    return { success: true, data: roles };

  } catch (error) {
    console.error("Error fetching roles:", error);
    return { success: false, error };
  }
}

export const getStaffs = async () => {
  try {
    const staffs = await prisma.users.findMany();

    // Convert BigInt fields to strings
    const serializedStaffs = staffs.map(staff => ({
      ...staff,
      id: staff.id.toString(), // Assuming id is the BigInt field
    }));

    return { success: true, data: serializedStaffs };
  } catch (error) {
    console.error("Error fetching staffs:", error);
    return { success: false, error };
  }
}

// export async function storeStaff(data: staffData) {

//   const { name, email, mobile, password, role_id } = data;

//   try {
//     const existingUser = await prisma.users.findUnique({ where: { email } });

//     if (existingUser) {
//       return error.status(400).json({ error: 'Email already used' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await prisma.users.create({
//       data: {
//         name,
//         email,
//         phone: mobile,
//         user_type: 'staff',
//         password: hashedPassword,
//       },
//     });

//     const role = await prisma.roles.findUnique({ where: { id: role_id } });
//     if (!role) {
//       return error.status(400).json({ error: 'Invalid role ID' });
//     }

//     await prisma.staff.create({
//       data: {
//         user_id: user.id,
//         role_id: role_id,
//       },
//     });

//     // Assuming a function to assign a role to a user
//     await assignRole(user.id, role.name);

//     success.status(200).json({ message: 'Staff has been inserted successfully' });
//   } catch (error) {
//     error.status(500).json({ error: 'Something went wrong.' });
//   }
// }


export async function createOrUpdateStaff(data: createOrUpdateData) {

  try {

    const created_at = data.created_at ? new Date(data.created_at) : new Date();

    const newPost = await prisma.staff.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        user_id: data.user_id,
        role_id: data.role_id,
        updated_at: data.created_at,
      },
      create: {
        user_id: data.user_id,
        role_id: data.role_id,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error };
  }
}

// Dummy function to assign role to a user, replace with actual implementation

async function assignRole(userId: number, roleName: string) {
  // Role assignment logic here, could be using a pivot table or a related table
}

// export const updateStaff = async (req: NextApiRequest, res: NextApiResponse) => {
// export async function updateStaff(data: staffData) {
//   // const { id } = req.query;
//   // const { name, email, mobile, password, roleId } = req.body;

//   const { name, email, mobile, password, role_id } = data;

//   try {
//     const staff = await prisma.staff.findUnique({
//       where: { id: Number(id) },
//       include: { users: true },
//     });

//     if (!staff) {
//       return res.status(404).json({ error: 'Staff not found' });
//     }

//     const userUpdateData: any = {
//       name,
//       email,
//       phone: mobile,
//     };

//     if (password.length > 0) {
//       userUpdateData.password = await bcrypt.hash(password, 10);
//     }

//     const user = await prisma.users.update({
//       where: { id: staff.user_id },
//       data: userUpdateData,
//     });

//     const staffUpdate = await prisma.staff.update({
//       where: { id: Number(id) },
//       data: { role_id: Number(role_id) },
//     });

//     const role = await prisma.roles.findUnique({ where: { id: Number(role_id) } });
//     if (!role) {
//       return res.status(400).json({ error: 'Invalid role ID' });
//     }

//     // Assuming a function to sync roles
//     await syncRoles(user.id, role.name);

//     res.status(200).json({ message: 'Staff has been updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };

// Dummy function to sync roles, replace with actual implementation
async function syncRoles(userId: number, roleName: string) {
  // Role sync logic here, could be using a pivot table or a related table
}

// export const deleteStaff = async (req: NextApiRequest, res: NextApiResponse) => {
export async function deleteStaff(data: staffData) {
  const { id } = req.query;

  try {
    const staff = await prisma.staff.findUnique({
      where: { id: Number(id) },
      include: { users: true },
    });

    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }

    await prisma.users.delete({
      where: { id: staff.user_id },
    });

    await prisma.staff.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Staff has been deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
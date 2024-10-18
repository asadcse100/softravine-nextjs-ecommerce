// controllers/staffController.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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

export const storeStaff = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, email, mobile, password, roleId } = req.body;
  
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Email already used' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          name,
          email,
          phone: mobile,
          userType: 'staff',
          password: hashedPassword,
        },
      });
  
      const role = await prisma.role.findUnique({ where: { id: roleId } });
      if (!role) {
        return res.status(400).json({ error: 'Invalid role ID' });
      }
  
      await prisma.staff.create({
        data: {
          userId: user.id,
          roleId: roleId,
        },
      });
  
      // Assuming a function to assign a role to a user
      await assignRole(user.id, role.name);
  
      res.status(200).json({ message: 'Staff has been inserted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  };
  
  // Dummy function to assign role to a user, replace with actual implementation
  async function assignRole(userId: number, roleName: string) {
    // Role assignment logic here, could be using a pivot table or a related table
  }


  export const updateStaff = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { name, email, mobile, password, roleId } = req.body;
  
    try {
      const staff = await prisma.staff.findUnique({
        where: { id: Number(id) },
        include: { user: true },
      });
  
      if (!staff) {
        return res.status(404).json({ error: 'Staff not found' });
      }
  
      const userUpdateData: any = {
        name,
        email,
        phone: mobile,
      };
  
      if (password.length > 0) {
        userUpdateData.password = await bcrypt.hash(password, 10);
      }
  
      const user = await prisma.user.update({
        where: { id: staff.userId },
        data: userUpdateData,
      });
  
      const staffUpdate = await prisma.staff.update({
        where: { id: Number(id) },
        data: { roleId: Number(roleId) },
      });
  
      const role = await prisma.role.findUnique({ where: { id: Number(roleId) } });
      if (!role) {
        return res.status(400).json({ error: 'Invalid role ID' });
      }
  
      // Assuming a function to sync roles
      await syncRoles(user.id, role.name);
  
      res.status(200).json({ message: 'Staff has been updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  
  // Dummy function to sync roles, replace with actual implementation
  async function syncRoles(userId: number, roleName: string) {
    // Role sync logic here, could be using a pivot table or a related table
  }


  export const deleteStaff = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
  
    try {
      const staff = await prisma.staff.findUnique({
        where: { id: Number(id) },
        include: { user: true },
      });
  
      if (!staff) {
        return res.status(404).json({ error: 'Staff not found' });
      }
  
      await prisma.user.delete({
        where: { id: staff.userId },
      });
  
      await prisma.staff.delete({
        where: { id: Number(id) },
      });
  
      res.status(200).json({ message: 'Staff has been deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
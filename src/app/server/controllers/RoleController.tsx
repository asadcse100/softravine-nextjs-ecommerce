import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  name: string;
  guard_name: string;
  permissions: string;
  created_at?: string;
};

// export async function index(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const roles = await prisma.role.findMany({
//       where: {
//         id: {
//           not: 1,
//         },
//       },
//     });

//     res.status(200).json({ roles });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

export const index = async () => {
  try {
    const roles = await prisma.roles.findMany();

    // Convert BigInt fields to strings
    const serializedRoles = roles.map(role => ({
      ...role,
      id: role.id.toString(), // Assuming id is the BigInt field
    }));

    return { success: true, data: serializedRoles };
  } catch (error) {
    console.error("Error fetching roles:", error);
    return { success: false, error };
  }
}

export async function createOrUpdateRole(data: createOrUpdateData) {
  const { name, permissions } = data;

  try {
    // Create role
    const role = await prisma.roles.create({
      data: {
        name,
      },
    });

    // Add permissions to the role
    for (const permission of permissions) {
      await prisma.role_has_permissions.create({
        data: {
          role_id: role.id,
          permission_id: permission,
        },
      });
    }

    // Create or update role translation
    await prisma.role_translations.upsert({
      where: {
        role_id_lang: {
          roleId: role.id,
          lang: process.env.DEFAULT_LANGUAGE, // Assuming you have DEFAULT_LANGUAGE defined in your environment variables
        },
      },
      create: {
        roleId: role.id,
        lang: process.env.DEFAULT_LANGUAGE,
        name,
      },
      update: {
        name,
      },
    });

    res.status(201).json({ message: 'New Role has been added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// export async function update(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;
//   const { name, permissions, lang } = req.body;

//   try {
//     // Find role by ID
//     const role = await prisma.role.findUnique({
//       where: {
//         id: Number(id),
//       },
//     });

//     // Update role name if the language matches the default language
//     if (lang === process.env.DEFAULT_LANGUAGE && role) {
//       await prisma.role.update({
//         where: {
//           id: Number(id),
//         },
//         data: {
//           name,
//         },
//       });
//     }

//     // Remove existing permissions for the role
//     await prisma.rolePermission.deleteMany({
//       where: {
//         roleId: Number(id),
//       },
//     });

//     // Add new permissions to the role
//     for (const permission of permissions) {
//       await prisma.rolePermission.create({
//         data: {
//           roleId: Number(id),
//           permissionId: permission,
//         },
//       });
//     }

//     // Create or update role translation
//     await prisma.roleTranslation.upsert({
//       where: {
//         roleId_lang: {
//           roleId: Number(id),
//           lang,
//         },
//       },
//       create: {
//         roleId: Number(id),
//         lang,
//         name,
//       },
//       update: {
//         name,
//       },
//     });

//     res.status(200).json({ message: 'Role has been updated successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

export async function destroy() {
  const { id } = req.query;

  try {
    // Delete role translations
    await prisma.role_translations.deleteMany({
      where: {
        role_id: Number(id),
      },
    });

    // Delete role permissions
    await prisma.role_has_permissions.deleteMany({
      where: {
        role_id: Number(id),
      },
    });

    // Delete role
    await prisma.roles.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ message: 'Role has been deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export async function addPermission() {
  const { name, parent } = req.body;

  try {
    // Create a new permission
    const permission = await prisma.permissions.create({
      data: {
        name,
        section: parent,
      },
    });

    res.status(201).json({ message: 'Permission has been added successfully', permission });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


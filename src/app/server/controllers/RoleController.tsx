// controllers/StaffRoleController.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const roles = await prisma.role.findMany({
      where: {
        id: {
          not: 1,
        },
      },
    });

    res.status(200).json({ roles });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function store(req: NextApiRequest, res: NextApiResponse) {
    const { name, permissions } = req.body;
  
    try {
      // Create role
      const role = await prisma.role.create({
        data: {
          name,
        },
      });
  
      // Add permissions to the role
      for (const permission of permissions) {
        await prisma.rolePermission.create({
          data: {
            roleId: role.id,
            permissionId: permission,
          },
        });
      }
  
      // Create or update role translation
      await prisma.roleTranslation.upsert({
        where: {
          roleId_lang: {
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

  export async function update(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { name, permissions, lang } = req.body;
  
    try {
      // Find role by ID
      const role = await prisma.role.findUnique({
        where: {
          id: Number(id),
        },
      });
  
      // Update role name if the language matches the default language
      if (lang === process.env.DEFAULT_LANGUAGE && role) {
        await prisma.role.update({
          where: {
            id: Number(id),
          },
          data: {
            name,
          },
        });
      }
  
      // Remove existing permissions for the role
      await prisma.rolePermission.deleteMany({
        where: {
          roleId: Number(id),
        },
      });
  
      // Add new permissions to the role
      for (const permission of permissions) {
        await prisma.rolePermission.create({
          data: {
            roleId: Number(id),
            permissionId: permission,
          },
        });
      }
  
      // Create or update role translation
      await prisma.roleTranslation.upsert({
        where: {
          roleId_lang: {
            roleId: Number(id),
            lang,
          },
        },
        create: {
          roleId: Number(id),
          lang,
          name,
        },
        update: {
          name,
        },
      });
  
      res.status(200).json({ message: 'Role has been updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  export async function destroy(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
  
    try {
      // Delete role translations
      await prisma.roleTranslation.deleteMany({
        where: {
          roleId: Number(id),
        },
      });
  
      // Delete role permissions
      await prisma.rolePermission.deleteMany({
        where: {
          roleId: Number(id),
        },
      });
  
      // Delete role
      await prisma.role.delete({
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


  export async function addPermission(req: NextApiRequest, res: NextApiResponse) {
    const { name, parent } = req.body;
  
    try {
      // Create a new permission
      const permission = await prisma.permission.create({
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

  
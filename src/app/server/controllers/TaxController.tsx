import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    name: string;
    tax_status: boolean;
    created_at?: string;
};

export const getTaxes = async () => {
    try {
        const texes = await prisma.taxes.findMany();
        return { success: true, data: texes };
    } catch (error) {
        return { success: false, error };
    }
}

// export const store = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const { name } = req.body;
//         const tax = await prisma.tax.create({
//             data: {
//                 name,
//             },
//         });
//         res.status(201).json(tax);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

export async function createOrUpdateTax(data: createOrUpdateData) {
  try {

    const created_at = data.created_at ? new Date(data.created_at) : new Date();

    const newPost = await prisma.taxes.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        name: data.name,
        tax_status: data.tax_status,
        updated_at: data.created_at,
      },
      create: {
        name: data.name,
        tax_status: data.tax_status,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error };
  }
};

// export default async function update(req: NextApiRequest, res: NextApiResponse) {
// export const update = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const { id } = req.query;
//         const { name } = req.body;

//         const updatedTax = await prisma.tax.update({
//             where: {
//                 id: parseInt(id as string),
//             },
//             data: {
//                 name,
//             },
//         });

//         res.status(200).json(updatedTax);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// export default async function destroy(req: NextApiRequest, res: NextApiResponse) {
export const destroy = async () => {
    try {
        const { id } = req.query;

        const deletedTax = await prisma.taxes.delete({
            where: {
                id: parseInt(id as string),
            },
        });

        res.status(200).json(deletedTax);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// export default async function changeTaxStatus(req: NextApiRequest, res: NextApiResponse) {
export const changeTaxStatus = async () => {
    try {
        const { id } = req.body;

        const tax = await prisma.taxes.findUnique({
            where: {
                id: parseInt(id as string),
            },
        });

        if (!tax) {
            res.status(404).json({ error: 'Tax not found' });
            return;
        }

        const updatedTax = await prisma.taxes.update({
            where: {
                id: parseInt(id as string),
            },
            data: {
                tax_status: tax.tax_status === 1 ? 0 : 1,
            },
        });

        res.status(200).json(updatedTax.tax_status);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
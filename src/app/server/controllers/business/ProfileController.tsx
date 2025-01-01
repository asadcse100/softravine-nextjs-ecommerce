import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    type: string;
    value: string;
};

// export default async function ProfileController(req: NextApiRequest, res: NextApiResponse) {
// export const updateUser = async () => {
//     if (req.method === 'GET') {
//         return handleGet(req, res);
//     } else if (req.method === 'PUT') {
//         return handlePut(req, res);
//     } else {
//         res.status(405).end(); // Method Not Allowed
//     }
// }

// async function handleGet(req: NextApiRequest, res: NextApiResponse) {
export const getUserById = async () => {
    const userId = req.query.id;

    try {
        const user = await prisma.users.findUnique({
            where: { id: Number(userId) },
            include: { addresses: true }
        });
        return { success: true, data: user };
        // res.status(200).json(user);
    } catch (error) {
        return { success: false, error };
        // console.error('Error:', error);
        // res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createOrUpdateUser = async (data: createOrUpdateData) => {
    //code
}

// async function handlePut(req: NextApiRequest, res: NextApiResponse) {
//     const userId = req.query.id;
//     const {
//         name,
//         phone,
//         new_password,
//         confirm_password,
//         photo,
//         cash_on_delivery_status,
//         bank_payment_status,
//         bank_name,
//         bank_acc_name,
//         bank_acc_no,
//         bank_routing_no
//     } = req.body;

//     try {
//         const user = await prisma.users.update({
//             where: { id: Number(userId) },
//             data: {
//                 name,
//                 phone,
//                 ...(new_password && new_password === confirm_password && { password: await hash(new_password, 10) }),
//                 avatar_original: photo,
//                 shop: {
//                     update: {
//                         cash_on_delivery_status,
//                         bank_payment_status,
//                         bank_name,
//                         bank_acc_name,
//                         bank_acc_no,
//                         bank_routing_no
//                     }
//                 }
//             }
//         });
//         res.status(200).json({ message: 'Your Profile has been updated successfully!' });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

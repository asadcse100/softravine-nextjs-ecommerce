import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

type createOrUpdateData = {
    id: number | null;
    type: string;
    value: string;
};

const prisma = new PrismaClient();

// export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const { id } = req.query;
//         const { name, email, newPassword, confirmPassword, avatar } = req.body;

//         if (process.env.DEMO_MODE === 'On') {
//             return res.status(403).json({ success: false, message: 'Sorry! the action is not permitted in demo' });
//         }

//         const user = await prisma.user.update({
//             where: { id: Number(id) },
//             data: {
//                 name: name,
//                 email: email,
//                 password: newPassword && newPassword === confirmPassword ? await hash(newPassword, 10) : undefined,
//                 avatar_original: avatar
//             }
//         });

//         return res.status(200).json({ success: true, message: 'Your Profile has been updated successfully!', user });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: 'Sorry! Something went wrong.' });
//     }
// };

export const updateUser = async (data: createOrUpdateData) => {
    try {
        const user = await prisma.users.findMany();
        return { success: true, data: user };
    } catch (error) {
        console.error("Error fetching user:", error);
        return { success: false, error };
    }
}
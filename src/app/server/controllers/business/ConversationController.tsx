// import { Request, Response } from 'express';
// import Conversation from '../models/Conversation'; // Make sure to import your Conversation model
// import BusinessSetting from '../models/BusinessSetting'; // Import your BusinessSetting model
// import Message from '../models/Message'; // Import your Message model
// import Auth from '../services/Auth'; // Assuming you have an Auth service for authentication

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    sender_id: number;
    receiver_id: number;
    title: string;
    sender_viewed: number;
    receiver_viewed: number;
    created_at?: string;
};


export const getConversationById = async (id: number) => {
    try {
        // Check if the record exists
        const existingCategory = await prisma.ticket_replies.findUnique({
            where: { id },
        });

        if (!existingCategory) {
            return { success: false, error: "Record does not exist." };
        }

        return { success: true, data: existingCategory };
    } catch (error) {
        console.error("Error category:", error);
        return { success: false, error };
    }
};

export const getConversation = async () => {
    try {
        const Conversation = await prisma.conversations.findMany();
        return { success: true, data: Conversation };
    } catch (error) {
        console.error("Error fetching Conversation:", error);
        return { success: false, error };
    }
}

export async function createOrUpdateConversation(data: createOrUpdateData) {
    try {
        // Use the provided `created_at` or fallback to the current date
        const created_at = data.created_at ? new Date(data.created_at) : new Date();
        // Perform the upsert operation
        const newCategory = await prisma.conversations.upsert({
            where: { id: data.id || 0 }, // Replace `0` with a non-zero ID if necessary
            update: {
                name: data.name,
                code: data.code,
                updated_at: created_at,
            },
            create: {
                name: data.name,
                code: data.code,
                created_at: created_at,
            },
        });

        return { success: true, data: newCategory };
    } catch (error) {
        console.error("Error creating or updating colors:", error);
        return { success: false, message: "An unexpected error occurred" };
    }
}

// export async function index(req: Request, res: Response) {
//     try {
//         const conversationSystemEnabled = await BusinessSetting.findOne({ type: 'conversation_system' });

//         if (conversationSystemEnabled?.value === 1) {
//             const conversations = await Conversation.find({
//                 $or: [{ sender_id: Auth.user.id }, { receiver_id: Auth.user.id }]
//             }).sort({ created_at: 'desc' }).paginate(5);

//             return res.render('seller.conversations.index', { conversations });
//         } else {
//             // Flash message not available in this conversion
//             return res.status(200).send('Conversation is disabled at this moment');
//         }
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// export async function show(req: Request, res: Response) {
//     try {
//         const conversationId = decrypt(req.params.id);
//         const conversation = await Conversation.findById(conversationId);

//         if (!conversation) {
//             return res.status(404).send('Conversation not found');
//         }

//         if (conversation.sender_id === Auth.user.id) {
//             conversation.sender_viewed = 1;
//         } else if (conversation.receiver_id === Auth.user.id) {
//             conversation.receiver_viewed = 1;
//         }

//         await conversation.save();
//         return res.render('seller.conversations.show', { conversation });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// export async function refresh(req: Request, res: Response) {
//     try {
//         const conversationId = decrypt(req.body.id);
//         const conversation = await Conversation.findById(conversationId);

//         if (!conversation) {
//             return res.status(404).send('Conversation not found');
//         }

//         if (conversation.sender_id === Auth.user.id) {
//             conversation.sender_viewed = 1;
//         } else {
//             conversation.receiver_viewed = 1;
//         }

//         await conversation.save();
//         return res.render('frontend.partials.messages', { conversation });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// export async function message_store(req: Request, res: Response) {
//     try {
//         const message = new Message({
//             conversation_id: req.body.conversation_id,
//             user_id: Auth.user.id,
//             message: req.body.message
//         });

//         await message.save();

//         const conversation = await message.conversation;

//         if (conversation.sender_id === Auth.user.id) {
//             conversation.receiver_viewed = "1";
//         } else if (conversation.receiver_id === Auth.user.id) {
//             conversation.sender_viewed = "1";
//         }

//         await conversation.save();
//         return res.redirect('back');
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

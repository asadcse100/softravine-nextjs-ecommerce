// services/messageService.ts
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    conversation_id: number;
    user_id: number;
    message: string;
    created_at?: string;
};

export async function createMessage(data: { conversation_id: number, message: string, user_id: number }) {
    const { conversation_id, message, user_id } = data;

    const newMessage = await prisma.messages.create({
        data: {
            conversation_id,
            user_id,
            message,
        },
    });

    const conversation = await prisma.conversations.findUnique({
        where: { id: conversation_id },
    });

    if (!conversation) {
        throw new Error('Conversation not found');
    }

    if (conversation.sender_id === user_id) {
        await prisma.conversations.update({
            where: { id: conversation_id },
            data: { receiver_vieweds: true },
        });
    } else if (conversation.receiver_id === user_id) {
        await prisma.conversations.update({
            where: { id: conversation_id },
            data: { sender_viewed: true },
        });
    }

    return newMessage;
}

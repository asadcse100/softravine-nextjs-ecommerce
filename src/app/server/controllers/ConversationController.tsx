import { PrismaClient } from '@prisma/client';
// import { getSession } from 'next-auth/client';
import { sendEmail } from '../utils/mail';

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

export const ticketReplies = async () => {
  try {
    const ticketReplies = await prisma.ticket_replies.findMany();
    // Convert BigInt fields to strings
    const serializedTicketReplies = ticketReplies.map(ticketReplie => ({
      ...ticketReplie,
      user_id: ticketReplie.user_id.toString(), // Assuming id is the BigInt field
    }));
    return { success: true, data: serializedTicketReplies };
  } catch (error) {
    return { success: false, error };
  }
}

export const store = async (data: createOrUpdateData) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user.id;
  const { productId, title, message: messageContent } = req.body;

  try {
    const product = await prisma.products.findUnique({
      where: { id: productId },
      include: { users: true },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const userType = product.users.user_type;

    const conversation = await prisma.conversations.create({
      data: {
        sender_id: userId,
        receiver_id: product.users.id,
        title,
      },
    });

    const message = await prisma.messages.create({
      data: {
        conversation_id: conversation.id,
        user_id,
        message: messageContent,
      },
    });

    await sendMessageToSeller(conversation, message, userType);

    res.status(200).json({ success: 'Message has been sent to seller' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

const sendMessageToSeller = async (conversation: Conversation, message: Message, userType: string) => {
    const sender = await prisma.users.findUnique({ where: { id: conversation.senderId } });
    const receiver = await prisma.users.findUnique({ where: { id: conversation.receiverId } });
  
    if (!sender || !receiver) {
      throw new Error('Sender or Receiver not found');
    }
  
    const subject = `Sender: ${sender.name}`;
    const content = `Hi! You received a message from ${sender.name}.`;
  
    let link: string;
    if (userType === 'admin') {
      link = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/conversations/${conversation.id}`;
    } else {
      link = `${process.env.NEXT_PUBLIC_BASE_URL}/conversations/${conversation.id}`;
    }
  
    const emailData = {
      to: receiver.email,
      subject,
      html: `
        <p>${content}</p>
        <p>${message.message}</p>
        <p><a href="${link}">View Conversation</a></p>
        <p>Sender: ${sender.name}</p>
      `,
    };
  
    try {
      await sendEmail(emailData);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  export const destroy = async (data: createOrUpdateData) => {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // const { id } = req.query;
    const id = data.id;
  
    try {
      const conversationId = parseInt(id as string, 10);
  
      // Find and delete all messages related to the conversation
      await prisma.messages.deleteMany({
        where: { conversations_id },
      });
  
      // Delete the conversation
      const deletedConversation = await prisma.conversations.delete({
        where: { id: conversationId },
      });
  
      if (deletedConversation) {
        res.status(200).json({ success: 'Conversation has been deleted successfully' });
      } else {
        res.status(404).json({ error: 'Conversation not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete conversation' });
    }
  };
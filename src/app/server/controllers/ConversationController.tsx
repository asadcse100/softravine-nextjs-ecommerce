import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
// import { getSession } from 'next-auth/client';
import { sendEmail } from '../utils/mail';

const prisma = new PrismaClient();

// const sendMessageToSeller = async (conversation, message, userType) => {
//   // Implement your message sending logic here
// };

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

export const store = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user.id;
  const { productId, title, message: messageContent } = req.body;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { user: true },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const userType = product.user.user_type;

    const conversation = await prisma.conversation.create({
      data: {
        senderId: userId,
        receiverId: product.user.id,
        title,
      },
    });

    const message = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        userId,
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

  export const destroy = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    const { id } = req.query;
  
    try {
      const conversationId = parseInt(id as string, 10);
  
      // Find and delete all messages related to the conversation
      await prisma.messages.deleteMany({
        where: { conversation_id },
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
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { subject, details, attachments } = req.body;
      const user = await prisma.user.findUnique({ where: { id: req.user.id } });
      const ticket = await prisma.ticket.create({
        data: {
          code: Math.max(100000, (await prisma.ticket.findFirst({ orderBy: { code: 'desc' } }))?.code + 1 || 0) + new Date().getSeconds(),
          userId: user.id,
          subject,
          details,
          files: attachments,
        },
      });

      await sendSupportMailToAdmin(ticket, user.name);

      res.status(201).json({ message: 'Ticket has been sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function sendSupportMailToAdmin(ticket, senderName) {
  const admin = await prisma.user.findFirst({ where: { userType: 'admin' } });

  if (!admin) {
    console.error('Admin not found');
    return;
  }

  const mail = {
    to: admin.email,
    subject: `Support ticket Code is: ${ticket.code}`,
    content: `Hi. A ticket has been created. Please check the ticket.`,
    link: `http://yourdomain.com/support_ticket/admin_show/${ticket.id}`,
    sender: senderName,
    details: ticket.details,
  };

  try {
    // your email sending logic here
  } catch (error) {
    console.error(error);
  }
}

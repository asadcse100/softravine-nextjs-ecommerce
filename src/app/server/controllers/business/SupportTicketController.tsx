import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  ticket: string;
  name: string;
};

export default async function getData(data: createOrUpdateData) {
    try {
      // const { subject, details, attachments } = req.body;
      const user = await prisma.users.findUnique({ where: { id: data.id } });
      const ticket = await prisma.tickets.create({
        data: {
          code: Math.max(100000, (await prisma.tickets.findFirst({ orderBy: { code: 'desc' } }))?.code + 1 || 0) + new Date().getSeconds(),
          user_id: user.id,
          subject,
          details,
          files: attachments,
        },
      });

      const supportMailToAdmin = await sendSupportMailToAdmin(ticket, users.name);

      return { success: true, data: supportMailToAdmin };
      // res.status(201).json({ message: 'Ticket has been sent successfully' });
    } catch (error) {
      return { success: false, error };
      // console.error(error);
      // res.status(500).json({ message: 'Something went wrong' });
    }

}

async function sendSupportMailToAdmin(ticket, senderName) {
  const admin = await prisma.users.findFirst({ where: { user_type: 'admin' } });
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  if (!admin) {
    console.error('Admin not found');
    return;
  }

  const mail = {
    to: admin.email,
    subject: `Support ticket Code is: ${ticket.code}`,
    content: `Hi. A ticket has been created. Please check the ticket.`,
    link: `${apiUrl}/support_ticket/admin_show/${ticket.id}`,
    sender: senderName,
    details: ticket.details,
  };

  try {
    // your email sending logic here
  } catch (error) {
    console.error(error);
  }
}

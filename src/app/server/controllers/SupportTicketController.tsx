// controllers/ticketController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// export const getUserTickets = async (req: NextApiRequest, res: NextApiResponse) => {
//   const userId = req.query.userId as string;

//   try {
//     const tickets = await prisma.ticket.findMany({
//       where: { userId: Number(userId) },
//       orderBy: { createdAt: 'desc' },
//     });

//     res.status(200).json({ tickets });
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };

export const customerTickets = async () => {
  try {
    const tickets = await prisma.tickets.findMany();
    // Convert BigInt fields to strings
    const serializedTicket = tickets.map(ticket => ({
      ...ticket,
      user_id: ticket.user_id.toString(), // Assuming id is the BigInt field
      code: ticket.	code.toString(), // Assuming id is the BigInt field
    }));
    return { success: true, data: serializedTicket };
  } catch (error) {
    return { success: false, error };
  }
}

export const getUserTickets = async () => {
  try {
    const tickets = await prisma.tickets.findMany();
    // Convert BigInt fields to strings
    const serializedTicket = tickets.map(ticket => ({
      ...ticket,
      user_id: ticket.user_id.toString(), // Assuming id is the BigInt field
      code: ticket.	code.toString(), // Assuming id is the BigInt field
    }));
    return { success: true, data: serializedTicket };
  } catch (error) {
    return { success: false, error };
  }
}

export const getAdminTickets = async (req: NextApiRequest, res: NextApiResponse) => {
  const { search } = req.query;

  try {
    let tickets: Ticket[];

    if (search) {
      tickets = await prisma.ticket.findMany({
        where: {
          code: { contains: search as string },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      tickets = await prisma.ticket.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    res.status(200).json({ tickets, search });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const createTicket = async (req: NextApiRequest, res: NextApiResponse) => {
  const { subject, details, attachments, userId } = req.body;

  try {
    const ticket = await prisma.ticket.create({
      data: {
        code: new Date().getTime() + userId,
        user: { connect: { id: userId } },
        subject,
        details,
        files: attachments,
      },
    });

    // Call function to send support email to admin
    // this.send_support_mail_to_admin(ticket);

    res.status(201).json({ message: 'Ticket has been sent successfully', ticket });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};


export const createTicketReply = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ticketId, reply, attachments, status, userId } = req.body;

  try {
    const ticketReply = await prisma.ticketReply.create({
      data: {
        ticket: { connect: { id: ticketId } },
        user: { connect: { id: userId } },
        reply,
        files: attachments,
      },
    });

    await prisma.ticket.update({
      where: { id: ticketId },
      data: { clientViewed: false, status },
    });

    // Call function to send support reply email to user
    // this.send_support_reply_email_to_user(ticketReply.ticket, ticketReply);

    res.status(201).json({ message: 'Reply has been sent successfully', ticketReply });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});


export const admin_store = async (req: NextApiRequest, res: NextApiResponse) => {
  // Your ticket creation logic here

  // Call the email function
  const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: process.env.ADMIN_EMAIL_ADDRESS,
    subject: `Support ticket Code is:- ${ticket.code}`,
    html: `
          <p>Hi,</p>
          <p>A ticket has been created. Please check the ticket details below:</p>
          <p>Sender: ${ticket.user.name}</p>
          <p>Details: ${ticket.details}</p>
          <p>Click <a href="${process.env.BASE_URL}/support_ticket/admin_show/${ticket.id}">here</a> to view the ticket.</p>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }

  // Send response or redirect as needed
};

export const sendSupportReplyEmailToUser = async () => {
  const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: ticket.user.email,
    subject: `Support ticket Code is:- ${ticket.code}`,
    html: `
        <p>Hi,</p>
        <p>A support reply has been sent for your ticket. Please check the details below:</p>
        <p>Sender: ${ticketReply.user.name}</p>
        <p>Details: ${ticketReply.reply}</p>
        <p>Click <a href="${ticket.user.user_type === 'seller' ? `/seller/support_ticket/show/${ticket.id}` : `/support_ticket/show/${ticket.id}`}">here</a> to view the ticket.</p>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Support reply email sent successfully');
  } catch (error) {
    console.error('Error sending support reply email:', error);
  }
};
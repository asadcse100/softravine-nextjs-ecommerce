// services/newsletterService.ts
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

interface EmailData {
    to: string;
    subject: string;
    content: string;
}

export const selectEmail = async () => {
    try {
        const emails = await prisma.users.findMany({
            select: {
                email: true,
            },
        });
        return { success: true, data: emails };
    } catch (error) {
        console.error("Error fetching product:", error);
        return { success: false, error };
    }
}

export async function sendEmail(emailData: EmailData) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_FROM_ADDRESS,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.content,
    };

    await transporter.sendMail(mailOptions);
}

export async function getUsersAndSubscribers() {
    const users = await prisma.user.findMany();
    const subscribers = await prisma.subscriber.findMany();
    return { users, subscribers };
}

export async function sendTestEmail(to: string) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_FROM_ADDRESS,
        to: to,
        subject: "SMTP Test",
        html: "This is a test email.",
    };

    await transporter.sendMail(mailOptions);
}

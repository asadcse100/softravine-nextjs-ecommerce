import { Notifiable } from '../../../admin/types/types'; // Assuming you have types defined for your models

interface EmailVerificationNotificationProps {
  notifiable: Notifiable;
}

interface MailMessage {
  view: string;
  subject: string;
  content: string;
  link: string;
}

export default class EmailVerificationNotification {
  constructor(private props: EmailVerificationNotificationProps) {}

  public via(notifiable: Notifiable): string[] {
    return ['mail'];
  }

  public toMail(notifiable: Notifiable): MailMessage {
    const { id } = notifiable;
    const verificationCode = this.encrypt(id);

    const array = {
      view: 'emails.verification',
      subject: 'Email Verification',
      content: 'Please click the button below to verify your email address.',
      link: `http://yourdomain.com/email/verification/confirmation/${verificationCode}`,
    };

    return {
      ...array,
      subject: `Email Verification - ${process.env.APP_NAME}`,
    };
  }

  public toArray(notifiable: Notifiable): Record<string, unknown> {
    return {};
  }

  private encrypt(id: string): string {
    // Implement encryption logic here, for example:
    return Buffer.from(id).toString('base64');
  }
}

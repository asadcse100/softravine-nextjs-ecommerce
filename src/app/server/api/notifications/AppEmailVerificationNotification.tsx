interface User {
    verification_code: string;
  }
  
  interface Notifiable {
    verification_code: string;
  }
  
  interface MailMessage {
    view: string;
    subject: string;
    content: string;
  }
  
  interface EmailVerificationNotificationProps {
    notifiable: Notifiable;
  }
  
  export default class AppEmailVerificationNotification {
    constructor(props: EmailVerificationNotificationProps) {}
  
    public via(notifiable: Notifiable): string[] {
      return ['mail'];
    }
  
    public toMail(notifiable: Notifiable): MailMessage {
      const array = {
        view: 'emails.app_verification',
        subject: 'Email Verification',
        content: `Please enter the code: ${notifiable.verification_code}`,
      };
  
      return {
        view: 'emails.app_verification',
        subject: `Email Verification - ${process.env.APP_NAME}`,
        content: `Please enter the code: ${notifiable.verification_code}`,
      };
    }
  
    public toArray(notifiable: Notifiable): Record<string, unknown> {
      return {};
    }
  }
  
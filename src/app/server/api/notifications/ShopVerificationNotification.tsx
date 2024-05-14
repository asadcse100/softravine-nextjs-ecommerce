// components/notifications/ShopVerificationNotification.ts

import { Notification } from 'next';
import { Shop } from '../types'; // Assuming you have a Shop type defined
import { MailMessage } from 'next';

interface ShopVerificationNotificationProps {
  shop: Shop;
  status?: string;
}

class ShopVerificationNotification extends Notification {
  protected shop: Shop;
  protected status: string;

  constructor(props: ShopVerificationNotificationProps) {
    super();
    this.shop = props.shop;
    this.status = props.status || 'submitted';
  }

  async send(notifiable: any): Promise<void> {
    // Implement the logic to send notification
    // For example, send email, push notification, etc.
    console.log('Sending notification via database');
  }

  toMail(notifiable: any): MailMessage {
    return new MailMessage()
      .line('The introduction to the notification.')
      .action('Notification Action', '/')
      .line('Thank you for using our application!');
  }

  toArray(notifiable: any): Record<string, any> {
    return {
      name: this.shop.name,
      id: this.shop.id,
      status: this.status,
    };
  }
}

export default ShopVerificationNotification;

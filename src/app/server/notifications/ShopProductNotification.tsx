// components/notifications/ShopProductNotification.ts

import { Notification } from 'next';
import { Product } from '../types'; // Assuming you have a Product type defined
import { MailMessage } from 'next';

interface ShopProductNotificationProps {
  type: string;
  product: Product;
  status?: string;
}

class ShopProductNotification extends Notification {
  protected type: string;
  protected product: Product;
  protected status: string;

  constructor(props: ShopProductNotificationProps) {
    super();
    this.type = props.type;
    this.product = props.product;
    this.status = props.status || 'pending';
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
      id: this.product.id,
      name: this.product.name,
      status: this.status,
      type: this.type,
    };
  }
}

export default ShopProductNotification;

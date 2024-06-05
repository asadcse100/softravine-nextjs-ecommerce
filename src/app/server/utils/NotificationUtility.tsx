import axios from 'axios';

interface Order {
    id: number;
    code: string;
    user: {
        id: number;
        email: string | null;
        device_token: string | null;
    };
    seller_id: number;
    orderDetails: {
        first(): {
            product: {
                user: {
                    email: string | null;
                };
            };
        };
    };
}

interface Request {
    device_token: string;
    title: string;
    text: string;
    type: string;
    id: number;
    user_id: number;
}

class NotificationUtility {
    public static async sendOrderPlacedNotification(order: Order, request: Request | null): Promise<void> {
        // Send email to customer with the invoice pdf attached
        const array = {
            view: 'emails.invoice',
            subject: `A new order has been placed - ${order.code}`,
            from: process.env.MAIL_FROM_ADDRESS,
            order
        };

        try {
            if (order.user.email)
                await axios.post('/api/sendEmail', { to: order.user.email, ...array });
            
            if (order.orderDetails.first().product.user.email)
                await axios.post('/api/sendEmail', { to: order.orderDetails.first().product.user.email, ...array });
        } catch (error) {
            console.error(error);
        }

        // Send SMS if OTP system is activated
        if (process.env.OTP_SYSTEM === '1') {
            try {
                await axios.post('/api/sendOTP', { order });
            } catch (error) {
                console.error(error);
            }
        }

        // Send notifications to user
        this.sendNotification(order, 'placed');

        // Send Firebase notification if enabled
        if (request && process.env.GOOGLE_FIREBASE === '1' && order.user.device_token) {
            request.device_token = order.user.device_token;
            request.title = 'Order placed!';
            request.text = `An order ${order.code} has been placed`;
            request.type = 'order';
            request.id = order.id;
            request.user_id = order.user.id;

            await this.sendFirebaseNotification(request);
        }
    }

    private static async sendNotification(order: Order, order_status: string): Promise<void> {
        let users: { id: number }[];

        if (order.seller_id === 1) {
            users = [{ id: order.user.id }, { id: order.seller_id }];
        } else {
            users = [{ id: order.user.id }, { id: order.seller_id }, { id: 1 }];
        }

        const order_notification = {
            order_id: order.id,
            order_code: order.code,
            user_id: order.user.id,
            seller_id: order.seller_id,
            status: order_status
        };

        try {
            await axios.post('/api/sendNotification', { users, order_notification });
        } catch (error) {
            console.error(error);
        }
    }

    private static async sendFirebaseNotification(req: Request): Promise<void> {
        const url = 'https://fcm.googleapis.com/fcm/send';

        const data = {
            to: req.device_token,
            notification: {
                body: req.text,
                title: req.title,
                sound: 'default'
            },
            data: {
                item_type: req.type,
                item_type_id: req.id,
                click_action: 'FLUTTER_NOTIFICATION_CLICK'
            }
        };

        const headers = {
            'Authorization': `key=${process.env.FCM_SERVER_KEY}`,
            'Content-Type': 'application/json'
        };

        try {
            await axios.post(url, data, { headers });
            const firebase_notification = {
                title: req.title,
                text: req.text,
                item_type: req.type,
                item_type_id: req.id,
                receiver_id: req.user_id
            };
            await axios.post('/api/saveFirebaseNotification', firebase_notification);
        } catch (error) {
            console.error(error);
        }
    }
}

export default NotificationUtility;

import { Notification } from 'next';
import { OrderNotificationType } from '../../../admin/types/types'; // assuming you have defined types

interface OrderNotificationProps {
    order_notification: OrderNotificationType;
}

const OrderNotification: React.FC<OrderNotificationProps> = ({ order_notification }) => {
    return (
        <div>
            <p>Order ID: {order_notification.order_id}</p>
            <p>Order Code: {order_notification.order_code}</p>
            <p>User ID: {order_notification.user_id}</p>
            <p>Seller ID: {order_notification.seller_id}</p>
            <p>Status: {order_notification.status}</p>
        </div>
    );
};

export default OrderNotification;

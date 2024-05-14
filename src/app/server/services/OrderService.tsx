import { NextApiRequest } from 'next';
import Order from '../models/Order';
import ProductStock from '../models/ProductStock';
import SmsTemplate from '../models/SmsTemplate';
import User from '../models/User';
import NotificationUtility from '../utility/NotificationUtility';
import SmsUtility from '../utility/SmsUtility';
import AffiliateController from '../controllers/AffiliateController';
import DeliveryBoyController from '../controllers/DeliveryBoyController';

class OrderService {
  public async handleDeliveryStatus(req: NextApiRequest): Promise<void> {
    const { order_id, status } = req.body;

    const order = await Order.findOneOrFail(order_id);
    order.delivery_viewed = '0';
    order.delivery_status = status;
    await order.save();

    if (status === 'cancelled' && order.payment_type === 'wallet') {
      const user = await User.findOne(order.user_id);
      if (user) {
        user.balance += order.grand_total;
        await user.save();
      }
    }

    for (const orderDetail of order.orderDetails) {
      orderDetail.delivery_status = status;
      await orderDetail.save();

      if (status === 'cancelled') {
        await productRestock(orderDetail);
      }

      if (
        addonIsActivated('affiliate_system') &&
        (req.user?.user_type === 'admin' || req.user?.user_type === 'delivery_boy')
      ) {
        if (status === 'delivered' || status === 'cancelled') {
          const no_of_delivered = status === 'delivered' ? orderDetail.quantity : 0;
          const no_of_canceled = status === 'cancelled' ? orderDetail.quantity : 0;

          const referred_by_user = await User.findOne({
            where: { referral_code: orderDetail.product_referral_code },
          });

          if (referred_by_user) {
            const affiliateController = new AffiliateController();
            affiliateController.processAffiliateStats(
              referred_by_user.id,
              0,
              0,
              no_of_delivered,
              no_of_canceled
            );
          }
        }
      }
    }

    if (
      addonIsActivated('otp_system') &&
      (await SmsTemplate.findOne({ identifier: 'delivery_status_change', status: 1 }))
    ) {
      try {
        await SmsUtility.deliveryStatusChange(JSON.parse(order.shipping_address).phone, order);
      } catch (e) {}
    }

    // sends Notifications to user
    NotificationUtility.sendNotification(order, status);
  }

  public async handlePaymentStatus(req: NextApiRequest): Promise<number> {
    const { order_id, status } = req.body;

    const order = await Order.findOneOrFail(order_id);
    order.payment_status_viewed = '0';
    await order.save();

    if (req.user?.user_type === 'seller') {
      for (const orderDetail of order.orderDetails) {
        if (orderDetail.seller_id === req.user.id) {
          orderDetail.payment_status = status;
          await orderDetail.save();
        }
      }
    } else {
      for (const orderDetail of order.orderDetails) {
        orderDetail.payment_status = status;
        await orderDetail.save();
      }
    }

    let overallStatus = 'paid';
    for (const orderDetail of order.orderDetails) {
      if (orderDetail.payment_status !== 'paid') {
        overallStatus = 'unpaid';
        break;
      }
    }
    order.payment_status = overallStatus;
    await order.save();

    if (order.payment_status === 'paid' && order.commission_calculated === 0) {
      calculateCommissionAffilationClubPoint(order);
    }

    // sends Notifications to user
    NotificationUtility.sendNotification(order, status);

    if (
      addonIsActivated('otp_system') &&
      (await SmsTemplate.findOne({ identifier: 'payment_status_change', status: 1 }))
    ) {
      try {
        await SmsUtility.paymentStatusChange(JSON.parse(order.shipping_address).phone, order);
      } catch (e) {}
    }

    return 1;
  }
}

export default OrderService;

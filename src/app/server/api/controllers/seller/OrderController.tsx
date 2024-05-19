import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { Order, ProductStock, SmsTemplate, User } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { payment_status, delivery_status, search } = req.query;

      let orders = await prisma.order.findMany({
        orderBy: { id: 'desc' },
        where: { seller_id: parseInt(req.query.userId as string) },
        select: { id: true }
      });

      if (payment_status) {
        orders = await prisma.order.findMany({
          where: { AND: [{ id: { in: orders.map(order => order.id) } }, { payment_status: payment_status as string }] },
          select: { id: true }
        });
      }

      if (delivery_status) {
        orders = await prisma.order.findMany({
          where: { AND: [{ id: { in: orders.map(order => order.id) } }, { delivery_status: delivery_status as string }] },
          select: { id: true }
        });
      }

      if (search) {
        orders = await prisma.order.findMany({
          where: {
            AND: [
              { id: { in: orders.map(order => order.id) } },
              { code: { contains: search as string, mode: 'insensitive' } }
            ]
          },
          select: { id: true }
        });
      }

      const ordersWithViewed = await Promise.all(
        orders.map(async order => {
          await prisma.order.update({
            where: { id: order.id },
            data: { viewed: true }
          });
          return order;
        })
      );

      res.status(200).json({ orders: ordersWithViewed });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

export async function showOrder(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const orderId = parseInt(req.query.id as string);
      const order = await prisma.order.findFirst({ where: { id: orderId } });
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }
      const order_shipping_address = JSON.parse(order.shipping_address);
      const delivery_boys = await prisma.user.findMany({
        where: { city: order_shipping_address.city, user_type: 'delivery_boy' }
      });

      await prisma.order.update({
        where: { id: orderId },
        data: { viewed: true }
      });

      res.status(200).json({ order, delivery_boys });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

export async function updateDeliveryStatus(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { order_id, status } = req.body;
      const order = await prisma.order.update({
        where: { id: order_id },
        data: { delivery_viewed: '0', delivery_status: status }
      });

      if (status === 'cancelled' && order.payment_type === 'wallet') {
        const user = await prisma.user.findFirst({ where: { id: order.user_id } });
        if (user) {
          await prisma.user.update({
            where: { id: order.user_id },
            data: { balance: user.balance + order.grand_total }
          });
        }
      }

      const orderDetails = await prisma.orderDetail.findMany({
        where: { orderId: order_id, seller_id: parseInt(req.query.userId as string) }
      });

      await Promise.all(
        orderDetails.map(async orderDetail => {
          await prisma.orderDetail.update({
            where: { id: orderDetail.id },
            data: { delivery_status: status }
          });

          if (status === 'cancelled') {
            const variant = orderDetail.variation || '';
            const product_stock = await prisma.productStock.findFirst({
              where: { product_id: orderDetail.product_id, variant }
            });
            if (product_stock) {
              await prisma.productStock.update({
                where: { id: product_stock.id },
                data: { qty: product_stock.qty + orderDetail.quantity }
              });
            }
          }
        })
      );

      if (addon_is_activated('otp_system') && (await prisma.smsTemplate.findFirst({ where: { identifier: 'delivery_status_change', status: 1 } }))) {
        // Implement SmsUtility method
      }

      // Implement NotificationUtility method
      // Implement Firebase notification

      if (addon_is_activated('delivery_boy')) {
        // Implement DeliveryBoyController method
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

export async function updatePaymentStatus(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { order_id, status } = req.body;
      const order = await prisma.order.update({
        where: { id: order_id },
        data: { payment_status_viewed: '0' }
      });

      const orderDetails = await prisma.orderDetail.findMany({
        where: { orderId: order_id, seller_id: parseInt(req.query.userId as string) }
      });

      await Promise.all(
        orderDetails.map(async orderDetail => {
          await prisma.orderDetail.update({
            where: { id: orderDetail.id },
            data: { payment_status: status }
          });
        })
      );

      let payment_status = 'paid';
      for (const orderDetail of orderDetails) {
        if (orderDetail.payment_status !== 'paid') {
          payment_status = 'unpaid';
          break;
        }
      }

      await prisma.order.update({
        where: { id: order_id },
        data: { payment_status }
      });

      if (payment_status === 'paid' && order.commission_calculated === 0) {
        // Implement calculateCommissionAffilationClubPoint method
      }

      // Implement NotificationUtility method
      // Implement Firebase notification

      if (addon_is_activated('otp_system') && (await prisma.smsTemplate.findFirst({ where: { identifier: 'payment_status_change', status: 1 } }))) {
        // Implement SmsUtility method
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

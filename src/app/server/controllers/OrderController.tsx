import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  combined_order_id: number;
  user_id: number;
  guest_id: number;
  seller_id: number;
  pickup_point_id: number;
  carrier_id: number;
  shipping_address: string;
  additional_info: string;
  shipping_type: string;
  order_from: string;
  delivery_status: string;
  payment_type: string;
  manual_payment: number;
  manual_payment_data: string;
  payment_status: string;
  payment_details: string;
  grand_total: number;
  coupon_discount: number;
  code: string;
  tracking_code: string;
  date: number;
  viewed: number;
  delivery_viewed: number;
  payment_status_viewed: number;
  commission_calculated: number;
  created_at: string;
};
interface OrderFilters {
  search?: string;
  paymentStatus?: string;
  deliveryStatus?: string;
  date?: string;
  route: string;
  userType: string;
  userId: number;
}

export const getReOrderById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.orders.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return { success: false, error: "Record does not exist." };
    }

    return { success: true, data: existingCategory };
  } catch (error) {
    console.error("Error category:", error);
    return { success: false, error };
  }
};

export const getOrderById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.orders.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return { success: false, error: "Record does not exist." };
    }

    return { success: true, data: existingCategory };
  } catch (error) {
    console.error("Error category:", error);
    return { success: false, error };
  }
};

export async function getAllOrders(filters: OrderFilters, page: number, perPage: number) {
  let adminUserId: number | null = null;

  if (filters.route !== 'pick_up_point.index') {
    const adminUser = await prisma.users.findFirst({ where: { user_type: 'admin' } });
    adminUserId = adminUser ? adminUser.id : null;
  }

  let whereClause: any = {};

  if (filters.route === 'inhouse_orders.index' && filters.userType === 'admin') {
    whereClause.sellerId = adminUserId;
  } else if (filters.route === 'seller_orders.index' && filters.userType === 'seller') {
    whereClause.sellerId = { not: adminUserId };
  } else if (filters.route === 'pick_up_point.index' && filters.userType === 'staff') {
    whereClause.shippingType = 'pickup_point';
    const staff = await prisma.staff.findFirst({ where: { user_id: filters.userId } });
    if (staff) {
      whereClause.pickupPointId = staff.pickup_point_id;
    }
  } else if (filters.route === 'all_orders.index' && filters.userType === 'admin') {
    // No additional filter for admin viewing all orders
  } else {
    throw new Error('Unauthorized');
  }

  if (filters.search) {
    whereClause.code = { contains: filters.search };
  }

  if (filters.paymentStatus) {
    whereClause.paymentStatus = filters.paymentStatus;
  }

  if (filters.deliveryStatus) {
    whereClause.deliveryStatus = filters.deliveryStatus;
  }

  if (filters.date) {
    const [start, end] = filters.date.split(' to ');
    whereClause.createdAt = {
      gte: new Date(start),
      lte: new Date(new Date(end).setHours(23, 59, 59)),
    };
  }

  const orders = await prisma.orders.findMany({
    where: whereClause,
    orderBy: { id: 'desc' },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  return orders;
}


export async function showOrder(data: createOrUpdateData) {
  // const { id } = req.query;
  const id = data.id;

  try {
    const order = await prisma.orders.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!order) {
      return { success: false };
      // return res.status(404).json({ error: 'Order not found' });
    }

    const orderShippingAddress = JSON.parse(order.shippingAddress);

    const deliveryBoys = await prisma.users.findMany({
      where: {
        city: orderShippingAddress.city,
        userType: 'delivery_boy',
      },
    });

    // Assuming you have logic to mark the order as viewed
    await prisma.orders.update({
      where: {
        id: parseInt(id),
      },
      data: {
        viewed: true,
      },
    });

    return { success: true, data: deliveryBoys };
    // return res.status(200).json({ order, deliveryBoys });
  } catch (error) {
    return { success: false, error };
    // console.error(error);
    // return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function createOrUpdateOrder(data: createOrUpdateData) {
  // const userId = req.body.userId; // Assuming you're sending the user ID with the request body
  const userId = data.user_id;
  try {
    // Fetch carts for the user
    const carts = await prisma.carts.findMany({
      where: {
        userId: userId,
      },
    });

    if (carts.length === 0) {
      // return res.status(400).json({ error: 'Your cart is empty' });
    }

    // Fetch address details from the first cart item
    const address = await prisma.addresses.findUnique({
      where: {
        id: carts[0].addressId,
      },
    });

    if (!address) {
      // return res.status(400).json({ error: 'Address not found' });
      return { success: false };
    }

    // Process shipping address
    const shippingAddress = {
      name: address.name,
      email: address.email,
      address: address.address,
      country: address.country.name,
      state: address.state.name,
      city: address.city.name,
      postal_code: address.postal_code,
      phone: address.phone,
      lat_lang: address.latitude ? `${address.latitude},${address.longitude}` : null,
    };

    // Create CombinedOrder
    const combinedOrder = await prisma.combinedOrder.create({
      data: {
        userId: userId,
        shippingAddress: JSON.stringify(shippingAddress),
      },
    });

    // Process each cart item
    for (const cart of carts) {
      const product = await prisma.product.findUnique({
        where: {
          id: cart.productId,
        },
      });

      // Process order details
      // ...

      // Update product stock
      // ...

      // Create OrderDetail
      // ...
    }

    // Send notifications
    // ...

    // return res.status(200).json({ success: true, combinedOrder });
    return { success: true, data: combinedOrder };
  } catch (error) {
    return { success: false, error };
    // console.error(error);
    // return res.status(500).json({ error: 'Internal server error' });
  }
}


export async function deleteOrder(data: createOrUpdateData) {
  // const orderId = req.query.id as string; // Assuming you're getting the order ID from the query parameters
  const orderId = data.id;
  try {
    // Find the order
    const order = await prisma.orders.findUnique({
      where: {
        id: parseInt(orderId),
      },
      include: {
        orderDetails: true, // Include related orderDetails
      },
    });

    if (!order) {
      // return res.status(404).json({ error: 'Order not found' });
      return { success: false };
    }

    // Iterate over order details and update product stock
    for (const orderDetail of order.order_details) {
      try {
        const productStock = await prisma.product_stocks.findFirst({
          where: {
            productId: orderDetail.productId,
            variant: orderDetail.variation,
          },
        });

        if (productStock) {
          // Update product stock quantity
          await prisma.product_stocks.update({
            where: {
              id: productStock.id,
            },
            data: {
              qty: productStock.qty + orderDetail.quantity,
            },
          });
        }
      } catch (error) {
        console.error(error);
      }

      // Delete order detail
      await prisma.order_details.delete({
        where: {
          id: orderDetail.id,
        },
      });
    }

    // Delete the order
    const deleteOrder = await prisma.orders.delete({
      where: {
        id: parseInt(orderId),
      },
    });

    return { success: true, data: deleteOrder };
    // return res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    return { success: false, error };
    // console.error(error);
    // return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function bulkDeleteOrders(data: createOrUpdateData) {
  // const orderIds = req.body.ids as number[]; // Assuming you're sending the order IDs in the request body
  const orderIds = data.id;
  try {
    // Iterate over each order ID and delete the order
    for (const orderId of orderIds) {
      const result = await deleteOrderById(orderId); // Call the deleteOrder function for each order ID
    }

    return { success: true, data: result };
    // return res.status(200).json({ success: true, message: 'Bulk orders deleted successfully' });
  } catch (error) {
    return { success: false, error };
    // console.error(error);
    // return res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to delete a single order by ID
async function deleteOrderById(orderId: number) {
  // Implement your logic here to delete a single order by ID
  // You can either call your existing deleteOrder function or implement the deletion logic directly
}

export async function getOrderDetails(data: createOrUpdateData) {
  const orderId = parseInt(req.query.order_id as string); // Assuming you're getting the order ID from the query parameters

  try {
    // Find the order details
    const order = await prisma.orders.findUnique({
      where: {
        id: orderId,
      },
      include: {
        order_details: true, // Include related orderDetails
      },
    });

    if (!order) {
      // return res.status(404).json({ error: 'Order not found' });
      return { success: false };
    }

    // Update the order (if needed)
    // ...

    return res.status(200).json({ order });
  } catch (error) {
    return { success: false, error };
    // console.error(error);
    // return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateDeliveryStatus(data: createOrUpdateData) {
  const orderId = parseInt(req.body.order_id); // Assuming you're getting the order ID from the request body
  const status = req.body.status; // Assuming you're getting the new status from the request body

  try {
    // Find the order
    const order = await prisma.orders.findUnique({
      where: {
        id: orderId,
      },
      include: {
        order_details: true, // Include related orderDetails
        users: true, // Include related user
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the delivery status of the order
    order.delivery_status = status;
    await prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        delivery_status: status,
      },
    });

    // Handle cancellation refund to wallet
    if (status === 'cancelled' && order.payment_type === 'wallet') {
      const user = await prisma.users.findUnique({
        where: {
          id: order.userId,
        },
      });

      if (user) {
        user.balance += orders.grand_total;
        await prisma.users.update({
          where: {
            id: order.user_id,
          },
          data: {
            balance: user.balance,
          },
        });
      }
    }

    // Update delivery status for order details
    for (const orderDetail of order.order_details) {
      orderDetail.delivery_status = status;
      await prisma.order_details.update({
        where: {
          id: orderDetail.id,
        },
        data: {
          delivery_status: status,
        },
      });

      // Handle stock update for cancelled orders
      if (status === 'cancelled') {
        // Implement logic to update product stock
        // ...
      }

      // Handle affiliate system
      if (status === 'delivered' || status === 'cancelled') {
        // Implement logic for affiliate system
        // ...
      }
    }

    // Handle sending notifications
    // ...

    // Handle delivery boy history
    // ...

    return res.status(200).json({ success: true, message: 'Delivery status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateTrackingCode(data: createOrUpdateData) {
  const orderId = parseInt(req.body.order_id); // Assuming you're getting the order ID from the request body
  const trackingCode = req.body.tracking_code; // Assuming you're getting the tracking code from the request body

  try {
    // Find the order
    const order = await prisma.orders.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the tracking code of the order
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        trackingCode: trackingCode,
      },
    });

    return res.status(200).json({ success: true, message: 'Tracking code updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


export async function updatePaymentStatus(data: createOrUpdateData) {
  const orderId = parseInt(req.body.order_id); // Assuming you're getting the order ID from the request body
  const status = req.body.status; // Assuming you're getting the new payment status from the request body

  try {
    // Find the order
    const order = await prisma.orders.findUnique({
      where: {
        id: orderId,
      },
      include: {
        order_details: true, // Include related orderDetails
        users: true, // Include related user
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the payment status of the order and order details
    for (const orderDetail of order.order_details) {
      orderDetail.payment_status = status;
      await prisma.order_details.update({
        where: {
          id: orderDetail.id,
        },
        data: {
          payment_status: status,
        },
      });
    }

    // Calculate overall payment status for the order
    let overallPaymentStatus = 'paid';
    for (const orderDetail of order.order_details) {
      if (orderDetail.payment_status !== 'paid') {
        overallPaymentStatus = 'unpaid';
        break;
      }
    }

    // Update overall payment status of the order
    await prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        payment_status: overallPaymentStatus,
        payment_status_viewed: '0', // Assuming you also update paymentStatusViewed
      },
    });

    // Handle commission, affiliation, club point calculation (if needed)
    // ...

    // Handle sending notifications
    // ...

    // Handle sending Firebase notifications
    // ...

    // Handle SMS notifications (if needed)
    // ...

    return res.status(200).json({ success: true, message: 'Payment status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


export async function assignDeliveryBoy(data: createOrUpdateData) {
  if (process.env.DELIVERY_BOY_ACTIVATED === 'true') {
    const orderId = parseInt(req.body.order_id); // Assuming you're getting the order ID from the request body
    const deliveryBoyId = parseInt(req.body.delivery_boy); // Assuming you're getting the delivery boy ID from the request body

    try {
      // Find the order
      const order = await prisma.orders.findUnique({
        where: {
          id: orderId,
        },
        include: {
          delivery_boy: true, // Include related delivery boy
        },
      });

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      // Update the assigned delivery boy and delivery history
      await prisma.orders.update({
        where: {
          id: orderId,
        },
        data: {
          assignDeliveryBoy: deliveryBoyId,
          deliveryHistoryDate: new Date(), // Assuming you also update delivery history date
        },
      });

      // Check if a delivery history exists for the order and delivery status
      let deliveryHistory = await prisma.delivery_histories.findFirst({
        where: {
          order_id: orderId,
          delivery_status: order.delivery_status,
        },
      });

      if (!deliveryHistory) {
        // If no delivery history exists, create a new one
        deliveryHistory = await prisma.delivery_histories.create({
          data: {
            order_id: orderId,
            delivery_status: order.delivery_status,
            payment_type: order.payment_type,
            delivery_boy_id: deliveryBoyId,
          },
        });
      } else {
        // If a delivery history already exists, update the delivery boy ID
        await prisma.delivery_histories.update({
          where: {
            id: deliveryHistory.id,
          },
          data: {
            delivery_boy_id: deliveryBoyId,
          },
        });
      }

      // Send email notification to the assigned delivery boy (if enabled)
      if (process.env.MAIL_USERNAME && process.env.DELIVERY_BOY_MAIL_NOTIFICATION === '1') {
        // Implement email sending logic
        // ...
      }

      // Send SMS notification to the assigned delivery boy (if OTP system is activated)
      if (process.env.OTP_SYSTEM_ACTIVATED === 'true' && process.env.SMS_TEMPLATE_IDENTIFIER === 'assign_delivery_boy' && process.env.SMS_TEMPLATE_STATUS === '1') {
        // Implement SMS sending logic
        // ...
      }

      return res.status(200).json({ success: true, message: 'Delivery boy assigned successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(400).json({ error: 'Delivery boy addon is not activated' });
  }
}
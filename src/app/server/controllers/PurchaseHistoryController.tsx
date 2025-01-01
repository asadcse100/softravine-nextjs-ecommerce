import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    type: string;
    value: string;
};

// export const getPurchaseHistory = async (userId: number) => {
//     try {
//         const orders = await prisma.orders.findMany({
//             where: { user_id: userId },
//             include: { order_details: true },
//             orderBy: { code: 'desc' }
//         });

//         return orders;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Error fetching purchase history');
//     }
// };

export const getPurchaseHistoryById = async (id: number) => {
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

export const getPurchaseHistories = async () => {
    try {
        const purchaseHistories = await prisma.orders.findMany();
        // Convert BigInt fields to strings
        const serializedPurchaseHistories = purchaseHistories.map(purchaseHistorie => ({
            ...purchaseHistorie,
            id: purchaseHistorie.id.toString(), // Assuming id is the BigInt field
            user_id: purchaseHistorie.user_id.toString(), // Assuming id is the BigInt field
        }));
        return { success: true, data: serializedPurchaseHistories };
    } catch (error) {
        console.error("Error fetching Purchase Histories:", error);
        return { success: false, error };
    }
}


export const getDigitalPurchaseHistory = async (userId: number, page: number) => {
    try {
        const orders = await prisma.orders.findMany({
            orderBy: { code: 'desc' },
            select: {
                id: true,
                order_details: {
                    where: { payment_status: 'paid' },
                    select: { id: true },
                    include: {
                        products: { select: { digital: true } }
                    }
                }
            },
            where: {
                user_id: userId,
                order_details: {
                    some: {
                        products: { digital: 1 }
                    }
                }
            },
        });

        return orders;
    } catch (error) {
        return { success: false, error };
        // console.error(error);
        // throw new Error('Error fetching digital purchase history');
    }
};

export const getOrderDetails = async (orderId: number) => {
    try {
        const order = await prisma.orders.findUnique({
            where: { id: orderId },
            include: { order_details: true }
        });

        if (!order) {
            throw new Error('Order not found');
        }

        // Mark delivery and payment status as viewed
        await prisma.orders.update({
            where: { id: orderId },
            data: { delivery_viewed: true, payment_status_viewed: true }
        });
        return { success: true, data: order };
        // return order;
    } catch (error) {
        return { success: false, error };
        // console.error(error);
        // throw new Error('Error fetching order details');
    }
};

export const downloadProduct = async (data: createOrUpdateData) => {
    try {
        const productId = Number(data.id);
        const userId = Number(data.headers.userid); // Assuming you're passing user ID in headers

        // Check if the user has purchased the product
        const orders = await prisma.orders.findMany({
            where: { user_id: userId },
            include: { order_details: { where: { product_id: productId, payment_status: 'paid' } } }
        });

        if (orders.length === 0) {
            return { success: false };
            // return res.status(403).json({ success: false, message: 'You cannot download this product.' });
        }

        // Fetch the product upload details
        const product = await prisma.products.findUnique({
            where: { id: productId },
            select: { file_name: true }
        });

        if (!product) {
            return { success: false };
            // return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Retrieve the upload details from database
        const upload = await prisma.uploads.findUnique({ where: { id: product.file_name } });

        if (!upload) {
            return { success: false };
            // return res.status(404).json({ success: false, message: 'File not found' });
        }

        // Download the file
        if (process.env.FILESYSTEM_DRIVER === 's3') {
            // Assuming you're using AWS S3 for file storage
            const { file_name, file_original_name, extension } = upload;
            const fileKey = `${file_name}.${extension}`;
            const s3 = new AWS.S3();
            const s3Params = {
                Bucket: 'your-bucket-name',
                Key: fileKey
            };
            const fileStream = s3.getObject(s3Params).createReadStream();
            res.setHeader('Content-Disposition', `attachment; filename=${file_original_name}.${extension}`);
            fileStream.pipe(res);
        } else {
            // Assuming the file is stored locally
            const filePath = `public/${upload.file_name}`;
            res.setHeader('Content-Disposition', `attachment; filename=${upload.file_original_name}.${upload.extension}`);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.sendFile(filePath);
        }
    } catch (error) {
        return { success: false, error };
        // console.error(error);
        // return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


export const cancelOrder = async (orderId: number, userId: number) => {
    try {
        const order = await prisma.orders.findFirst({
            where: { id: orderId, user_id: userId, delivery_status: 'pending', payment_status: 'unpaid' },
            include: { order_details: true }
        });

        if (!order) {
            throw new Error('Order not found or cannot be canceled');
        }

        // Update delivery status of the order and its details
        await prisma.orders.update({
            where: { id: orderId },
            data: { delivery_status: 'cancelled' },
            include: { order_details: true }
        });

        // Update delivery status of order details and restock products
        for (const orderDetail of order.order_details) {
            await prisma.order_details.update({
                where: { id: orderDetail.id },
                data: { delivery_status: 'cancelled' }
            });
            await productRestock(orderDetail);
        }

        return true;
    } catch (error) {
        console.error(error);
        throw new Error('Error canceling order');
    }
};

const productRestock = async (orderDetail) => {
    // Implement your logic to restock products here
};

export const reOrder = async (orderId: number, userId: number) => {
    try {
        const order = await prisma.orders.findFirst({
            where: { id: orderId, user_id: userId },
            include: { order_details: { include: { products: true } } }
        });

        if (!order) {
            throw new Error('Order not found');
        }

        const cartItems = [];
        const successMsgs = [];
        const failedMsgs = [];

        for (const orderDetail of order.order_details) {
            const product = orderDetail.products;

            // Check if product is available and conditions are met for reordering
            if (!product || !product.published || !product.approved || (product.wholesale_product && !addonIsActivated("wholesale"))) {
                failedMsgs.push('An item from this order is not available now.');
                continue;
            }

            if (product.auction_product) {
                failedMsgs.push('You cannot reorder an auction product.');
                break;
            }

            // Determine the order quantity and other details
            let orderQty = orderDetail.quantity;
            if (!product.digital && orderQty < product.min_qty) {
                orderQty = product.min_qty;
            }

            // Fetch product stock
            const productStock = await prisma.product_stocks.findFirst({
                where: { product_id: product.id, variant: orderDetail.variation }
            });

            if (!productStock || productStock.qty <= 0) {
                failedMsgs.push(`${product.name} is out of stock.`);
                continue;
            }

            // Calculate price and tax
            let quantity = 1;
            if (!product.digital) {
                quantity = productStock.qty;
                if (quantity > 0) {
                    if (cartItems.find(cartItem => cartItem.product_id === product.id)) {
                        orderQty += cartItems.find(cartItem => cartItem.product_id === product.id).quantity;
                    }
                    quantity = quantity >= orderQty ? orderQty : quantity;
                } else {
                    failedMsgs.push(`${product.name} is out of stock.`);
                    continue;
                }
            }
            const price = getPrice(product, productStock, quantity);
            const tax = taxCalculation(product, price);

            // Save cart item
            cartItems.push({
                user_id: userId,
                product_id: product.id,
                variation: orderDetail.variation,
                price,
                tax,
                quantity
            });
            successMsgs.push(`${product.name} added to cart.`);
        }

        return { successMsgs, failedMsgs };
    } catch (error) {
        console.error(error);
        throw new Error('Error reordering');
    }
};

// Implement the following helper functions as needed
const addonIsActivated = (addonName) => {
    // Implement logic to check if the addon is activated
};

const getPrice = (product, productStock, quantity) => {
    // Implement logic to calculate price
};

const taxCalculation = (product, price) => {
    // Implement tax calculation logic
};
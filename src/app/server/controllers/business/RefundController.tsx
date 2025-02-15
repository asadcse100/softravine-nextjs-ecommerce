import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    type: string;
    value: string;
};

export const getRefundRequest = async () => {
    try {
        const refund_requests = await prisma.refund_requests.findMany();
        // Convert BigInt fields to strings
        const serializedRefund_requests = refund_requests.map(refund_request => ({
            ...refund_request,
            user_id: refund_request.user_id.toString(), // Assuming id is the BigInt field
            order_id: refund_request.order_id.toString(), // Assuming id is the BigInt field
            order_detail_id: refund_request.order_detail_id.toString(), // Assuming id is the BigInt field
        }));
        return { success: true, data: serializedRefund_requests };
    } catch (error) {
        // console.error("Error fetching Refund Request:", error);
        return { success: false, error };
    }
}

export const customerSentRefundRequest = async () => {
    try {
        const refund_requests = await prisma.refund_requests.findMany();
        // Convert BigInt fields to strings
        const serializedRefund_requests = refund_requests.map(refund_request => ({
            ...refund_request,
            user_id: refund_request.user_id.toString(), // Assuming id is the BigInt field
            order_id: refund_request.order_id.toString(), // Assuming id is the BigInt field
            order_detail_id: refund_request.order_detail_id.toString(), // Assuming id is the BigInt field
        }));
        return { success: true, data: serializedRefund_requests };
    } catch (error) {
        // console.error("Error fetching Refund Request:", error);
        return { success: false, error };
    }
}

export const customerSentRefundRequestTest = async () => {
    try {
        const refund_requests = await prisma.refund_requests.findMany();
        // Convert BigInt fields to strings
        const serializedRefund_requests = refund_requests.map(refund_request => ({
            ...refund_request,
            user_id: refund_request.user_id.toString(), // Assuming id is the BigInt field
            order_id: refund_request.order_id.toString(), // Assuming id is the BigInt field
            order_detail_id: refund_request.order_detail_id.toString(), // Assuming id is the BigInt field
        }));
        return { success: true, data: serializedRefund_requests };
    } catch (error) {
        // console.error("Error fetching Refund Request:", error);
        return { success: false, error };
    }
}

export const getRefundApproved = async () => {
    try {
        const refund_approved = await prisma.refund_requests.findMany();
        // Convert BigInt fields to strings
        const serializedRefund_approved = refund_approved.map(refund_approved => ({
            ...refund_approved,
            user_id: refund_approved.user_id.toString(), // Assuming id is the BigInt field
            order_id: refund_approved.order_id.toString(), // Assuming id is the BigInt field
            order_detail_id: refund_approved.order_detail_id.toString(), // Assuming id is the BigInt field
        }));
        return { success: true, data: serializedRefund_approved };
    } catch (error) {
        // console.error("Error fetching Refund Approved:", error);
        return { success: false, error };
    }
}

export const getRejectedRefund = async () => {
    try {
        const rejectedRefund = await prisma.refund_requests.findMany();
        // Convert BigInt fields to strings
        const serializedRejectedRefund = rejectedRefund.map(rejectedRefund => ({
            ...rejectedRefund,
            user_id: rejectedRefund.user_id.toString(), // Assuming id is the BigInt field
            order_id: rejectedRefund.order_id.toString(), // Assuming id is the BigInt field
            order_detail_id: rejectedRefund.order_detail_id.toString(), // Assuming id is the BigInt field
        }));
        return { success: true, data: serializedRejectedRefund };
    } catch (error) {
        // console.error("Error fetching texes:", error);
        return { success: false, error };
    }
}

export const requestStore = async (data: createOrUpdateData) => {
    try {
        const { id } = req.query;
        const orderDetail = await prisma.order_details.findFirst({
            where: { id: Number(id) },
            include: { orders: true }
        });

        if (!orderDetail) {
            throw new Error('Order detail not found');
        }

        const refund = await prisma.refund_requests.create({
            data: {
                user_id: orderDetail.order.user_id,
                order_id: orderDetail.order_id,
                order_detail_id: orderDetail.id,
                seller_id: orderDetail.seller_id,
                seller_approval: false,
                reason: req.body.reason,
                admin_approval: false,
                admin_seen: false,
                refund_amount: orderDetail.price + orderDetail.tax,
                refund_status: false
            }
        });

        if (refund) {
            return { success: true, data: refund };
            // return res.status(200).json({ success: true, message: 'Refund request sent successfully' });
        } else {
            return { success: false };
            // return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    } catch (error) {
        // console.error(er
        //     return { success: false, error };ror);
        // return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const vendorIndex = async (data: createOrUpdateData) => {
    try {
        const refunds = await prisma.refund_requests.findMany({
            where: { seller_id: Number(req.query.seller_id) },
            orderBy: { createdAt: 'desc' }
        });

        return res.status(200).json({ refunds });
    } catch (error) {
        return { success: false, error };
        // console.error(error);
        // return res.status(500).json({ message: 'Internal server error' });
    }
};

export const customerIndex = async (data: createOrUpdateData) => {
    try {
        const refunds = await prisma.refund_requests.findMany({
            where: { user_id: Number(req.query.user_id) },
            orderBy: { createdAt: 'desc' }
        });
        return { success: true, data: refunds };
        // return res.status(200).json({ refunds });
    } catch (error) {
        return { success: false, error };
        // console.error(error);
        // return res.status(500).json({ message: 'Internal server error' });
    }
};


export const refundTimeUpdate = async (data: createOrUpdateData) => {
    try {
        const { type, value } = req.body;

        let businessSetting = await prisma.business_settings.findUnique({ where: { type } });
        if (businessSetting) {
            await prisma.business_settings.update({
                where: { type },
                data: { value },
            });
        } else {
            await prisma.business_settings.create({
                data: { type, value },
            });
        }

        // Clear cache
        // You may need to adjust this line depending on how caching is handled in your Next.js app
        // For example, if you're using a different caching mechanism or library
        // This line might need to be updated accordingly
        // You can also omit this line if you're not using any caching mechanism
        // Or if cache clearing is handled differently in your application
        // If you're using Next.js's built-in caching, this line should work fine
        await prisma.$queryRaw`SELECT pg_notify('cache_clear', '');`;
        return { success: true };
        // return res.status(200).json({ message: 'Refund request sending time has been updated successfully' });
    } catch (error) {
        return { success: false, error };
        // console.error(error);
        // return res.status(500).json({ message: 'Internal server error' });
    }
};


export const refundStickerUpdate = async (data: createOrUpdateData) => {
    try {
        const { type, logo } = req.body;

        let businessSetting = await prisma.business_settings.findUnique({ where: { type } });
        if (businessSetting) {
            await prisma.business_settings.update({
                where: { type },
                data: { value: logo },
            });
        } else {
            await prisma.business_settings.create({
                data: { type, value: logo },
            });
        }

        // Clear cache
        // You may need to adjust this line depending on how caching is handled in your Next.js app
        // For example, if you're using a different caching mechanism or library
        // This line might need to be updated accordingly
        // You can also omit this line if you're not using any caching mechanism
        // Or if cache clearing is handled differently in your application
        // If you're using Next.js's built-in caching, this line should work fine
        await prisma.$queryRaw`SELECT pg_notify('cache_clear', '');`;
        return { success: true };
        // return res.status(200).json({ message: 'Refund sticker has been updated successfully' });
    } catch (error) {
        return { success: false, error };
        // console.error(error);
        // return res.status(500).json({ message: 'Internal server error' });
    }
};

export const adminIndex = async (data: createOrUpdateData) => {
    try {
        const refunds = await prisma.refund_requests.findMany({
            where: { refund_status: 0 },
            orderBy: { created_at: 'desc' },
        });
        return { success: true, data: refunds };
        // return res.status(200).json(refunds);
    } catch (error) {
        return { success: false, error };
        // console.error(error);
        // return res.status(500).json({ message: 'Internal server error' });
    }
};

export const paidIndex = async (data: createOrUpdateData) => {
    try {
        const refunds = await prisma.refund_requests.findMany({
            where: { refund_status: 1 },
            orderBy: { created_at: 'desc' },
        });
        return { success: true, data: refunds };
        // return res.status(200).json(refunds);
    } catch (error) {
        return { success: false, error };
        // console.error(error);
        // return res.status(500).json({ message: 'Internal server error' });
    }
};


export const rejectedIndex = async (data: createOrUpdateData) => {
    try {
        const refunds = await prisma.refund_requests.findMany({
            where: { refund_status: 2 },
            orderBy: { created_at: 'desc' },
        });
        return { success: true, data: refunds };
        // return res.status(200).json(refunds);
    } catch (error) {
        return { success: false, error };
        // console.error(error);
        // return res.status(500).json({ message: 'Internal server error' });
    }
};


export const requestApprovalVendor = async (data: createOrUpdateData) => {
    try {
        const { el } = req.body;
        const refund = await prisma.refund_requests.update({
            where: { id: parseInt(el) },
            data: {
                seller_approval: 1,
                admin_approval: req.userType === 'admin' || req.userType === 'staff' ? 1 : undefined,
            },
        });
        return { success: true, data: refund };
        // return res.status(200).json(refund);
    } catch (error) {
        return { success: false, error };
        // console.error(error);
        // return res.status(500).json({ message: 'Internal server error' });
    }
};


export const refundPay = async (data: createOrUpdateData) => {
    try {
        const { el } = req.body;
        const refund = await prisma.refundRequest.update({
            where: { id: parseInt(el) },
            data: {
                seller_approval: 1,
                admin_approval: req.userType === 'admin' || req.userType === 'staff' ? 1 : undefined,
                refund_status: 1,
            },
            include: {
                user: true,
            },
        });
        if (refund.seller_approval === 1) {
            const seller = await prisma.shop.findFirst({ where: { user_id: refund.seller_id } });
            if (seller) {
                await prisma.shop.update({
                    where: { id: seller.id },
                    data: { admin_to_pay: { decrement: refund.refund_amount } },
                });
            }
            await prisma.wallet.create({
                data: {
                    user_id: refund.user_id,
                    amount: refund.refund_amount,
                    payment_method: 'Refund',
                    payment_details: 'Product Money Refund',
                },
            });
            await prisma.user.update({
                where: { id: refund.user_id },
                data: { balance: { increment: refund.refund_amount } },
            });
        }
        return { success: true };
        // return res.status(200).json({ message: 'Refund processed successfully' });
    } catch (error) {
        return { success: false, error };
        // console.error(error);
        // return res.status(500).json({ message: 'Internal server error' });
    }
};


export const rejectRefundRequest = async (data: createOrUpdateData) => {
    try {
        const { refund_id, reject_reason } = req.body;
        const refund = await prisma.refund_requests.update({
            where: { id: parseInt(refund_id) },
            data: {
                admin_approval: req.userType === 'admin' || req.userType === 'staff' ? 2 : undefined,
                seller_approval: req.userType !== 'admin' && req.userType !== 'staff' ? 2 : undefined,
                refund_status: 2,
                reject_reason,
            },
        });
        if (refund) {
            return { success: true, data: refund };
            // return res.status(200).json({ message: 'Refund request rejected successfully' });
        } else {
            return { success: false, error };
            // return res.status(400).json({ message: 'Failed to reject refund request' });
        }
    } catch (error) {
        return { success: false, error };
        // console.error(error);
        // return res.status(500).json({ message: 'Internal server error' });
    }
};
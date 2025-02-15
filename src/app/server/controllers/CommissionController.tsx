import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    type: string;
    value: string;
};

export async function payToSeller(data: createOrUpdateData) {

    if (data.payment_methods === 'cash' || data.payment_methods === 'bank_payment') {
        await sellerPaymentDone(data, null);
        // return res.status(200).json({ success: true, message: 'Seller payment done' });
        return { success: true };
    } else {
        try {
            const shop = await prisma.shops.findUnique({
                where: { id: parseInt(data.shop_id) },
            });

            if (!shop) {
                return { success: false, error: "Record does not exist." };
                // return res.status(404).json({ success: false, message: 'Shop not found' });
            }

            const updatedShop = await prisma.shops.update({
                where: { id: parseInt(data.shop_id) },
                data: { admin_to_pay: shop.admin_to_pay + parseFloat(data.amount) },
            });

            await prisma.payments.create({
                data: {
                    seller_id: updatedShop.user_id,
                    amount: parseFloat(data.amount),
                    payment_method: 'Seller paid to admin',
                    txnCode: data.txn_code ?? null,
                    paymentDetails: null,
                },
            });
            return { success: true, message: 'Payment completed'};
            // return res.status(200).json({ success: true, message: 'Payment completed' });
        } catch (error) {
            return { success: false};
            // return res.status(500).json({ success: false, message: error.message });
        }
    }

}

async function sellerPaymentDone(payment_data: any, payment_details: any) {
    try {
        const shop = await prisma.shops.findUnique({
            where: { id: parseInt(payment_data.shop_id) },
        });

        if (!shop) {
            throw new Error('Shop not found');
        }

        await prisma.shops.update({
            where: { id: parseInt(payment_data.shop_id) },
            data: { admin_to_pay: shop.admin_to_pay - parseFloat(payment_data.amount) },
        });

        await prisma.payments.create({
            data: {
                seller_id: shop.user_id,
                amount: parseFloat(payment_data.amount),
                paymentMethod: payment_data.payment_method,
                txnCode: payment_data.txn_code,
                paymentDetails: payment_details,
            },
        });

        if (payment_data.payment_withdraw === 'withdraw_request') {
            await prisma.seller_withdraw_requests.update({
                where: { id: parseInt(payment_data.withdraw_request_id) },
                data: {
                    status: '1',
                    viewed: '1',
                },
            });
        }

        // Handle notifications as needed

    } catch (error) {
        throw new Error(error.message);
    }
}

export async function calculateCommission(order: any) {
    if (order.payment_type === 'cash_on_delivery') {
        for (const orderDetail of order.orderDetails) {
            orderDetail.payment_status = 'paid';
            await prisma.order_details.update({
                where: { id: orderDetail.id },
                data: { payment_status: 'paid' },
            });

            let commission_percentage = 0;
            if (getSetting('vendor_commission_activation')) {
                if (getSetting('category_wise_commission')) {
                    commission_percentage = orderDetail.product.main_category.commision_rate;
                } else if (orderDetail.product.user.user_type === 'seller') {
                    commission_percentage = getSetting('vendor_commission');
                }
            }

            if (orderDetail.product.user.user_type === 'seller') {
                const seller = await prisma.shops.findUnique({
                    where: { user_id: orderDetail.product.user.id },
                });

                const admin_commission = (orderDetail.price * commission_percentage) / 100;

                let seller_earning;
                if (getSetting('product_manage_by_admin') === 1) {
                    seller_earning = (orderDetail.tax + orderDetail.price) - admin_commission;
                    seller.admin_to_pay += seller_earning;
                } else {
                    seller_earning = (orderDetail.tax + orderDetail.shipping_cost + orderDetail.price) - admin_commission;
                    seller.admin_to_pay -= admin_commission;
                }

                await prisma.shops.update({
                    where: { id: sellers.id },
                    data: { admin_to_pay: sellers.admin_to_pay },
                });

                await prisma.commission_histories.create({
                    data: {
                        order_id: order.id,
                        order_detail_id: orderDetail.id,
                        seller_id: orderDetail.seller_id,
                        admin_commission,
                        seller_earning,
                    },
                });
            }
        }
    } else {
        for (const orderDetail of order.orderDetails) {
            orderDetail.payment_status = 'paid';
            await prisma.order_details.update({
                where: { id: orderDetail.id },
                data: { payment_status: 'paid' },
            });

            let commission_percentage = 0;
            if (getSetting('vendor_commission_activation')) {
                if (getSetting('category_wise_commission')) {
                    commission_percentage = orderDetail.product.main_category.commision_rate;
                } else if (orderDetail.product.user.user_type === 'seller') {
                    commission_percentage = getSetting('vendor_commission');
                }
            }

            if (orderDetail.product.user.user_type === 'seller') {
                const seller = await prisma.shops.findUnique({
                    where: { user_id: orderDetail.products.user.id },
                });

                const admin_commission = (orderDetail.price * commission_percentage) / 100;

                let seller_earning;
                if (getSetting('product_manage_by_admin') === 1) {
                    seller_earning = (orderDetail.tax + orderDetail.price) - admin_commission;
                    sellers.admin_to_pay += seller_earning;
                } else {
                    seller_earning = (orderDetail.tax + orderDetail.shipping_cost + orderDetail.price) - admin_commission;
                    sellers.admin_to_pay += seller_earning;
                }

                await prisma.shops.update({
                    where: { id: sellers.id },
                    data: { admin_to_pay: sellers.admin_to_pay },
                });

                await prisma.commission_histories.create({
                    data: {
                        order_id: order.id,
                        order_detail_id: orderDetail.id,
                        seller_id: orderDetail.seller_id,
                        admin_commission,
                        seller_earning,
                    },
                });
            }
        }
        if (order.shop !== null) {
            const seller = await prisma.shops.findUnique({
                where: { user_id: order.shop.user.id },
            });
            seller.admin_to_pay -= order.coupon_discount;
            await prisma.shops.update({
                where: { id: seller.id },
                data: { admin_to_pay: seller.admin_to_pay },
            });
        }
    }
}
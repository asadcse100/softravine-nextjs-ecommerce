import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function payToSeller(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ success: false, message: 'Invalid request data' });
        }

        if (data.payment_method === 'cash' || data.payment_method === 'bank_payment') {
            await sellerPaymentDone(data, null);
            return res.status(200).json({ success: true, message: 'Seller payment done' });
        } else {
            try {
                const shop = await prisma.shop.findUnique({
                    where: { id: parseInt(data.shop_id) },
                });

                if (!shop) {
                    return res.status(404).json({ success: false, message: 'Shop not found' });
                }

                const updatedShop = await prisma.shop.update({
                    where: { id: parseInt(data.shop_id) },
                    data: { admin_to_pay: shop.admin_to_pay + parseFloat(data.amount) },
                });

                await prisma.payment.create({
                    data: {
                        sellerId: updatedShop.userId,
                        amount: parseFloat(data.amount),
                        paymentMethod: 'Seller paid to admin',
                        txnCode: data.txn_code ?? null,
                        paymentDetails: null,
                    },
                });

                return res.status(200).json({ success: true, message: 'Payment completed' });
            } catch (error) {
                return res.status(500).json({ success: false, message: error.message });
            }
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}

async function sellerPaymentDone(payment_data: any, payment_details: any) {
    try {
        const shop = await prisma.shop.findUnique({
            where: { id: parseInt(payment_data.shop_id) },
        });

        if (!shop) {
            throw new Error('Shop not found');
        }

        await prisma.shop.update({
            where: { id: parseInt(payment_data.shop_id) },
            data: { admin_to_pay: shop.admin_to_pay - parseFloat(payment_data.amount) },
        });

        await prisma.payment.create({
            data: {
                sellerId: shop.userId,
                amount: parseFloat(payment_data.amount),
                paymentMethod: payment_data.payment_method,
                txnCode: payment_data.txn_code,
                paymentDetails: payment_details,
            },
        });

        if (payment_data.payment_withdraw === 'withdraw_request') {
            await prisma.sellerWithdrawRequest.update({
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
            await prisma.orderDetail.update({
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
                const seller = await prisma.shop.findUnique({
                    where: { userId: orderDetail.product.user.id },
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

                await prisma.shop.update({
                    where: { id: seller.id },
                    data: { admin_to_pay: seller.admin_to_pay },
                });

                await prisma.commissionHistory.create({
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
            await prisma.orderDetail.update({
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
                const seller = await prisma.shop.findUnique({
                    where: { userId: orderDetail.product.user.id },
                });

                const admin_commission = (orderDetail.price * commission_percentage) / 100;

                let seller_earning;
                if (getSetting('product_manage_by_admin') === 1) {
                    seller_earning = (orderDetail.tax + orderDetail.price) - admin_commission;
                    seller.admin_to_pay += seller_earning;
                } else {
                    seller_earning = (orderDetail.tax + orderDetail.shipping_cost + orderDetail.price) - admin_commission;
                    seller.admin_to_pay += seller_earning;
                }

                await prisma.shop.update({
                    where: { id: seller.id },
                    data: { admin_to_pay: seller.admin_to_pay },
                });

                await prisma.commissionHistory.create({
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
            const seller = await prisma.shop.findUnique({
                where: { userId: order.shop.user.id },
            });
            seller.admin_to_pay -= order.coupon_discount;
            await prisma.shop.update({
                where: { id: seller.id },
                data: { admin_to_pay: seller.admin_to_pay },
            });
        }
    }
}
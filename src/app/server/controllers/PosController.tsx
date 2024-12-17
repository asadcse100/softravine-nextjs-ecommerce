import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    type: string;
    value: string;
};

export const index = async (data: createOrUpdateData) => {
    try {
        const customers = await prisma.users.findMany({
            where: {
                user_type: 'customer',
                email_verified_at: { not: null }
            },
            orderBy: { created_at: 'desc' }
        });

        const userType = req.headers.authorization ? 'admin' : 'seller';

        if (userType === 'admin' || user_type === 'staff') {
            res.render('pos/index', { customers });
        } else {
            const posActivationForSeller = true; // You need to replace this with your logic to determine POS activation for sellers
            if (posActivationForSeller) {
                res.render('pos/frontent/seller/pos/index', { customers });
            } else {
                throw new Error('POS is disabled for Sellers!!!');
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


export const search = async (data: createOrUpdateData) => {
    try {
        let productsQuery = prisma.product_stocks.findMany({
            include: {
                products: true,
            },
            orderBy: { 'products.created_at': 'desc' },
        });

        if (req.headers.authorization) {
            productsQuery = productsQuery.where({
                products: { added_by: 'admin' },
            });
        } else {
            productsQuery = productsQuery.where({
                user_id: parseInt(req.headers.user_id as string),
                published: true,
            });
        }

        if (req.query.category) {
            const [type, id] = (req.query.category as string).split('-');
            if (type === 'category') {
                const categoryIds = await CategoryUtility.getChildrenIds(parseInt(id));
                categoryIds.push(parseInt(id));
                productsQuery = productsQuery.where({
                    products: { category_id: { in: categoryIds } },
                });
            }
        }

        if (req.query.brand) {
            productsQuery = productsQuery.where({
                products: { brand_id: parseInt(req.query.brand as string) },
            });
        }

        if (req.query.keyword) {
            productsQuery = productsQuery.where({
                products: {
                    OR: [
                        { name: { contains: req.query.keyword as string } },
                        { barcode: req.query.keyword as string },
                    ],
                },
            });
        }

        const products = await productsQuery;

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const addToCart = async (data: createOrUpdateData) => {
    const { stockId } = req.body;
    const stock = await prisma.product_stocks.findUnique({
        where: { id: stockId },
        include: {
            products: {
                include: { taxes: true }
            }
        }
    });

    if (!stock) {
        return res.status(404).json({ success: 0, message: "Stock not found" });
    }

    const product = stock.products;

    const data: any = {
        stockId: stockId,
        id: product.id,
        variant: stock.variant,
        quantity: product.minQty,
    };

    if (stock.qty < product.minQty) {
        return res.status(400).json({ success: 0, message: `This product doesn't have enough stock for minimum purchase quantity ${product.minQty}` });
    }

    let price = stock.price;

    // Discount calculation
    let discountApplicable = !product.discountStartDate || (new Date() >= product.discountStartDate && new Date() <= product.discountEndDate);

    if (discountApplicable) {
        if (product.discountType === 'percent') {
            price -= (price * product.discount) / 100;
        } else if (product.discountType === 'amount') {
            price -= product.discount;
        }
    }

    // Tax calculation
    let tax = 0;
    product.taxes.forEach(productTax => {
        if (productTax.taxType === 'percent') {
            tax += (price * productTax.tax) / 100;
        } else if (productTax.taxType === 'amount') {
            tax += productTax.tax;
        }
    });

    data.price = price;
    data.tax = tax;

    let cart = req.session.cart || [];
    let foundInCart = false;

    cart = cart.map(cartItem => {
        if (cartItem.id === product.id && cartItem.stockId === stock.id) {
            foundInCart = true;
            if (stock.qty >= (cartItem.quantity + 1)) {
                cartItem.quantity += 1;
            } else {
                res.status(400).json({ success: 0, message: "This product doesn't have more stock." });
            }
        }
        return cartItem;
    });

    if (!foundInCart) {
        cart.push(data);
    }

    req.session.cart = cart;

    res.status(200).json({ success: 1, message: '', cart });
};


export const updateQuantity = async (data: createOrUpdateData) => {
    const { key, quantity } = req.body;

    let cart = req.session.cart || [];

    cart = cart.map((item, index) => {
        if (index === key) {
            return {
                ...item,
                quantity,
            };
        }
        return item;
    });

    const product = await prisma.products.findUnique({
        where: { id: cart[key].id },
        include: { stocks: true }
    });

    if (!product) {
        return res.status(404).json({ success: 0, message: 'Product not found' });
    }

    const productStock = product.stocks.find(stock => stock.id === cart[key].stockId);

    if (!productStock) {
        return res.status(404).json({ success: 0, message: 'Stock not found' });
    }

    if (productStock.qty >= quantity) {
        cart[key].quantity = quantity;
    } else {
        return res.status(400).json({ success: 0, message: "This product doesn't have more stock." });
    }

    req.session.cart = cart;

    res.status(200).json({ success: 1, message: '', cart });
};


export const removeFromCart = async (data: createOrUpdateData) => {
    const { key } = req.body;

    if (req.session.cart) {
        let cart = req.session.cart;

        if (cart[key]) {
            cart.splice(key, 1); // Remove item at the specified key
        }

        req.session.cart = cart;
    }

    res.status(200).json({ success: 1, message: '', cart: req.session.cart });
};


export const setShippingAddress = async (data: createOrUpdateData) => {
    const { address_id, name, email, address, country_id, state_id, city_id, postal_code, phone } = req.body;
    let data: any = {};

    if (address_id) {
        const addressRecord = await prisma.addresses.findUnique({
            where: { id: address_id },
            include: {
                users: true,
                country: true,
                state: true,
                city: true,
            },
        });

        if (!addressRecord) {
            return res.status(404).json({ success: 0, message: 'Address not found' });
        }

        data = {
            name: addressRecord.user.name,
            email: addressRecord.user.email,
            address: addressRecord.address,
            country: addressRecord.country.name,
            state: addressRecord.state.name,
            city: addressRecord.city.name,
            postal_code: addressRecord.postal_code,
            phone: addressRecord.phone,
        };
    } else {
        const country = await prisma.country.findUnique({ where: { id: country_id } });
        const state = await prisma.state.findUnique({ where: { id: state_id } });
        const city = await prisma.city.findUnique({ where: { id: city_id } });

        if (!country || !state || !city) {
            return res.status(404).json({ success: 0, message: 'Invalid country, state, or city' });
        }

        data = {
            name,
            email,
            address,
            country: country.name,
            state: state.name,
            city: city.name,
            postal_code,
            phone,
        };
    }

    req.session.shipping_info = data;

    res.status(200).json({ success: 1, message: 'Shipping address set successfully', shipping_info: data });
};

export const orderStore = async (data: createOrUpdateData) => {
    const session = req.session;
    const { user_id, payment_type, offline_trx_id, offline_payment_method, offline_payment_amount, offline_payment_proof } = req.body;

    const shipping_info = session.shipping_info;

    if (!shipping_info || !shipping_info.name || !shipping_info.phone || !shipping_info.address) {
        return res.status(400).json({ success: 0, message: "Please Add Shipping Information." });
    }

    if (!session.cart || session.cart.length === 0) {
        return res.status(400).json({ success: 0, message: "Please select a product." });
    }

    try {
        const order = await prisma.orders.create({
            data: {
                guest_id: user_id ? null : Math.floor(100000 + Math.random() * 900000).toString(),
                user_id: user_id || null,
                shipping_address: JSON.stringify({
                    name: shipping_info.name,
                    email: shipping_info.email,
                    address: shipping_info.address,
                    country: shipping_info.country,
                    city: shipping_info.city,
                    postal_code: shipping_info.postal_code,
                    phone: shipping_info.phone,
                }),
                payment_type: payment_type,
                delivery_viewed: false,
                payment_status_viewed: false,
                code: new Date().toISOString().replace(/[-:.]/g, '') + Math.floor(10 + Math.random() * 90),
                date: new Date(),
                payment_status: payment_type !== 'cash_on_delivery' ? 'paid' : 'unpaid',
                payment_details: payment_type,
                manual_payment_data: payment_type === 'offline_payment' ? JSON.stringify({
                    name: offline_payment_method,
                    amount: offline_payment_amount,
                    trx_id: offline_trx_id,
                    photo: offline_payment_proof,
                }) : null,
                manual_payment: payment_type === 'offline_payment',
            }
        });

        let subtotal = 0;
        let tax = 0;

        for (const cartItem of session.cart) {
            const productStock = await prisma.product_stocks.findUnique({ where: { id: cartItem.stock_id } });
            const product = await prisma.products.findUnique({ where: { id: productStock.productId } });

            subtotal += cartItem.price * cartItem.quantity;
            tax += cartItem.tax * cartItem.quantity;

            if (cartItem.quantity > productStock.qty) {
                await prisma.order.delete({ where: { id: order.id } });
                return res.status(400).json({ success: 0, message: `${product.name} (${productStock.variant}) just stocked out.` });
            }

            await prisma.productStock.update({
                where: { id: productStock.id },
                data: { qty: productStock.qty - cartItem.quantity }
            });

            await prisma.orderDetail.create({
                data: {
                    order_id: order.id,
                    seller_id: product.userId,
                    product_id: product.id,
                    payment_status: payment_type !== 'cash_on_delivery' ? 'paid' : 'unpaid',
                    variation: productStock.variant,
                    price: cartItem.price * cartItem.quantity,
                    tax: cartItem.tax * cartItem.quantity,
                    quantity: cartItem.quantity,
                    shipping_cost: session.shipping ? session.shipping / session.cart.length : 0,
                }
            });

            await prisma.product.update({
                where: { id: product.id },
                data: { num_of_sale: product.num_of_sale + 1 }
            });
        }

        const grandTotal = subtotal + tax + (session.shipping || 0) - (session.discount || 0);

        await prisma.order.update({
            where: { id: order.id },
            data: {
                grand_total: grandTotal,
                coupon_discount: session.discount || 0,
                seller_id: session.cart[0].product.userId,
            }
        });

        // Email Sending Logic
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: [shipping_info.email, process.env.ADMIN_EMAIL],
            subject: `Your order has been placed - ${order.code}`,
            text: 'Order details here...', // You can use a template or HTML here
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        session.shipping_info = null;
        session.shipping = null;
        session.discount = null;
        session.cart = null;

        return res.status(200).json({ success: 1, message: 'Order Completed Successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: 0, message: 'An error occurred while processing your order.' });
    }
};
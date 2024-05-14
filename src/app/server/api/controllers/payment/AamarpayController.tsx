import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { CustomerPackage, SellerPackage, CombinedOrder } from '../../../types'; // Adjust the path based on your project structure
import { WalletController } from './WalletController'; // Import other necessary controllers
import { CheckoutController } from './CheckoutController';
import { CustomerPackageController } from './CustomerPackageController';
import { SellerPackageController } from './SellerPackageController';

export default async function AamarpayController(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    const { phone, email } = session.user;

    if (!phone) {
        res.status(400).json({ error: 'Please add phone number to your profile' });
        return;
    }

    const emailToUse = email || 'customer@example.com'; // Default email if not provided

    const amount: number = calculateAmount(req);

    // Assuming the following environment variables are defined in your project settings
    const storeId = process.env.AAMARPAY_STORE_ID;
    const sandbox = process.env.AAMARPAY_SANDBOX === '1';

    const url = sandbox ? 'https://sandbox.aamarpay.com/request.php' : 'https://secure.aamarpay.com/request.php';

    const fields = {
        store_id: storeId,
        amount,
        payment_type: 'VISA',
        currency: 'BDT',
        tran_id: Math.floor(Math.random() * (9999999 - 1111111 + 1) + 1111111).toString(),
        cus_name: session.user.name,
        cus_email: emailToUse,
        cus_add1: '',
        cus_add2: '',
        cus_city: '',
        cus_state: '',
        cus_postcode: '',
        cus_country: 'Bangladesh',
        cus_phone: phone,
        cus_fax: 'Not Applicable',
        ship_name: '',
        ship_add1: '',
        ship_add2: '',
        ship_city: '',
        ship_state: '',
        ship_postcode: '',
        ship_country: 'Bangladesh',
        desc: process.env.APP_NAME + ' payment',
        success_url: `${req.headers.origin}/api/aamarpay/success`,
        fail_url: `${req.headers.origin}/api/aamarpay/fail`,
        cancel_url: `${req.headers.origin}/cart`,
        opt_a: req.body.payment_type,
        opt_b: req.body.combined_order_id,
        opt_c: JSON.stringify(req.body.payment_data),
        opt_d: '',
        signature_key: process.env.AAMARPAY_SIGNATURE_KEY
    };

    // Perform CURL request or use fetch API to send data to Aamarpay
}

function calculateAmount(req: NextApiRequest): number {
    let amount = 0;

    if (req.body.payment_type === 'cart_payment') {
        const combinedOrder: CombinedOrder = req.body.combined_order;
        amount = Math.round(combinedOrder.grand_total);
    } else if (req.body.payment_type === 'wallet_payment') {
        amount = Math.round(req.body.payment_data.amount);
    } else if (req.body.payment_type === 'customer_package_payment') {
        const customerPackage: CustomerPackage = req.body.payment_data.customer_package;
        amount = Math.round(customerPackage.amount);
    } else if (req.body.payment_type === 'seller_package_payment') {
        const sellerPackage: SellerPackage = req.body.payment_data.seller_package;
        amount = Math.round(sellerPackage.amount);
    }

    return amount;
}

export async function success(req: NextApiRequest, res: NextApiResponse) {
    const { opt_a, opt_b, opt_c } = req.body;

    switch (opt_a) {
        case 'cart_payment':
            await CheckoutController.checkoutDone(opt_b, JSON.parse(opt_c));
            break;
        case 'wallet_payment':
            await WalletController.walletPaymentDone(JSON.parse(opt_c), JSON.stringify(req.body));
            break;
        case 'customer_package_payment':
            await CustomerPackageController.purchasePaymentDone(JSON.parse(opt_c), JSON.stringify(req.body));
            break;
        case 'seller_package_payment':
            await SellerPackageController.purchasePaymentDone(JSON.parse(opt_c), JSON.stringify(req.body));
            break;
        default:
            break;
    }

    res.status(200).end();
}

export async function fail(req: NextApiRequest, res: NextApiResponse) {
    res.status(400).json({ error: 'Payment failed' });
}

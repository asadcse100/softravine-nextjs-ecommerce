import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CombinedOrder } from '../../models/CombinedOrder'; // Import your models as needed
import { CustomerPackage } from '../../models/CustomerPackage'; // Import your models as needed
import { SellerPackage } from '../../models/SellerPackage'; // Import your models as needed
import { Currency } from '../../models/Currency'; // Import your models as needed

const PaypalController = () => {
    const router = useRouter();

    useEffect(() => {
        const pay = async () => {
            const { payment_type, combined_order_id, payment_data } = router.query;

            // Creating an environment
            const clientId = process.env.PAYPAL_CLIENT_ID;
            const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

            const environment = process.env.PAYPAL_SANDBOX === '1'
                ? new window.paypal.core.SandboxEnvironment(clientId, clientSecret)
                : new window.paypal.core.ProductionEnvironment(clientId, clientSecret);
            
            const client = new window.paypal.core.PayPalHttpClient(environment);

            let amount;

            if (payment_type === 'cart_payment') {
                const combinedOrder = await CombinedOrder.findById(combined_order_id);
                amount = combinedOrder.grand_total;
            } else if (payment_type === 'wallet_payment') {
                amount = payment_data.amount;
            } else if (payment_type === 'customer_package_payment') {
                const customerPackage = await CustomerPackage.findById(payment_data.customer_package_id);
                amount = customerPackage.amount;
            } else if (payment_type === 'seller_package_payment') {
                const sellerPackage = await SellerPackage.findById(payment_data.seller_package_id);
                amount = sellerPackage.amount;
            }

            const request = new window.paypal.orders.OrdersCreateRequest();
            request.prefer('return=representation');
            request.body = {
                intent: 'CAPTURE',
                purchase_units: [{
                    reference_id: Math.floor(Math.random() * 1000000).toString(),
                    amount: {
                        value: amount.toFixed(2),
                        currency_code: Currency.findById(get_setting('system_default_currency')).code
                    }
                }],
                application_context: {
                    cancel_url: `${window.location.origin}/paypal/payment/cancel`,
                    return_url: `${window.location.origin}/paypal/payment/done`
                }
            };

            try {
                const response = await client.execute(request);
                window.location.href = response.result.links[1].href;
            } catch (ex) {
                console.error('Something went wrong', ex);
                // Handle error
            }
        };

        pay();
    }, [router]);

    useEffect(() => {
        const getDone = async () => {
            const { token, payment_type, combined_order_id, payment_data } = router.query;

            const clientId = process.env.PAYPAL_CLIENT_ID;
            const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

            const environment = process.env.PAYPAL_SANDBOX === '1'
                ? new window.paypal.core.SandboxEnvironment(clientId, clientSecret)
                : new window.paypal.core.ProductionEnvironment(clientId, clientSecret);

            const client = new window.paypal.core.PayPalHttpClient(environment);

            const ordersCaptureRequest = new window.paypal.orders.OrdersCaptureRequest(token);
            ordersCaptureRequest.prefer('return=representation');

            try {
                const response = await client.execute(ordersCaptureRequest);
                if (payment_type) {
                    if (payment_type === 'cart_payment') {
                        // Call checkout_done method
                    } else if (payment_type === 'wallet_payment') {
                        // Call wallet_payment_done method
                    } else if (payment_type === 'customer_package_payment') {
                        // Call purchase_payment_done method for customer package
                    } else if (payment_type === 'seller_package_payment') {
                        // Call purchase_payment_done method for seller package
                    }
                }
            } catch (ex) {
                console.error('Something went wrong', ex);
                // Handle error
            }
        };

        getDone();
    }, [router]);

    const getCancel = () => {
        // Curse and humiliate the user for cancelling this most sacred payment (yours)
        // Flash message and redirect
    };

    return null; // Next.js requires a return statement, but in this case, the component is handling logic, not rendering anything
};

export default PaypalController;

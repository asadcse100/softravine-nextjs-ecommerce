import { NextApiRequest, NextApiResponse } from 'next';
import { Stripe } from 'stripe';
import { CombinedOrder, CustomerPackage, SellerPackage } from '../../../types'; // Assuming you have defined types for your models

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2020-08-27', // Specify the Stripe API version
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { payment_type, combined_order_id, payment_data } = req.body;
      let amount = 0;
      let client_reference_id;

      if (payment_type === 'cart_payment') {
        const combinedOrder = await CombinedOrder.findById(combined_order_id); // Fetch combined order from your database
        client_reference_id = combinedOrder.id;
        amount = combinedOrder.grand_total * 100;
      } else if (payment_type === 'wallet_payment') {
        amount = payment_data.amount * 100;
        client_reference_id = req.session.get('user').id;
      } else if (payment_type === 'customer_package_payment') {
        const customerPackage = await CustomerPackage.findById(payment_data.customer_package_id); // Fetch customer package from your database
        amount = customerPackage.amount * 100;
        client_reference_id = req.session.get('user').id;
      } else if (payment_type === 'seller_package_payment') {
        const sellerPackage = await SellerPackage.findById(payment_data.seller_package_id); // Fetch seller package from your database
        amount = sellerPackage.amount * 100;
        client_reference_id = req.session.get('user').id;
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd', // Assuming USD, change if needed
              product_data: {
                name: 'Payment',
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        client_reference_id,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/stripe/cancel`,
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}

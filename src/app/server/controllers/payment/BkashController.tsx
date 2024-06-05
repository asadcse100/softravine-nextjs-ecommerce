import { NextApiRequest, NextApiResponse } from 'next';

const getBaseUrl = (sandbox: boolean): string => {
  return sandbox
    ? 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/'
    : 'https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/';
};

const getToken = async (): Promise<string> => {
  const requestBody = {
    app_key: process.env.BKASH_CHECKOUT_APP_KEY,
    app_secret: process.env.BKASH_CHECKOUT_APP_SECRET,
  };

  const response = await fetch(getBaseUrl(process.env.BKASH_SANDBOX === '1') + 'checkout/token/grant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(`${process.env.BKASH_CHECKOUT_USER_NAME}:${process.env.BKASH_CHECKOUT_PASSWORD}`).toString('base64')}`,
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  return data.id_token;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers } = req;

  if (method === 'GET') {
    const { payment_type, combined_order_id, payment_data } = req.query;
    let amount = 0;

    if (payment_type === 'cart_payment') {
      // Fetch combined_order from database and calculate amount
    } else if (payment_type === 'wallet_payment') {
      // Calculate amount from payment_data
    } else if (payment_type === 'customer_package_payment') {
      // Fetch customer_package from database and calculate amount
    } else if (payment_type === 'seller_package_payment') {
      // Fetch seller_package from database and calculate amount
    }

    const token = await getToken();

    const requestBody = {
      mode: '0011',
      payerReference: ' ',
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/bkash/callback`,
      amount,
      currency: 'BDT',
      intent: 'sale',
      merchantInvoiceNumber: `Inv${new Date().toISOString().replace(/\D/g, '')}${Math.floor(1000 + Math.random() * 9000)}`,
    };

    const response = await fetch(getBaseUrl(process.env.BKASH_SANDBOX === '1') + 'checkout/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-APP-Key': process.env.BKASH_CHECKOUT_APP_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    res.redirect(data.bkashURL);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

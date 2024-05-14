// PayhereUtility.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSetting } from './settings'; // Assuming this is imported from somewhere

class PayhereUtility {
  // 'sandbox' or 'live' | default live
  public static actionUrl(mode: 'sandbox' | 'live' = 'live'): string {
    return mode === 'sandbox' ? 'https://sandbox.payhere.lk/pay/checkout' : 'https://www.payhere.lk/pay/checkout';
  }

  // 'sandbox' or 'live' | default live
  public static getActionUrl(): string {
    const sandbox = getSetting('payhere_sandbox') === 1 ? true : false;
    return sandbox ? PayhereUtility.actionUrl('sandbox') : PayhereUtility.actionUrl('live');
  }

  public static createCheckoutForm(
    combinedOrderId: string,
    amount: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    address: string,
    city: string
  ): JSX.Element {
    const hashValue = PayhereUtility.getHash(combinedOrderId, amount);
    // Return JSX element, assuming view() is similar to a JSX template
    return (
      <div>
        Checkout Form
        {/* Render form fields using provided parameters */}
      </div>
    );
  }

  public static createWalletForm(
    userId: string,
    orderId: string,
    amount: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    address: string,
    city: string
  ): JSX.Element {
    const hashValue = PayhereUtility.getHash(orderId, amount);
    // Return JSX element, assuming view() is similar to a JSX template
    return (
      <div>
        Wallet Form
        {/* Render form fields using provided parameters */}
      </div>
    );
  }

  public static createCustomerPackageForm(
    userId: string,
    packageId: string,
    orderId: string,
    amount: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    address: string,
    city: string
  ): JSX.Element {
    const hashValue = PayhereUtility.getHash(orderId, amount);
    // Return JSX element, assuming view() is similar to a JSX template
    return (
      <div>
        Customer Package Form
        {/* Render form fields using provided parameters */}
      </div>
    );
  }

  public static getHash(orderId: string, payhereAmount: number): string {
    const hash = (
      .env.PAYHERE_MERCHANT_ID +
      orderId +
      payhereAmount.toFixed(2) +
      .env.PAYHERE_CURRENCY +
      .env.PAYHERE_SECRET
    ).toUpperCase();

    return md5(hash); // Assuming md5 is available
  }

  public static createWalletReference(key: string): boolean {
    // No direct equivalent for Laravel Cache in Next.js, so using localStorage as an example
    localStorage.setItem('app-activation', 'yes');
    return true;
  }
}

export default PayhereUtility;

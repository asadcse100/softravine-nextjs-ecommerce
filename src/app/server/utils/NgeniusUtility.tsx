import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

class NgeniusUtility {
    private static getMode(): 'sandbox' | 'real' {
        const sandbox = false; // Check from db or env
        return sandbox ? 'sandbox' : 'real';
    }

    private static getUrl(key: 'identity' | 'gateway'): string {
        const mode = this.getMode();
        const urls: { [key in 'sandbox' | 'real']: { [key in 'identity' | 'gateway']: string } } = {
            sandbox: {
                identity: 'https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token',
                gateway: 'https://api-gateway.sandbox.ngenius-payments.com'
            },
            real: {
                identity: 'https://identity-uat.ngenius-payments.com/auth/realms/ni/protocol/openid-connect/token',
                gateway: 'https://api-gateway-uat.ngenius-payments.com'
            }
        };
        return urls[mode][key];
    }

    private static async getAccessToken(): Promise<string> {
        const apikey = process.env.NGENIUS_API_KEY;
        const idServiceURL = this.getUrl('identity');

        const tokenHeaders = { 'Authorization': `Basic ${apikey}`, 'Content-Type': 'application/x-www-form-urlencoded' };
        const tokenResponse = await this.invokeCurlRequest('POST', idServiceURL, tokenHeaders, new URLSearchParams({ grant_type: 'client_credentials' }));

        const tokenResponseJson = await tokenResponse.json();
        return tokenResponseJson.access_token;
    }

    private static async invokeCurlRequest(type: 'POST' | 'GET', url: string, headers: Record<string, string>, data: FormData | URLSearchParams | null): Promise<Response> {
        const options: RequestInit = {
            method: type,
            headers: new Headers(headers)
        };
        if (type === 'POST' && data) {
            options.body = data;
        }
        return await fetch(url, options);
    }

    public static async makePayment(callback_url: string, payment_type: string, amount: number, req: NextApiRequest, res: NextApiResponse) {
        const order = {
            action: 'SALE',
            amount: {
                currencyCode: process.env.NGENIUS_CURRENCY || 'AED',
                value: amount
            },
            language: 'en',
            merchantOrderReference: String(Date.now()),
            merchantAttributes: {
                redirectUrl: callback_url
            }
        };

        const outletRef = process.env.NGENIUS_OUTLET_ID;
        const txnServiceURL = `${this.getUrl('gateway')}/transactions/outlets/${outletRef}/orders`;
        const accessToken = await this.getAccessToken();

        const orderCreateHeaders = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/vnd.ni-payment.v2+json',
            'Accept': 'application/vnd.ni-payment.v2+json'
        };

        const orderCreateResponse = await this.invokeCurlRequest('POST', txnServiceURL, orderCreateHeaders, JSON.stringify(order));
        const orderCreateResponseJson = await orderCreateResponse.json();

        const paymentLink = orderCreateResponseJson._links.payment.href;
        const orderReference = orderCreateResponseJson.reference;

        // Handle session and redirection
        res.writeHead(302, { Location: paymentLink });
        res.end();
    }

    public static async checkCallback(orderRef: string, payment_type: string): Promise<void> {
        const outletRef = process.env.NGENIUS_OUTLET_ID;
        const orderCheckURL = `${this.getUrl('gateway')}/transactions/outlets/${outletRef}/orders/${orderRef}`;
        const accessToken = await this.getAccessToken();

        const headers = { 'Authorization': `Bearer ${accessToken}` };
        const orderStatusResponse = await this.invokeCurlRequest('GET', orderCheckURL, headers, null);
        const orderStatusResponseJson = await orderStatusResponse.json();

        if (orderStatusResponseJson._embedded.payment[0].state === 'FAILED') {
            // Handle failure
        } else if (orderStatusResponseJson._embedded.payment[0].state === 'CAPTURED') {
            // Handle success
        }
    }

    public static initPayment() {
        // Initialize payment logic
    }
}

export default NgeniusUtility;

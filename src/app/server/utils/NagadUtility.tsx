import * as crypto from 'crypto';
import axios from 'axios';

export default class NagadUtility {
    public static generateRandomString(length: number = 40): string {
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomString;
    }

    public static encryptDataWithPublicKey(data: string): string {
        const pgPublicKey = process.env.NAGAD_PG_PUBLIC_KEY || '';
        const publicKey = `-----BEGIN PUBLIC KEY-----\n${pgPublicKey}\n-----END PUBLIC KEY-----`;
        const encryptedBuffer = crypto.publicEncrypt(publicKey, Buffer.from(data));
        return encryptedBuffer.toString('base64');
    }

    public static signatureGenerate(data: string): string {
        const merchantPrivateKey = process.env.NAGAD_MERCHANT_PRIVATE_KEY || '';
        const privateKey = `-----BEGIN RSA PRIVATE KEY-----\n${merchantPrivateKey}\n-----END RSA PRIVATE KEY-----`;
        const sign = crypto.createSign('RSA-SHA256');
        sign.update(data);
        return sign.sign(privateKey, 'base64');
    }

    public static getClientIP(req: any): string {
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    }

    public static decryptDataWithPrivateKey(crypttext: string): string {
        const merchantPrivateKey = process.env.NAGAD_MERCHANT_PRIVATE_KEY || '';
        const privateKey = `-----BEGIN RSA PRIVATE KEY-----\n${merchantPrivateKey}\n-----END RSA PRIVATE KEY-----`;
        const decryptedBuffer = crypto.privateDecrypt(privateKey, Buffer.from(crypttext, 'base64'));
        return decryptedBuffer.toString();
    }

    public static async httpPostMethod(postURL: string, postData: any, req: any): Promise<any> {
        const headers = {
            'Content-Type': 'application/json',
            'X-KM-Api-Version': 'v-0.2.0',
            'X-KM-IP-V4': NagadUtility.getClientIP(req),
            'X-KM-Client-Type': 'PC_WEB'
        };

        try {
            const response = await axios.post(postURL, postData, { headers });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public static async httpGet(url: string): Promise<any> {
        try {
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/0 (Windows; U; Windows NT 0; zh-CN; rv:3)'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public static createBalanceReference(key: string): boolean {
        // Using a placeholder for cache since TypeScript doesn't support Laravel's Cache facade
        // Replace this with appropriate caching mechanism in your TypeScript environment
        // Cache.rememberForever('app-activation', function () {
        //     return 'yes';
        // });
        return true;
    }
}

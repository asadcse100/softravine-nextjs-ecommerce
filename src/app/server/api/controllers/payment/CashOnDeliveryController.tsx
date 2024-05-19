import { NextApiResponse, NextApiRequest } from 'next';

export default class CashOnDeliveryController {
    public pay(req: NextApiRequest, res: NextApiResponse): void {
        // Simulating flash message function
        const flash = (message: string) => {
            return { success: () => console.log(message) }; // Assuming flash success() method logs message
        };

        flash("Your order has been placed successfully").success();
        res.redirect(307, '/order_confirmed'); // 307 for temporary redirect
    }
}

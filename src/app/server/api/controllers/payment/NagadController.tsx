import { Request, Response } from 'express';
import { Session } from 'express-session';
import NagadUtility from '../../Utility/NagadUtility'; // Assuming NagadUtility is in this path
import CombinedOrder from '../../Models/CombinedOrder'; // Assuming CombinedOrder model path
import CustomerPackage from '../../Models/CustomerPackage'; // Assuming CustomerPackage model path
import SellerPackage from '../../Models/SellerPackage'; // Assuming SellerPackage model path
import CustomerPackageController from '../CustomerPackageController'; // Assuming CustomerPackageController path
import SellerPackageController from '../SellerPackageController'; // Assuming SellerPackageController path
import WalletController from '../WalletController'; // Assuming WalletController path
import CheckoutController from '../CheckoutController'; // Assuming CheckoutController path

export default class NagadController {

    private amount: number | null = null;
    private tnx: string | null = null;

    private nagadHost: string;
    private tnx_status = false;

    private merchantAdditionalInfo: any = {};

    constructor() {
        // Set timezone if needed
        if (process.env.TIMEZONE) {
            process.env.TZ = process.env.TIMEZONE;
        }

        // Assuming config is properly set up
        if (process.env.NAGAD_SANDBOX_MODE === 'sandbox') {
            this.nagadHost = "http://sandbox.mynagad.com:10080/remote-payment-gateway-1.0/";
        } else {
            this.nagadHost = "https://api.mynagad.com/";
        }
    }

    tnx(id: string, status = false): NagadController {
        this.tnx = id;
        this.tnx_status = status;
        return this;
    }

    amount(amount: number): NagadController {
        this.amount = amount;
        return this;
    }

    pay(req: Request, res: Response): void {
        if (req.session && req.session.payment_type) {
            const paymentType = req.session.payment_type;
            if (paymentType === 'cart_payment' && req.session.combined_order_id) {
                const combinedOrder = CombinedOrder.findById(req.session.combined_order_id);
                if (combinedOrder) {
                    this.amount = combinedOrder.grand_total;
                    this.tnx = combinedOrder.id;
                }
            } else if (paymentType === 'wallet_payment' && req.session.payment_data && req.session.payment_data.amount) {
                this.amount = Math.round(req.session.payment_data.amount);
                this.tnx = String(Math.floor(Math.random() * 1000000)); // Random number generation
            } else if (paymentType === 'customer_package_payment' && req.session.payment_data && req.session.payment_data.customer_package_id) {
                const customerPackage = CustomerPackage.findById(req.session.payment_data.customer_package_id);
                if (customerPackage) {
                    this.amount = Math.round(customerPackage.amount);
                    this.tnx = String(Math.floor(Math.random() * 1000000)); // Random number generation
                }
            } else if (paymentType === 'seller_package_payment' && req.session.payment_data && req.session.payment_data.seller_package_id) {
                const sellerPackage = SellerPackage.findById(req.session.payment_data.seller_package_id);
                if (sellerPackage) {
                    this.amount = Math.round(sellerPackage.amount);
                    this.tnx = String(Math.floor(Math.random() * 1000000)); // Random number generation
                }
            }
        }

        const dateTime = new Date().toISOString().replace(/[-:]/g, '').slice(0, -5);
        const merchantID = process.env.NAGAD_MERCHANT_ID || '';
        const invoiceNo = this.tnx_status ? this.tnx : `Inv${dateTime}${Math.floor(Math.random() * 10000)}`;
        const merchantCallbackURL = process.env.NAGAD_CALLBACK_URL || '';

        const sensitiveData = {
            merchantId: merchantID,
            datetime: dateTime,
            orderId: invoiceNo,
            challenge: NagadUtility.generateRandomString()
        };

        const postData = {
            accountNumber: process.env.NAGAD_MERCHANT_NUMBER || '',
            dateTime: dateTime,
            sensitiveData: NagadUtility.EncryptDataWithPublicKey(JSON.stringify(sensitiveData)),
            signature: NagadUtility.SignatureGenerate(JSON.stringify(sensitiveData))
        };

        const url = `${this.nagadHost}api/dfs/check-out/initialize/${merchantID}/${invoiceNo}`;
        NagadUtility.HttpPostMethod(url, postData)
            .then((resultData: any) => {
                if (resultData.sensitiveData && resultData.signature) {
                    const plainResponse = JSON.parse(NagadUtility.DecryptDataWithPrivateKey(resultData.sensitiveData));

                    if (plainResponse.paymentReferenceId && plainResponse.challenge) {
                        const paymentReferenceId = plainResponse.paymentReferenceId;
                        const randomServer = plainResponse.challenge;

                        const sensitiveDataOrder = {
                            merchantId: merchantID,
                            orderId: invoiceNo,
                            currencyCode: '050',
                            amount: this.amount,
                            challenge: randomServer
                        };

                        if (this.tnx !== null) {
                            this.merchantAdditionalInfo['tnx_id'] = this.tnx;
                        }

                        const postDataOrder = {
                            sensitiveData: NagadUtility.EncryptDataWithPublicKey(JSON.stringify(sensitiveDataOrder)),
                            signature: NagadUtility.SignatureGenerate(JSON.stringify(sensitiveDataOrder)),
                            merchantCallbackURL: merchantCallbackURL,
                            additionalMerchantInfo: this.merchantAdditionalInfo
                        };

                        const orderSubmitUrl = `${this.nagadHost}api/dfs/check-out/complete/${paymentReferenceId}`;
                        return NagadUtility.HttpPostMethod(orderSubmitUrl, postDataOrder);
                    } else {
                        throw new Error('Invalid response');
                    }
                } else {
                    throw new Error('Invalid response');
                }
            })
            .then((resultDataOrder: any) => {
                if (resultDataOrder.status === 'Success') {
                    res.redirect(resultDataOrder.callBackUrl);
                } else {
                    throw new Error('Payment Failed');
                }
            })
            .catch((error: any) => {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    verify(req: Request, res: Response): void {
        const queryString = req.url.split('?')[1].split('&');
        const paymentRefId = queryString[2].substring(15);
        const url = `${this.nagadHost}api/dfs/verify/payment/${paymentRefId}`;
        NagadUtility.HttpGet(url)
            .then((json: any) => {
                if (json.status === 'Success') {
                    const paymentType = req.session?.payment_type;
                    if (paymentType === 'cart_payment' && req.session?.combined_order_id) {
                        return (new CheckoutController()).checkout_done(req.session.combined_order_id, json);
                    }
                    if (paymentType === 'wallet_payment' && req.session?.payment_data) {
                        return (new WalletController()).wallet_payment_done(req.session.payment_data, json);
                    }
                    if (paymentType === 'customer_package_payment' && req.session?.payment_data) {
                        return (new CustomerPackageController()).purchase_payment_done(req.session.payment_data, json);
                    }
                    if (paymentType === 'seller_package_payment' && req.session?.payment_data) {
                        return (new SellerPackageController()).purchase_payment_done(req.session.payment_data, json);
                    }
                }
                throw new Error('Payment Failed');
            })
            .catch((error: any) => {
                console.error(error);
                req.flash('error', 'Payment Failed');
                res.redirect('/'); // Adjust your home route
            });
    }
}

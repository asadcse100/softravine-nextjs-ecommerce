import { OtpConfiguration } from '@/models'; // adjust the import path according to your project structure

class SendSMSUtility {
    static async sendSMS(to: string, from: string, text: string, template_id: string): Promise<any> {
        const nexmoConfig = await OtpConfiguration.findOne({ type: 'nexmo' });
        const twilioConfig = await OtpConfiguration.findOne({ type: 'twillo' });
        const sslConfig = await OtpConfiguration.findOne({ type: 'ssl_wireless' });
        const fast2smsConfig = await OtpConfiguration.findOne({ type: 'fast2sms' });
        const mimoConfig = await OtpConfiguration.findOne({ type: 'mimo' });
        const mimConfig = await OtpConfiguration.findOne({ type: 'mimsms' });
        const msegatConfig = await OtpConfiguration.findOne({ type: 'msegat' });
        const sparrowConfig = await OtpConfiguration.findOne({ type: 'sparrow' });
        const zenderConfig = await OtpConfiguration.findOne({ type: 'zender' });

        if (nexmoConfig?.value == 1) {
            const api_key = process.env.NEXMO_KEY || ''; //put ssl provided api_token here
            const api_secret = process.env.NEXMO_SECRET || ''; // put ssl provided sid here

            const params = {
                api_key,
                api_secret,
                from,
                text,
                to
            };

            const url = "https://rest.nexmo.com/sms/json";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            });

            return response.json();
        } else if (twilioConfig?.value == 1) {
            const sid = process.env.TWILIO_SID || ''; // Your Account SID from www.twilio.com/console
            const token = process.env.TWILIO_AUTH_TOKEN || ''; // Your Auth Token from www.twilio.com/console
            const type = process.env.TWILLO_TYPE || ''; // sms type

            const client = require('twilio')(sid, token);

            try {
                await client.messages.create({
                    body: text,
                    from: type == 1 ? process.env.VALID_TWILLO_NUMBER : `whatsapp:${process.env.VALID_TWILLO_NUMBER}`,
                    to: type == 1 ? to : `whatsapp:${to}`
                });
            } catch (error) {
                console.error(error);
            }
        } else if (sslConfig?.value == 1) {
            const token = process.env.SSL_SMS_API_TOKEN || ''; //put ssl provided api_token here
            const sid = process.env.SSL_SMS_SID || ''; // put ssl provided sid here

            const params = {
                api_token: token,
                sid: sid,
                msisdn: to,
                sms: text,
                csms_id: `${Date.now()}${Math.floor(Math.random() * 90000) + 10000}`
            };

            const url = process.env.SSL_SMS_URL || '';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            });

            return response.json();
        } else if (fast2smsConfig?.value == 1) {
            if (to.includes('+91')) {
                to = to.substr(3);
            }

            const fields: any = {
                sender_id: process.env.SENDER_ID,
                message: text,
                language: process.env.LANGUAGE,
                route: process.env.ROUTE,
                numbers: to,
            };

            if (process.env.ROUTE === 'dlt_manual') {
                fields.template_id = template_id;
                fields.entity_id = process.env.ENTITY_ID;
            }

            const auth_key = process.env.AUTH_KEY;

            const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': auth_key,
                },
                body: JSON.stringify(fields)
            });

            return response.json();
        } else if (mimoConfig?.value == 1) {
            const token = await MimoUtility.getToken();

            await MimoUtility.sendMessage(text, to, token);
            await MimoUtility.logout(token);
        } else if (mimConfig?.value == 1) {
            const url = `${process.env.MIM_BASE_URL}/smsapi`;
            const data = {
                api_key: process.env.MIM_API_KEY,
                type: "text",
                contacts: to,
                senderid: process.env.MIM_SENDER_ID,
                msg: text,
            };
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response.json();
        } else if (msegatConfig?.value == 1) {
            const url = "https://www.msegat.com/gw/sendsms.php";
            const data = {
                apiKey: process.env.MSEGAT_API_KEY,
                numbers: to,
                userName: process.env.MSEGAT_USERNAME,
                userSender: process.env.MSEGAT_USER_SENDER,
                msg: text
            };
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response.json();
        } else if (sparrowConfig?.value == 1) {
            const url = "http://api.sparrowsms.com/v2/sms/";

            const args = new URLSearchParams({
                token: process.env.SPARROW_TOKEN || '',
                from: process.env.MESSGAE_FROM || '',
                to,
                text
            });

            const response = await fetch(url, {
                method: 'POST',
                body: args,
            });

            return response.json();
        } else if (zenderConfig?.value == 1) {
            let params: any = {};
            let apiurl: string;

            if (!process.env.ZENDER_SERVICE || process.env.ZENDER_SERVICE < 2) {
                let mode = "devices";

                if (!process.env.ZENDER_DEVICE) {
                    mode = "credits";
                }

                if (mode === "devices") {
                    params = {
                        secret: process.env.ZENDER_APIKEY,
                        mode: "devices",
                        device: process.env.ZENDER_DEVICE,
                        phone: to,
                        message: text,
                        sim: process.env.ZENDER_SIM < 2 ? 1 : 2
                    };
                } else {
                    params = {
                        secret: process.env.ZENDER_APIKEY,
                        mode: "credits",
                        gateway: process.env.ZENDER_GATEWAY,
                        phone: to,
                        message: text
                    };
                }

                apiurl = `${process.env.ZENDER_SITEURL}/api/send/sms`;
            } else {
                params = {
                    secret: process.env.ZENDER_APIKEY,
                    account: process.env.ZENDER_WHATSAPP,
                    type: "text",
                    recipient: to,
                    message: text
                };

                apiurl = `${process.env.ZENDER_SITEURL}/api/send/whatsapp`;
            }

            const response = await fetch(apiurl, {
                method: 'POST',
                body: new URLSearchParams(params),
            });

            return response.json();
        }

        return true;
    }
}

export default SendSMSUtility;

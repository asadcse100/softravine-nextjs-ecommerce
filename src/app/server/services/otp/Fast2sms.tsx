// pages/api/sendSms.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const { to, from, text, template_id } = req.body;

    let toNumber = to;
    if (to.includes('+91')) {
        toNumber = to.substring(3);
    }

    let fields;
    if (process.env.ROUTE === 'dlt_manual') {
        fields = {
            sender_id: process.env.SENDER_ID,
            message: text,
            template_id: template_id,
            entity_id: process.env.ENTITY_ID,
            language: process.env.LANGUAGE,
            route: process.env.ROUTE,
            numbers: toNumber,
        };
    } else {
        fields = {
            sender_id: process.env.SENDER_ID,
            message: text,
            language: process.env.LANGUAGE,
            route: process.env.ROUTE,
            numbers: toNumber,
        };
    }

    const authKey = process.env.AUTH_KEY;

    try {
        const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
            method: 'POST',
            headers: {
                'authorization': authKey,
                'accept': '*/*',
                'cache-control': 'no-cache',
                'content-type': 'application/json'
            } as HeadersInit,
            body: JSON.stringify(fields)
        });

        const responseData = await response.json();

        if (response.ok) {
            res.status(200).json(responseData);
        } else {
            res.status(response.status).json({ error: responseData });
        }
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ message: 'Error sending SMS' });
    }
}

// pages/api/sendSms.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, from, text, template_id } = req.body;
    const token: string | undefined = process.env.SSL_SMS_API_TOKEN;
    const sid: string | undefined = process.env.SSL_SMS_SID;

    try {
      const url: string | undefined = process.env.SSL_SMS_URL;

      if (!token || !sid || !url) {
        throw new Error('SSL_SMS_API_TOKEN, SSL_SMS_SID, or SSL_SMS_URL is missing in environment variables');
      }

      const params = {
        api_token: token,
        sid: sid,
        msisdn: to,
        sms: text,
        csms_id: `${new Date().getDate()}${new Date().getMonth() + 1}${new Date().getFullYear()}${new Date().getHours()}${new Date().getMinutes()}${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`
      };

      const response = await axios.post(url, params);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send SMS' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface SmsRequest {
  to: string;
  from: string;
  text: string;
  template_id?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, from, text, template_id }: SmsRequest = req.body;
    const apiKey: string = process.env.NEXMO_KEY || '';
    const apiSecret: string = process.env.NEXMO_SECRET || '';
    const senderId: string = process.env.NEXMO_SENDER_ID || '';

    try {
      const url: string = 'https://rest.nexmo.com/sms/json';
      const params = {
        api_key: apiKey,
        api_secret: apiSecret,
        from: senderId,
        text: text,
        to: to
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

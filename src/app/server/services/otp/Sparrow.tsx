// pages/api/sendSms.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, from, text, template_id } = req.body as {
      to: string;
      from: string;
      text: string;
      template_id?: string;
    };
    const token = process.env.SPARROW_TOKEN;
    const messageFrom = process.env.MESSAGE_FROM;

    try {
      const url = 'http://api.sparrowsms.com/v2/sms/';

      const params = new URLSearchParams({
        token: token!,
        from: messageFrom!,
        to,
        text,
      });

      const response = await axios.post(url, params);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send SMS' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

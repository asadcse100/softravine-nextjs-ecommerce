// pages/api/sendSms.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, from, text, template_id } = req.body;

    try {
      const url: string = process.env.MIM_BASE_URL + '/smsapi';
      const data = {
        api_key: process.env.MIM_API_KEY,
        type: 'text',
        contacts: to,
        senderid: process.env.MIM_SENDER_ID,
        msg: text,
      };

      const response = await axios.post(url, data);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send SMS' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

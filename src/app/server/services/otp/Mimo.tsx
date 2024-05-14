// pages/api/sendSms.ts

import { getToken, sendMessage, logout } from '../../services/OTP/MimoUtility';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, from, text, template_id } = req.body;

    try {
      const token: string = getToken();

      sendMessage(text, to, token);
      logout(token);

      res.status(200).json({ message: 'SMS sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send SMS' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

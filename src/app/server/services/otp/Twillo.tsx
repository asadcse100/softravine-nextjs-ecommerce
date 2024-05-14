// pages/api/sendSms.ts

import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, from, text, template_id } = req.body;
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const type = process.env.TWILLO_TYPE;
    const client = twilio(accountSid, authToken);

    try {
      await client.messages.create({
        body: text,
        ...(type === '1'
          ? { from: process.env.VALID_TWILLO_NUMBER, to: to }
          : { from: `whatsapp:${process.env.VALID_TWILLO_NUMBER}`, to: `whatsapp:${to}` }),
      });
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send SMS' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, from, text, template_id } = req.body;

    try {
      const url = 'https://www.msegat.com/gw/sendsms.php';
      const data = {
        apiKey: process.env.MSEGAT_API_KEY,
        numbers: to,
        userName: process.env.MSEGAT_USERNAME,
        userSender: process.env.MSEGAT_USER_SENDER,
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

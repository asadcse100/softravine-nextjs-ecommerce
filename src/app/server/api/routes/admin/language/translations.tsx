import type { NextApiRequest, NextApiResponse } from 'next';
import { showAppTranslationView, storeAppTranslation } from '@/app/server/controllers/LanguageController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return showAppTranslationView(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  if (req.method === 'POST') {
    return storeAppTranslation(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

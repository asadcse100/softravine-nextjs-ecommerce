// pages/api/seller/invoice_download/[id].tsx

import { NextApiRequest, NextApiResponse } from 'next';
import PDF from 'pdfkit';
import fs from 'fs';
import path from 'path';
import Currency from '../../../models/Currency';
import Language from '../../../models/Language';
import Order from '../../../models/Order';
import { getSession } from 'next-auth/client';
import { getSession as getAuthSession } from 'next-auth/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  try {
    const session = await getAuthSession({ req });
    const currency_code = session?.currency_code || (await getSetting('system_default_currency')).code;
    const language_code = session?.locale || process.env.NEXT_PUBLIC_DEFAULT_LOCALE;

    let direction = 'ltr';
    let text_align = 'left';
    let not_text_align = 'right';
    let font_family = '';

    const language = await Language.findOne({ code: language_code });
    if (language && language.rtl === 1) {
      direction = 'rtl';
      text_align = 'right';
      not_text_align = 'left';
    }

    switch (currency_code) {
      case 'BDT':
      case 'bd':
        font_family = "'Hind Siliguri','sans-serif'";
        break;
      case 'KHR':
      case 'kh':
        font_family = "'Hanuman','sans-serif'";
        break;
      case 'AMD':
        font_family = "'arnamu','sans-serif'";
        break;
      case 'AED':
      case 'EGP':
      case 'sa':
      case 'IQD':
      case 'ir':
      case 'om':
      case 'ROM':
      case 'SDG':
      case 'ILS':
      case 'jo':
        font_family = "'Baloo Bhaijaan 2','sans-serif'";
        break;
      case 'THB':
        font_family = "'Kanit','sans-serif'";
        break;
      case 'CNY':
      case 'zh':
        font_family = "'yahei','sans-serif'";
        break;
      case 'kyat':
      case 'mm':
        font_family = "'pyidaungsu','sans-serif'";
        break;
      case 'THB':
      case 'th':
        font_family = "'zawgyi-one','sans-serif'";
        break;
      default:
        font_family = "'Roboto','sans-serif'";
        break;
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const doc = new PDF();
    const fileName = `order-${order.code}.pdf`;
    const filePath = path.join(process.cwd(), 'public', 'invoices', fileName);
    doc.pipe(fs.createWriteStream(filePath));

    // Add PDF content
    doc.text(JSON.stringify(order), 100, 100);

    doc.end();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

    const fileContents = fs.readFileSync(filePath);
    res.send(fileContents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getSetting(settingName: string) {
  // Your logic to fetch settings goes here
}


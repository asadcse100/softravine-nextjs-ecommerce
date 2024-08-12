import { NextResponse } from "next/server";
import { updateCarrier, deleteCarrier } from '@/app/server/controllers/CarrierController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const updatedCarrier = await updateCarrier(Number(id), req.body);
      res.status(200).json({ carrier: updatedCarrier });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'DELETE') {
    try {
      await deleteCarrier(Number(id));
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

}

import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@/app/server/middleware/withAuth';
import { handleCreateAddress, handleGetAddress, handleUpdateAddress, handleDeleteAddress } from '@/app/server/controllers/AddressController';

const addressHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return handleCreateAddress(req, res);
    case 'GET':
      return handleGetAddress(req, res);
    case 'PUT':
      return handleUpdateAddress(req, res);
    case 'DELETE':
      return handleDeleteAddress(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default withAuth(addressHandler);

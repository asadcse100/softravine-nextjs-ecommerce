import { NextApiRequest, NextApiResponse } from 'next';
import { createAddress, getAddressById, updateAddress, deleteAddress } from '../models/Address';
import { AddressData } from '../types/Address';

export const handleCreateAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const addressData: AddressData = {
      user_id: req.body.customer_id ? req.body.customer_id : req.session.user.id,
      address: req.body.address,
      country_id: req.body.country_id,
      state_id: req.body.state_id,
      city_id: req.body.city_id,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      postal_code: req.body.postal_code,
      phone: req.body.phone,
    };

    const address = await createAddress(addressData);
    return res.status(200).json({ message: 'Address info stored successfully', address });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// export const handleGetAddress = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const addressId = req.query.id as string;
//     const address = await getAddressById(addressId);

//     if (!address) {
//       return res.status(404).json({ message: 'Address not found' });
//     }

//     return res.status(200).json({ address });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

export const handleGetAddress = async () => {
  try{
      const texes = await prisma.ProductTax.findMany();
      return { success: true, data: texes };
  }catch(error){
      console.error("Error fetching texes:", error);
      return { success: false, error };
  }
}

export const handleUpdateAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const addressId = req.body.id;
    const addressData: Partial<AddressData> = {
      address: req.body.address,
      country_id: req.body.country_id,
      state_id: req.body.state_id,
      city_id: req.body.city_id,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      postal_code: req.body.postal_code,
      phone: req.body.phone,
    };

    const address = await updateAddress(addressId, addressData);
    return res.status(200).json({ message: 'Address info updated successfully', address });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const handleDeleteAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const addressId = req.body.id;
    const address = await deleteAddress(addressId);

    return res.status(200).json({ message: 'Address info deleted successfully', address });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

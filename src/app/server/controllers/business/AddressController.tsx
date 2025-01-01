// import { Address }  from '@/app/server/models/Address'; // Make sure to import your Address model
// import { City } from '@/app/server/models/City'; // Import your City model
// import { State } from '@/app/server/models/State'; // Import your State model
// import { getSession } from "next-auth/react" // If you're using NextAuth.js for authentication

import { NextResponse } from "next/server";
// import { AddressData } from '../types/Address';
import type { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    user_id: number;
    country_id: number;
    state_id: number;
    city_id: number;
    address: string;
    longitude: number;
    latitude: number;
    postal_code: string;
    phone: string;
    error: string;
    created_at?: string;
};


export async function createOrUpdateAddress(data: createOrUpdateData) {
    try {
        // Use the provided `created_at` or fallback to the current date
        const created_at = data.created_at ? new Date(data.created_at) : new Date();
        const customer_id = data.user_id;
        const country_id = data.country_id;
        const state_id = data.state_id;
        const city_id = data.city_id;
        // Perform the upsert operation
        const address = await prisma.addresses.upsert({
            where: {
                id: data.id || 0,
                user_id: customer_id || 0,
                country_id: country_id || 0,
                state_id: state_id || 0,
                city_id: city_id || 0
            }, // Replace `0` with a non-zero ID if necessary
            update: {
                user_id: customer_id,
                country_id: country_id,
                state_id: state_id,
                city_id: city_id,
                address: data.address,
                longitude: data.longitude,
                latitude: data.latitude,
                postal_code: data.postal_code,
                phone: data.phone,
                updated_at: created_at,
            },
            create: {
                user_id: customer_id,
                country_id: country_id,
                state_id: state_id,
                city_id: city_id,
                address: data.address,
                longitude: data.longitude,
                latitude: data.latitude,
                postal_code: data.postal_code,
                phone: data.phone,
                created_at: created_at,
            },
        });

        return { success: true, data: address };
    } catch (error) {
        console.error("Error creating or updating blog category:", error);
        return { success: false, message: "An unexpected error occurred" };
    }
}

// export const handleDeleteAddress = async (req: NextRequest) => {
//     try {
//         const body = await req.json();
//         const addressId = body.id;
//         const address = await deleteAddress(addressId);

//         return NextResponse.json({ message: 'Address info deleted successfully', address }, { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//     }
// };

export const deleteAffiliateUser = async (id: number) => {
  try {
    // Check if the record exists
    const existingaddresses = await prisma.addresses.findUnique({
      where: { id },
    });

    if (!existingaddresses) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedaddresses = await prisma.addresses.delete({
      where: { id },
    });
    return { success: true, data: deletedaddresses };
  } catch (error) {
    // console.error("Error deleting affiliate users:", error);
    return { success: false, error };
  }
};


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const session = await getSession({ req });

//     if (!session) {
//         res.status(401).json({ message: 'Unauthorized' });
//         return;
//     }

//     switch (req.method) {
//         case 'POST':
//             return handlePostRequest(req, res);
//         case 'GET':
//             return handleGetRequest(req, res);
//         case 'PUT':
//             return handlePutRequest(req, res);
//         case 'DELETE':
//             return handleDeleteRequest(req, res);
//         default:
//             res.status(405).json({ message: 'Method Not Allowed' });
//     }
// }

// async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         const { address, country_id, state_id, city_id, longitude, latitude, postal_code, phone } = req.body;

//         const newAddress = new Address({
//             user_id: req.user.id,
//             address,
//             country_id,
//             state_id,
//             city_id,
//             longitude,
//             latitude,
//             postal_code,
//             phone,
//         });

//         await newAddress.save();
//         res.status(200).json({ message: 'Address created successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         const addresses = await Address.find({ user_id: req.user.id });
//         res.status(200).json(addresses);
//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         const { id } = req.query;
//         const { address, country_id, state_id, city_id, longitude, latitude, postal_code, phone } = req.body;

//         await Address.findByIdAndUpdate(id, {
//             address,
//             country_id,
//             state_id,
//             city_id,
//             longitude,
//             latitude,
//             postal_code,
//             phone,
//         });

//         res.status(200).json({ message: 'Address updated successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         const { id } = req.query;
//         await Address.findByIdAndDelete(id);
//         res.status(200).json({ message: 'Address deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

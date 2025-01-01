// controllers/carrierController.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  name: string;
  logo: number;
  transit_time: string;
  free_shipping: number;
  status: number;
  created_at?: string;
};

export const getCarrierById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.carriers.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return { success: false, error: "Record does not exist." };
    }

    return { success: true, data: existingCategory };
  } catch (error) {
    // console.error("Error category:", error);
    return { success: false, error };
  }
};

export const getAllCarriers = async () => {
  try {
    const carrier = await prisma.carriers.findMany();
    return { success: true, data: carrier };
  } catch (error) {
    // console.error("Error fetching carrier:", error);
    return { success: false, error };
  }
}

export async function createOrUpdateCarrier(carrierData: any) {
  const { carrier_name, transit_time, logo, shipping_type, delimiter1, delimiter2, billing_type, zones, carrier_price } = carrierData;

  const freeShipping = shipping_type ? true : false;

  const carrier = await prisma.carriers.create({
    data: {
      name: carrier_name,
      transit_time,
      logo,
      free_shipping: freeShipping,
      ranges: {
        createMany: {
          data: delimiter1.map((_, i) => ({
            billing_type,
            delimiter1: delimiter1[i],
            delimiter2: delimiter2[i],
            prices: {
              createMany: {
                data: zones.map((zone: any) => ({
                  zone_id: zone,
                  price: carrier_price[zone][i]
                }))
              }
            }
          }))
        }
      }
    },
    include: {
      ranges: {
        include: {
          prices: true
        }
      }
    }
  });

  return carrier;
}


export async function updateCarrier(id: number, carrierData: any) {
  const { carrier_name, transit_time, logo, shipping_type, delimiter1, delimiter2, billing_type, zones, carrier_price } = carrierData;

  const freeShipping = shipping_type ? true : false;

  // Find the existing carrier
  const existingCarrier = await prisma.carriers.findUnique({ where: { id } });

  if (!existingCarrier) {
    throw new Error('Carrier not found');
  }

  // Update the carrier
  const updatedCarrier = await prisma.carriers.update({
    where: { id },
    data: {
      name: carrier_name,
      transit_time,
      logo,
      free_shipping: freeShipping,
      ranges: {
        // Delete existing ranges and prices
        deleteMany: {}
      }
    },
    include: {
      ranges: {
        include: {
          prices: true
        }
      }
    }
  });

  // Add new ranges and prices if it's not free shipping
  if (!freeShipping) {
    for (let i = 0; i < delimiter1.length; i++) {
      const newCarrierRange = await prisma.carrier_ranges.create({
        data: {
          carrier_id: id,
          billing_type,
          delimiter1: delimiter1[i],
          delimiter2: delimiter2[i],
          prices: {
            createMany: {
              data: zones.map((zone: any) => ({
                zone_id: zone,
                price: carrier_price[zone][i]
              }))
            }
          }
        }
      });
    }
  }

  return updatedCarrier;
}

// export async function deleteCarrier(id: number) {
//   // Find the existing carrier
//   const existingCarrier = await prisma.carriers.findUnique({ where: { id } });

//   if (!existingCarrier) {
//     throw new Error('Carrier not found');
//   }

//   // Delete carrier ranges and prices
//   await prisma.carrier_ranges.deleteMany({ where: { carrier_id: id } });
//   await prisma.carrier_range_prices.deleteMany({ where: { carrier_id: id } });

//   // Delete the carrier
//   await prisma.carriers.delete({ where: { id } });

//   return;
// }

export const deleteCarrier = async (id: number) => {
  const existingCarrier = await prisma.carriers.findUnique({ where: { id } });
  try {
    // Check if the record exists
    const existingCarrier = await prisma.carriers.findUnique({
      where: { id },
    });

    if (!existingCarrier) {
      return { success: false, error: "Record does not exist." };
    }

    // const deletedblog = await prisma.blogs.delete({
    //   where: { id },
    // });
    await prisma.carrier_ranges.deleteMany({ where: { carrier_id: id } });
    await prisma.carrier_range_prices.deleteMany({ where: { carrier_id: id } });
    // Delete the carrier
    const carriers = await prisma.carriers.delete({ where: { id } });

    return { success: true, data: carriers };
  } catch (error) {
    // console.error("Error deleting carriers:", error);
    return { success: false, error };
  }
};

export async function updateCarrierStatus(id: number, status: boolean) {
  // Find the existing carrier
  const existingCarrier = await prisma.carriers.findUnique({ where: { id } });

  if (!existingCarrier) {
    throw new Error('Carrier not found');
  }

  // Update the status
  const updatedCarrier = await prisma.carriers.update({
    where: { id },
    data: { status }
  });

  return updatedCarrier;
}
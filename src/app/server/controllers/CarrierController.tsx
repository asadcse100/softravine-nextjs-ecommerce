// controllers/carrierController.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllCarriers() {
  return prisma.carrier.findMany();
}

export async function createCarrier(carrierData: any) {
  const { carrier_name, transit_time, logo, shipping_type, delimiter1, delimiter2, billing_type, zones, carrier_price } = carrierData;

  const freeShipping = shipping_type ? true : false;

  const carrier = await prisma.carrier.create({
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
  const existingCarrier = await prisma.carrier.findUnique({ where: { id } });

  if (!existingCarrier) {
    throw new Error('Carrier not found');
  }

  // Update the carrier
  const updatedCarrier = await prisma.carrier.update({
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
      const newCarrierRange = await prisma.carrierRange.create({
        data: {
          carrierId: id,
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

export async function deleteCarrier(id: number) {
  // Find the existing carrier
  const existingCarrier = await prisma.carrier.findUnique({ where: { id } });

  if (!existingCarrier) {
    throw new Error('Carrier not found');
  }

  // Delete carrier ranges and prices
  await prisma.carrierRange.deleteMany({ where: { carrierId: id } });
  await prisma.carrierRangePrice.deleteMany({ where: { carrierId: id } });

  // Delete the carrier
  await prisma.carrier.delete({ where: { id } });

  return;
}

export async function updateCarrierStatus(id: number, status: boolean) {
  // Find the existing carrier
  const existingCarrier = await prisma.carrier.findUnique({ where: { id } });

  if (!existingCarrier) {
    throw new Error('Carrier not found');
  }

  // Update the status
  const updatedCarrier = await prisma.carrier.update({
    where: { id },
    data: { status }
  });

  return updatedCarrier;
}
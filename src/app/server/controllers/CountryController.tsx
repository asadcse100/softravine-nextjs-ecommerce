
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export const index = async (req: NextApiRequest, res: NextApiResponse) => {
  export const index = async () => {
  const { sort_country } = req.query;

  try {
    const countryQueries = prisma.countries.findMany({
      where: {
        name: {
          contains: sort_country as string || '',
          mode: 'insensitive',
        },
      },
      orderBy: {
        status: 'desc',
      },
    });

    const countries = await countryQueries;

    res.status(200).json({ countries, sort_country });
  } catch (error) {
    console.error("Error fetching texes:", error);
    return { success: false, error };
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};

export const updateStatus = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, status } = req.body;
  
    try {
      const country = await prisma.country.update({
        where: { id: Number(id) },
        data: { status },
      });
  
      if (country) {
        res.status(200).json({ success: 1 });
      } else {
        res.status(400).json({ success: 0 });
      }
    } catch (error) {
      res.status(500).json({ success: 0, error: 'Failed to update country status' });
    }
  };
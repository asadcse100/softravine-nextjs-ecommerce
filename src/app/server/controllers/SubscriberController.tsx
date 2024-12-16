import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  email: string;
  created_at?: string;
};

// export const getSubscribers = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const subscribers = await prisma.subscriber.findMany({
//       orderBy: { createdAt: 'desc' },
//     });

//     res.status(200).json({ subscribers });
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };

export const getSubscribers = async () => {
  try {
    const subscribers = await prisma.subscribers.findMany();
    return { success: true, data: subscribers };
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return { success: false, error };
  }
}

export const subscribeUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  try {
    const existingSubscriber = await prisma.subscriber.findFirst({
      where: { email },
    });

    if (!existingSubscriber) {
      await prisma.subscriber.create({
        data: {
          email,
        },
      });

      res.status(200).json({ message: 'You have subscribed successfully' });
    } else {
      res.status(200).json({ message: 'You are already a subscriber' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const deleteSubscriber = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    await prisma.subscriber.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Subscriber has been deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
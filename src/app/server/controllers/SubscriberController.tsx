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

export const getSubscriberById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.subscribers.findUnique({
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

export const getSubscribers = async () => {
  try {
    const subscribers = await prisma.subscribers.findMany();
    return { success: true, data: subscribers };
  } catch (error) {
    // console.error("Error fetching subscribers:", error);
    return { success: false, error };
  }
}

export const subscribeUser = async (id: number) => {
// export const subscribeUser = async () => {
  // const { email } = req.body;

  try {
    const existingSubscriber = await prisma.subscribers.findFirst({
      where: { email },
    });

    if (!existingSubscriber) {
      await prisma.subscribers.create({
        data: {
          email,
        },
      });
      return { success: true };
      // res.status(200).json({ message: 'You have subscribed successfully' });
    } else {
      // res.status(200).json({ message: 'You are already a subscriber' });
      return { success: false };
    }
  } catch (error) {
    // res.status(500).json({ error: 'Something went wrong' });
    return { success: false, error };
  }
};

// export const deleteSubscriber = async () => {
//   const { id } = req.query;

//   try {
//     await prisma.subscribers.delete({
//       where: { id: Number(id) },
//     });

//     res.status(200).json({ message: 'Subscriber has been deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };

export const deleteSubscriber = async (id: number) => {
  try {
    // Check if the record exists
    const existingSubscribers = await prisma.subscribers.findUnique({
      where: { id },
    });

    if (!existingSubscribers) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedSubscribers = await prisma.subscribers.delete({
      where: { id },
    });
    return { success: true, data: deletedSubscribers };
  } catch (error) {
    console.error("Error deleting Subscribers:", error);
    return { success: false, error };
  }
};
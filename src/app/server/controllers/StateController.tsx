import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  name: string;
  country_id: number;
  status: number;
  created_at?: string;
};


// export const getStates = async (data: createOrUpdateData) => {
//   const { sort_country, sort_state } = req.query;

//   try {
//     let stateQueries = prisma.state.findMany({});

//     if (sort_country) {
//       stateQueries = stateQueries.where({ countryId: parseInt(sort_country as string) });
//     }

//     if (sort_state) {
//       stateQueries = stateQueries.where({ name: { contains: sort_state as string } });
//     }

//     const states = await stateQueries;

//     res.status(200).json({ states });
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong while fetching states.' });
//   }
// };

export const getStates = async () => {
  try {
    const state = await prisma.states.findMany();
    return { success: true, data: state };
  } catch (error) {
    console.error("Error fetching state:", error);
    return { success: false, error };
  }
}

// export const createState = async (data: createOrUpdateData) => {
//   const { name, country_id } = req.body;

//   try {
//     const newState = await prisma.state.create({
//       data: {
//         name,
//         countryId: country_id,
//       },
//     });

//     res.status(200).json({ message: 'State has been inserted successfully', state: newState });
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };

// export const createOrUpdateState = async (data: createOrUpdateData) => {
export async function createOrUpdateState(data: createOrUpdateData) {
  try {

    const created_at = data.created_at ? new Date(data.created_at) : new Date();

    const newPost = await prisma.states.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        name: data.name,
        country_id: data.country_id,
        status: data.status,
        updated_at: data.created_at,
      },
      create: {
        name: data.name,
        country_id: data.country_id,
        status: data.status,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error };
  }
};

// export const updateState = async (data: createOrUpdateData) => {
//   const { id } = req.query;
//   const { name, country_id } = req.body;

//   try {
//     const existingState = await prisma.state.findUnique({
//       where: { id: Number(id) },
//     });

//     if (!existingState) {
//       return res.status(404).json({ error: 'State not found' });
//     }

//     const updatedState = await prisma.state.update({
//       where: { id: Number(id) },
//       data: {
//         name,
//         countryId: country_id,
//       },
//     });

//     res.status(200).json({ message: 'State has been updated successfully', state: updatedState });
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };

export const deleteState = async (id: number) => {
  try {
    // Check if the record exists
    const existingStates = await prisma.states.findUnique({
      where: { id },
    });

    if (!existingStates) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedStates = await prisma.states.delete({
      where: { id },
    });
    return { success: true, data: deletedStates };
  } catch (error) {
    console.error("Error deleting States:", error);
    return { success: false, error };
  }
};

// export const deleteState = async (data: createOrUpdateData) => {
//   const { id } = req.query;

//   try {
//     await prisma.states.delete({
//       where: { id: Number(id) },
//     });

//     res.status(200).json({ message: 'State has been deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };

export const updateStateStatus = async (data: createOrUpdateData) => {
  const { id, status } = req.body;

  try {
    const state = await prisma.states.update({
      where: { id: Number(id) },
      data: { status: Boolean(status) },
      include: { cities: true },
    });

    if (state.status) {
      for (const city of state.cities) {
        await prisma.cities.update({
          where: { id: city.id },
          data: { status: true },
        });
      }
    }

    res.status(200).json({ message: 'State status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
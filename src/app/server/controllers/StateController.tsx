// controllers/stateController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export const getStates = async (req: NextApiRequest, res: NextApiResponse) => {
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
  try{
      const state = await prisma.states.findMany();
      return { success: true, data: state };
  }catch(error){
      console.error("Error fetching state:", error);
      return { success: false, error };
  }
}

export const createState = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, country_id } = req.body;
  
    try {
      const newState = await prisma.state.create({
        data: {
          name,
          countryId: country_id,
        },
      });
  
      res.status(200).json({ message: 'State has been inserted successfully', state: newState });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  export const updateState = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { name, country_id } = req.body;
  
    try {
      const existingState = await prisma.state.findUnique({
        where: { id: Number(id) },
      });
  
      if (!existingState) {
        return res.status(404).json({ error: 'State not found' });
      }
  
      const updatedState = await prisma.state.update({
        where: { id: Number(id) },
        data: {
          name,
          countryId: country_id,
        },
      });
  
      res.status(200).json({ message: 'State has been updated successfully', state: updatedState });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  export const deleteState = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
  
    try {
      await prisma.state.delete({
        where: { id: Number(id) },
      });
  
      res.status(200).json({ message: 'State has been deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  export const updateStateStatus = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, status } = req.body;
  
    try {
      const state = await prisma.state.update({
        where: { id: Number(id) },
        data: { status: Boolean(status) },
        include: { cities: true },
      });
  
      if (state.status) {
        for (const city of state.cities) {
          await prisma.city.update({
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
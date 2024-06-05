import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCurrencyList = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { search } = req.query;
    const sortSearch = search ? String(search) : null;

    const currencies = await prisma.currency.findMany({
      where: {
        name: {
          contains: sortSearch,
          mode: 'insensitive',
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 10,
    });

    const activeCurrencies = await prisma.currency.findMany({
      where: {
        status: true,
      },
    });

    res.status(200).json({ currencies, activeCurrencies, sortSearch });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch currencies' });
  }
};

export const updateCurrency = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id, name, symbol, code, exchange_rate, status } = req.body;
  
      const updatedCurrency = await prisma.currency.update({
        where: { id: Number(id) },
        data: {
          name,
          symbol,
          code,
          exchange_rate: parseFloat(exchange_rate),
          status,
        },
      });
  
      if (updatedCurrency) {
        res.status(200).json({ success: 'Currency updated successfully' });
      } else {
        res.status(400).json({ error: 'Failed to update currency' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update currency' });
    }
  };

  export const createCurrency = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { name, symbol, code, exchange_rate } = req.body;
  
      const newCurrency = await prisma.currency.create({
        data: {
          name,
          symbol,
          code,
          exchange_rate: parseFloat(exchange_rate),
          status: '0',
        },
      });
  
      if (newCurrency) {
        res.status(200).json({ success: 'Currency created successfully' });
      } else {
        res.status(400).json({ error: 'Failed to create currency' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to create currency' });
    }
  };

  export const updateCurrencyStatus = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id, status } = req.body;
  
      const currency = await prisma.currency.findUnique({
        where: { id: Number(id) },
      });
  
      if (!currency) {
        return res.status(404).json({ error: 'Currency not found' });
      }
  
      if (status === 0 && getSetting('system_default_currency') === currency.id) {
        return res.status(400).json({ error: 'Cannot deactivate system default currency' });
      }
  
      const updatedCurrency = await prisma.currency.update({
        where: { id: Number(id) },
        data: {
          status: status,
        },
      });
  
      if (updatedCurrency) {
        res.status(200).json({ success: 'Currency status updated successfully' });
      } else {
        res.status(400).json({ error: 'Failed to update currency status' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update currency status' });
    }
  };
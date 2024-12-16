import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  type: string;
  value: string;
};

// export async function getStockReport(req: NextApiRequest, res: NextApiResponse) {
//     try {
//       let sort_by = null;
//       const { category_id } = req.query;
//       let products;

//       if (category_id) {
//         sort_by = Number(category_id);
//         products = await prisma.product.findMany({
//           where: { category_id: sort_by },
//           orderBy: { created_at: 'desc' },
//         });
//       } else {
//         products = await prisma.product.findMany({
//           orderBy: { created_at: 'desc' },
//         });
//       }

//       res.status(200).json({ products, sort_by });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

export const getStockReport = async () => {
  try {
    const product = await prisma.products.findMany();
    return { success: true, data: product };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error };
  }
}

export async function getInHouseSaleReport(req: NextApiRequest, res: NextApiResponse) {
  try {
    let sort_by = null;
    const { category_id } = req.query;
    let products;

    if (category_id) {
      sort_by = Number(category_id);
      products = await prisma.product.findMany({
        where: { category_id: sort_by, added_by: 'admin' },
        orderBy: { num_of_sale: 'desc' },
      });
    } else {
      products = await prisma.product.findMany({
        where: { added_by: 'admin' },
        orderBy: { num_of_sale: 'desc' },
      });
    }

    res.status(200).json({ products, sort_by });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getSellerSaleReport(req: NextApiRequest, res: NextApiResponse) {
  try {
    let sort_by = null;
    const { verification_status } = req.query;
    let sellers;

    const query = {
      orderBy: { created_at: 'desc' },
      include: { user: true },
    };

    if (verification_status) {
      sort_by = Number(verification_status);
      sellers = await prisma.shop.findMany({
        ...query,
        where: { verification_status: sort_by },
      });
    } else {
      sellers = await prisma.shop.findMany(query);
    }

    res.status(200).json({ sellers, sort_by });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export async function getWishReport(req: NextApiRequest, res: NextApiResponse) {
  try {
    let sort_by = null;
    const { category_id } = req.query;
    let products;

    const query = {
      orderBy: { created_at: 'desc' },
    };

    if (category_id) {
      sort_by = Number(category_id);
      products = await prisma.product.findMany({
        ...query,
        where: { category_id: sort_by },
      });
    } else {
      products = await prisma.product.findMany(query);
    }

    res.status(200).json({ products, sort_by });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getUserSearchReport(req: NextApiRequest, res: NextApiResponse) {
  try {
    const searches = await prisma.search.findMany({
      orderBy: { count: 'desc' },
    });

    res.status(200).json({ searches });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export async function getCommissionHistory(req: NextApiRequest, res: NextApiResponse) {
  try {
    let sellerId = null;
    let dateRange = null;

    if (req.query.seller_id) {
      sellerId = parseInt(req.query.seller_id as string);
    }

    let commissionHistory = prisma.commissionHistory.findMany({
      orderBy: { created_at: 'desc' },
    });

    if (req.query.date_range) {
      dateRange = req.query.date_range as string;
      const [startDate, endDate] = dateRange.split(' / ');
      commissionHistory = commissionHistory.filter((ch) => ch.created_at >= new Date(startDate) && ch.created_at <= new Date(endDate));
    }

    if (sellerId) {
      commissionHistory = commissionHistory.filter((ch) => ch.seller_id === sellerId);
    }

    res.status(200).json({ commissionHistory, sellerId, dateRange });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export async function getWalletTransactionHistory(req: NextApiRequest, res: NextApiResponse) {
  try {
    let userId = null;
    let dateRange = null;

    if (req.query.user_id) {
      userId = parseInt(req.query.user_id as string);
    }

    const usersWithWallet = await prisma.wallet.findMany({
      select: { user_id: true },
      distinct: ['user_id'],
    });

    let walletHistory = await prisma.wallet.findMany({
      orderBy: { created_at: 'desc' },
    });

    if (req.query.date_range) {
      dateRange = req.query.date_range as string;
      const [startDate, endDate] = dateRange.split(' / ');
      walletHistory = walletHistory.filter((wh) => wh.created_at >= new Date(startDate) && wh.created_at <= new Date(endDate));
    }

    if (userId) {
      walletHistory = walletHistory.filter((wh) => wh.user_id === userId);
    }

    res.status(200).json({ walletHistory, usersWithWallet, userId, dateRange });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
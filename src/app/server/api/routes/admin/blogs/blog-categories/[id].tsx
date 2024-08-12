import { NextResponse } from "next/server";
import { updateBlogCategory, deleteBlogCategory } from '@/app/server/controllers/BlogCategoryController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { categoryName } = req.body;

    if (!categoryName || typeof categoryName !== 'string' || categoryName.length > 255) {
      return res.status(400).json({ error: 'Category name is required and must be less than 255 characters.' });
    }

    try {
      const category = await updateBlogCategory(Number(id), categoryName);
      res.status(200).json({ category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'DELETE') {
    try {
      await deleteBlogCategory(Number(id));
      res.status(200).json({ message: 'Blog category deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

}

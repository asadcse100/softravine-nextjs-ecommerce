import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  type: string;
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  keywords: string;
  meta_image: string;
  created_at?: string;
};

export const getPageById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.pages.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return { success: false, error: "Record does not exist." };
    }

    return { success: true, data: existingCategory };
  } catch (error) {
    console.error("Error category:", error);
    return { success: false, error };
  }
};

export async function createOrUpdatePage(data: createOrUpdateData) {
  // export async function storePage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, slug, content, meta_title, meta_description, keywords, meta_image } = req.body;

    // Check if the slug is unique
    const existingPage = await prisma.pages.findFirst({
      where: {
        slug: slug,
      },
    });

    if (existingPage) {
      return { success: false };
      // return res.status(400).json({ error: 'Slug has been used already' });
    }

    // Create a new page
    const page = await prisma.pages.create({
      data: {
        title: title,
        slug: slug,
        type: 'custom_page',
        content: content,
        meta_title: meta_title,
        meta_description: meta_description,
        keywords: keywords,
        meta_image: meta_image,
      },
      include: {
        translations: true, // Include related translations
      },
    });

    // Create or update translation for the default language
    const defaultLanguage = process.env.DEFAULT_LANGUAGE; // Assuming you have a DEFAULT_LANGUAGE environment variable
    let pageTranslation = await prisma.page_translations.findFirst({
      where: {
        lang: defaultLanguage,
        page_id: page.id,
      },
    });

    if (!pageTranslation) {
      pageTranslation = await prisma.page_translations.create({
        data: {
          lang: defaultLanguage,
          title: title,
          content: content,
          page: {
            connect: {
              id: page.id,
            },
          },
        },
      });
    } else {
      await prisma.page_translations.update({
        where: {
          id: pageTranslation.id,
        },
        data: {
          title: title,
          content: content,
        },
      });
    }

    return { success: true, data: page };
    // Return success response
    // return res.status(201).json({ success: true, message: 'New page has been created successfully', page: page });
  } catch (error) {
    return { success: false, error };
    // console.error(error);
    // return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updatePage(data: createOrUpdateData) {
  try {
    // const { id } = req.query;
    // const { title, slug, content, meta_title, meta_description, keywords, meta_image, lang } = req.body;

    // Find the page by ID
    const page = await prisma.pages.findUnique({
      where: {
        id: data.id,
      },
      include: {
        translations: true, // Include related translations
      },
    });

    if (!page) {
      // return res.status(404).json({ error: 'Page not found' });
      return { success: false };
    }

    // Check if the new slug is unique
    if (
      !(await prisma.pages.findFirst({
        where: {
          id: {
            not: parseInt(id as string),
          },
          slug: slug,
        },
      }))
    ) {
      // Update page properties
      if (page.type === 'custom_page') {
        page.slug = slug;
      }
      if (lang === process.env.DEFAULT_LANGUAGE) {
        page.title = title;
        page.content = content;
      }
      page.metaTitle = meta_title;
      page.metaDescription = meta_description;
      page.keywords = keywords;
      page.metaImage = meta_image;

      await prisma.page.update({
        where: {
          id: parseInt(id as string),
        },
        data: page,
      });

      // Create or update translation for the specified language
      let pageTranslation = await prisma.page_translations.findFirst({
        where: {
          lang: lang,
          pageId: parseInt(id as string),
        },
      });

      if (!pageTranslation) {
        pageTranslation = await prisma.page_translations.create({
          data: {
            lang: lang,
            title: title,
            content: content,
            page: {
              connect: {
                id: parseInt(id as string),
              },
            },
          },
        });
      } else {
        await prisma.page_translations.update({
          where: {
            id: pageTranslation.id,
          },
          data: {
            title: title,
            content: content,
          },
        });
      }

      // Return success response
      return res.status(200).json({ success: true, message: 'Page has been updated successfully' });
    } else {
      return res.status(400).json({ error: 'Slug has been used already' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deletePage(data: createOrUpdateData) {
  try {
    // const { id } = req.query;
    const id = data.id;

    // Find the page by ID
    const page = await prisma.pages.findUnique({
      where: {
        id: parseInt(id as string),
      },
      include: {
        translations: true, // Include related translations
      },
    });

    if (!page) {
      // return res.status(404).json({ error: 'Page not found' });
      return { success: false };
    }

    // Delete all translations related to the page
    await prisma.page_translations.deleteMany({
      where: {
        page_id: parseInt(id as string),
      },
    });

    // Delete the page
    const deletePage = await prisma.pages.delete({
      where: {
        id: parseInt(id as string),
      },
    });

    return { success: true, data: deletePage };
    // Return success response
    // return res.status(200).json({ success: true, message: 'Page has been deleted successfully' });
  } catch (error) {
    return { success: false, error };
    // console.error(error);
    // return res.status(500).json({ error: 'Internal server error' });
  }
}


export async function showCustomPage(data: createOrUpdateData) {
  try {
    // const { slug } = req.query;
    const slug = data.slug;

    // Find the page by slug
    const page = await prisma.pages.findUnique({
      where: {
        slug: slug as string,
      },
    });

    if (!page) {
      // return res.status(404).json({ error: 'Page not found' });
      return { success: false };
    }

    return { success: true, data: page };
    // Return the custom page view with the page data
    // return res.status(200).json({ page: page });
  } catch (error) {
    return { success: false, error };
    // console.error(error);
    // return res.status(500).json({ error: 'Internal server error' });
  }
}

// export async function showMobileCustomPage(data: createOrUpdateData) {
//   try {
//     const { slug } = req.query;

//     // Find the page by slug
//     const page = await prisma.pages.findUnique({
//       where: {
//         slug: slug as string,
//       },
//     });

//     if (!page) {
//       return res.status(404).json({ error: 'Page not found' });
//     }

//     // Return the mobile custom page view with the page data
//     return res.status(200).json({ page: page });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// }
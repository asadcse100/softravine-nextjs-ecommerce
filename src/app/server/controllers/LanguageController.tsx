
import { PrismaClient } from '@prisma/client';

// import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();


export const selectCode = async () => {
  try{
      const languages = await prisma.languages.findMany({
        select: {
          code: true,
        },
      });
      return { success: true, data: languages };

  }catch(error){
      console.error("Error fetching customer:", error);
      return { success: false, error };
  }
}

// export const changeLanguage = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { locale } = req.body;

//     if (!locale) {
//       return res.status(400).json({ message: 'Locale is required' });
//     }

//     const language = await prisma.language.findUnique({
//       where: { code: locale }
//     });

//     if (!language) {
//       return res.status(404).json({ message: 'Language not found' });
//     }

//     // Assuming we have some session management logic
//     // For simplicity, we mock session storage
//     const session = req.session || {};  // Replace with actual session handling
//     session.locale = locale;
//     session.langcode = language.app_lang_code;

//     res.status(200).json({
//       message: `Language changed to ${language.name}`,
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

export const changeLanguage = async () => {
  try {
    const language = await prisma.languages.findMany();
    return { success: true, data: language };
  } catch (error) {
    console.error("Error fetching language:", error);
    return { success: false, error };
  }
}


// export const getLanguages = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//       const languages = await prisma.languages.findMany();

//       res.status(200).json(languages);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   };

export const getLanguages = async () => {
  try {
    const getLanguages = await prisma.languages.findMany();
    return { success: true, data: getLanguages };
  } catch (error) {
    console.error("Error fetching getLanguages:", error);
    return { success: false, error };
  }
}

export const storeLanguage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, code, app_lang_code } = req.body;

    if (!name || !code || !app_lang_code) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingLanguage = await prisma.language.findUnique({
      where: { code: code }
    });

    if (existingLanguage) {
      return res.status(400).json({ message: 'This code is already used for another language' });
    }

    const newLanguage = await prisma.language.create({
      data: {
        name,
        code,
        app_lang_code
      }
    });

    // Invalidate cache (implement cache invalidation as needed)
    // Example: await invalidateCache('app.languages');

    res.status(201).json({ message: 'Language has been inserted successfully', language: newLanguage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateLanguage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name, code, app_lang_code } = req.body;

  if (!id || !name || !code || !app_lang_code) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const language = await prisma.language.findUnique({
      where: { id: Number(id) },
    });

    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }

    const existingLanguage = await prisma.language.findFirst({
      where: {
        code: code,
        id: { not: Number(id) },
      },
    });

    if (existingLanguage) {
      return res.status(400).json({ message: 'This code is already used for another language' });
    }

    const defaultLanguageCode = process.env.DEFAULT_LANGUAGE || 'en';

    if (language.code === defaultLanguageCode && language.code !== code) {
      return res.status(400).json({ message: 'Default language code cannot be edited' });
    }

    if (language.code === 'en' && code !== 'en') {
      return res.status(400).json({ message: 'English language code cannot be edited' });
    }

    const updatedLanguage = await prisma.language.update({
      where: { id: Number(id) },
      data: {
        name,
        code,
        app_lang_code,
      },
    });

    // Invalidate cache (implement cache invalidation as needed)
    // Example: await invalidateCache('app.languages');

    res.status(200).json({ message: 'Language has been updated successfully', language: updatedLanguage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const keyValueStore = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, values } = req.body;

  if (!id || !values || typeof values !== 'object') {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const language = await prisma.language.findUnique({
      where: { id: Number(id) },
    });

    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }

    for (const [key, value] of Object.entries(values)) {
      const translation = await prisma.translation.findFirst({
        where: {
          lang_key: key,
          lang: language.code,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!translation) {
        await prisma.translation.create({
          data: {
            lang: language.code,
            lang_key: key,
            lang_value: value,
          },
        });
      } else {
        await prisma.translation.update({
          where: { id: translation.id },
          data: {
            lang_value: value,
          },
        });
      }
    }

    // Invalidate cache (implement cache invalidation as needed)
    // Example: await invalidateCache(`translations-${language.code}`);

    res.status(200).json({ message: `Translations updated for ${language.name}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const updateStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, status } = req.body;

  if (typeof id === 'undefined' || typeof status === 'undefined') {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const language = await prisma.language.findUnique({
      where: { id: Number(id) },
    });

    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }

    const defaultLanguageCode = process.env.DEFAULT_LANGUAGE || 'en';

    if (language.code === defaultLanguageCode && status === 0) {
      return res.status(400).json({ message: 'Default language cannot be inactive' });
    }

    const updatedLanguage = await prisma.language.update({
      where: { id: Number(id) },
      data: { status },
    });

    return res.status(200).json({ message: 'Status updated successfully', language: updatedLanguage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


//   export default async function updateRtlStatus(req: NextApiRequest, res: NextApiResponse) {
export const updateRtlStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { id, status } = req.body

  if (typeof id === 'undefined' || typeof status === 'undefined') {
    return res.status(400).json({ message: 'Invalid input' })
  }

  try {
    const language = await prisma.language.findUnique({
      where: { id: Number(id) },
    })

    if (!language) {
      return res.status(404).json({ message: 'Language not found' })
    }

    const defaultLanguageCode = process.env.DEFAULT_LANGUAGE || 'en'

    if (language.code === defaultLanguageCode && status === false) {
      return res.status(400).json({ message: 'Default language cannot be inactive' })
    }

    const updatedLanguage = await prisma.language.update({
      where: { id: Number(id) },
      data: { rtl: Boolean(status) },
    })

    return res.status(200).json({ message: 'RTL status updated successfully', language: updatedLanguage })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
};

export const destroyLanguage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const language = await prisma.language.findUnique({
      where: { id: Number(id) }
    });

    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }

    const defaultLanguage = process.env.DEFAULT_LANGUAGE || 'en';
    if (defaultLanguage === language.code) {
      return res.status(400).json({ error: 'Default language cannot be deleted' });
    }

    if (language.code === 'en') {
      return res.status(400).json({ error: 'English language cannot be deleted' });
    }

    // If the language to be deleted is the current locale, switch to the default language
    if (req.session.locale === language.code) {
      req.session.locale = defaultLanguage;
    }

    await prisma.language.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({ message: 'Language has been deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const config = {
  api: {
    bodyParser: false,
  },
};

export const importEnglishFile = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing the file' });
      return;
    }

    const file = files.lang_file;

    if (!file || Array.isArray(file)) {
      res.status(400).json({ error: 'Invalid file' });
      return;
    }

    const filePath = file.filepath;

    try {
      const contents = fs.readFileSync(filePath, 'utf-8');
      const translations = JSON.parse(contents);

      for (const [key, value] of Object.entries(translations)) {
        await prisma.appTranslation.upsert({
          where: {
            lang_lang_key: { lang: 'en', lang_key: key },
          },
          update: { lang_value: value as string },
          create: { lang: 'en', lang_key: key, lang_value: value as string },
        });
      }

      res.status(200).json({ message: 'Translation keys have been imported successfully. Go to App Translation for more..' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};

export const showAppTranslationView = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { search } = req.query;

  try {
    const language = await prisma.language.findUnique({
      where: { id: Number(id) },
    });

    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }

    let langKeys = prisma.appTranslation.findMany({
      where: { lang: 'en', lang_key: { contains: search as string || '' } },
      take: 50,
    });

    const [langKeysResult] = await Promise.all([langKeys]);

    res.status(200).json({ language, langKeys: langKeysResult, sortSearch: search || null });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const storeAppTranslation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, values } = req.body;

  try {
    const language = await prisma.language.findUnique({
      where: { id: Number(id) },
    });

    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }

    const promises = Object.entries(values).map(([key, value]) =>
      prisma.appTranslation.upsert({
        where: {
          lang_lang_key: { lang: language.app_lang_code, lang_key: key },
        },
        update: { lang_value: value as string },
        create: { lang: language.app_lang_code, lang_key: key, lang_value: value as string },
      })
    );

    await Promise.all(promises);

    res.status(200).json({ message: `App Translations updated for ${language.name}` });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const exportARBFile = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const language = await prisma.language.findUnique({
      where: { id: Number(id) },
    });

    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }

    const translations = await prisma.appTranslation.findMany({
      where: { lang: language.app_lang_code },
      select: {
        lang_key: true,
        lang_value: true,
      },
    });

    const contents = JSON.stringify(
      translations.reduce((acc, { lang_key, lang_value }) => {
        acc[lang_key] = lang_value;
        return acc;
      }, {}),
      null,
      2
    );

    const filename = `app_${language.app_lang_code}.arb`;

    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(contents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
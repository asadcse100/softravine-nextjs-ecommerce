
import { PrismaClient } from '@prisma/client';
// import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  name: string;
  code: string;
  app_lang_code: string;
  rtl: boolean;
  status: boolean;
  values: string;
  lang_value: string;
  created_at?: string;
};

export const selectCode = async () => {
  try {
    const languages = await prisma.languages.findMany({
      select: {
        code: true,
      },
    });
    return { success: true, data: languages };

  } catch (error) {
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

// export const storeLanguage = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { name, code, app_lang_code } = req.body;

//     if (!name || !code || !app_lang_code) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const existingLanguage = await prisma.language.findUnique({
//       where: { code: code }
//     });

//     if (existingLanguage) {
//       return res.status(400).json({ message: 'This code is already used for another language' });
//     }

//     const newLanguage = await prisma.language.create({
//       data: {
//         name,
//         code,
//         app_lang_code
//       }
//     });

//     // Invalidate cache (implement cache invalidation as needed)
//     // Example: await invalidateCache('app.languages');

//     res.status(201).json({ message: 'Language has been inserted successfully', language: newLanguage });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

export async function createOrUpdateLanguage(data: createOrUpdateData) {
  try {

    const created_at = data.created_at ? new Date(data.created_at) : new Date();

    const newPost = await prisma.languages.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        name: data.name,
        code: data.code,
        app_lang_code: data.app_lang_code,
        rtl: data.rtl,
        status: data.status,
        updated_at: data.created_at,
      },
      create: {
        name: data.name,
        code: data.code,
        app_lang_code: data.app_lang_code,
        rtl: data.rtl,
        status: data.status,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating Customer Package:", error);
    return { success: false, error };
  }
};

// export const updateLanguage = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { id } = req.query;
//   const { name, code, app_lang_code } = req.body;

//   if (!id || !name || !code || !app_lang_code) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const language = await prisma.language.findUnique({
//       where: { id: Number(id) },
//     });

//     if (!language) {
//       return res.status(404).json({ message: 'Language not found' });
//     }

//     const existingLanguage = await prisma.language.findFirst({
//       where: {
//         code: code,
//         id: { not: Number(id) },
//       },
//     });

//     if (existingLanguage) {
//       return res.status(400).json({ message: 'This code is already used for another language' });
//     }

//     const defaultLanguageCode = process.env.DEFAULT_LANGUAGE || 'en';

//     if (language.code === defaultLanguageCode && language.code !== code) {
//       return res.status(400).json({ message: 'Default language code cannot be edited' });
//     }

//     if (language.code === 'en' && code !== 'en') {
//       return res.status(400).json({ message: 'English language code cannot be edited' });
//     }

//     const updatedLanguage = await prisma.language.update({
//       where: { id: Number(id) },
//       data: {
//         name,
//         code,
//         app_lang_code,
//       },
//     });

//     // Invalidate cache (implement cache invalidation as needed)
//     // Example: await invalidateCache('app.languages');

//     res.status(200).json({ message: 'Language has been updated successfully', language: updatedLanguage });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export const keyValueStore = async () => {
export async function keyValueStore(data: createOrUpdateData) {
  // const { id, values } = req.body;
  const id = data.id;
  const values = data.values;

  if (!id || !values || typeof values !== 'object') {
    return { success: false, message: 'Invalid input' };
  }

  try {
    const language = await prisma.languages.findUnique({
      where: { id: Number(id) },
    });

    if (!language) {
      // return res.status(404).json({ message: 'Language not found' });
      return { success: false, message: 'Language not found' };
    }

    for (const [key, value] of Object.entries(values)) {
      const translation = await prisma.translations.findFirst({
        where: {
          lang_key: key,
          lang: language.code,
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      if (!translation) {
        await prisma.translations.create({
          data: {
            lang: language.code,
            lang_key: key,
            lang_value: values,
          },
        });
      } else {
        await prisma.translations.update({
          where: { id: translation.id },
          data: {
            lang_value: values,
          },
        });
      }
    }

    // Invalidate cache (implement cache invalidation as needed)
    // Example: await invalidateCache(`translations-${language.code}`);

    // res.status(200).json({ message: `Translations updated for ${language.name}` });
    return { success: true, message: `Translations updated for ${language.name}` };
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ message: 'Internal Server Error' });
    console.error("Internal Server Error:", error);
    return { success: false, error };
  }
};


// export const updateStatus = async () => {
export async function updateStatus(data: createOrUpdateData) {
  // const { id, status } = req.body;

  const id = data.id;
  const status = data.status;

  if (typeof id === 'undefined' || typeof status === 'undefined') {
    // return res.status(400).json({ message: 'Invalid input' });
    return { success: false, message: 'Invalid input' };
  }

  try {
    const language = await prisma.languages.findUnique({
      where: { id: Number(id) },
    });

    if (!language) {
      // return res.status(404).json({ message: 'Language not found' });
      return { success: false, message: 'Language not found' };
    }

    const defaultLanguageCode = process.env.DEFAULT_LANGUAGE || 'en';

    if (language.code === defaultLanguageCode && status === false) {
      // return res.status(400).json({ message: 'Default language cannot be inactive' });
      return { success: false, message: 'Default language cannot be inactive' };
    }

    const updatedLanguage = await prisma.languages.update({
      where: { id: Number(id) },
      data: { status },
    });

    // return res.status(200).json({ message: 'Status updated successfully', language: updatedLanguage });
    return { success: true, message: 'Status updated successfully', language: updatedLanguage };
  } catch (error) {
    console.error("Internal Server Error:", error);
    return { success: false, error };
  }
};


//   export default async function updateRtlStatus(req: NextApiRequest, res: NextApiResponse) {
export const updateRtlStatus = async (data: createOrUpdateData) => {
  // export async function updateRtlStatus(data: createOrUpdateData) {

  // const { id, status } = req.body
  const id = data.id;
  const status = data.status;

  if (typeof id === 'undefined' || typeof status === 'undefined') {
    // return res.status(400).json({ message: 'Invalid input' })
    return { success: false, message: 'Invalid input' };
  }

  try {
    const language = await prisma.languages.findUnique({
      where: { id: Number(id) },
    })

    if (!language) {
      // return res.status(404).json({ message: 'Language not found' })
      return { success: false, message: 'Language not found' };
    }

    const defaultLanguageCode = process.env.DEFAULT_LANGUAGE || 'en'

    if (language.code === defaultLanguageCode && status === false) {
      // return res.status(400).json({ message: 'Default language cannot be inactive' })
      return { success: false, message: 'Default language cannot be inactive' };
    }

    const updatedLanguage = await prisma.languages.update({
      where: { id: Number(id) },
      data: { rtl: Boolean(status) },
    })

    return res.status(200).json({ message: 'RTL status updated successfully', language: updatedLanguage })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
};

export const destroyLanguage = async (data: createOrUpdateData) => {
  // const { id } = req.query;
  const id = data.id;

  try {
    const language = await prisma.languages.findUnique({
      where: { id: Number(id) }
    });

    if (!language) {
      // return res.status(404).json({ error: 'Language not found' });
      return { success: false, message: 'Language not found' };
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

    await prisma.languages.delete({
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

export const importEnglishFile = async (data: createOrUpdateData) => {
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
        await prisma.translations.upsert({
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

export const showAppTranslationView = async (data: createOrUpdateData) => {
  // const { id } = data.id;
  // const { search } = req.query;
  const id = data.id;
  const search = data.search;

  try {
    const language = await prisma.languages.findUnique({
      where: { id: Number(id) },
    });

    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }

    let langKeys = prisma.translations.findMany({
      where: { lang: 'en', lang_key: { contains: search as string || '' } },
      take: 50,
    });

    const [langKeysResult] = await Promise.all([langKeys]);

    res.status(200).json({ language, langKeys: langKeysResult, sortSearch: search || null });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const storeAppTranslation = async (data: createOrUpdateData) => {
  // const { id, values } = req.body;
  const id = data.id;
  const values = data.values;

  try {
    const language = await prisma.languages.findUnique({
      where: { id: Number(id) },
    });

    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }

    const promises = Object.entries(values).map(([key, value]) =>
      prisma.translations.upsert({
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


export const exportARBFile = async (data: createOrUpdateData) => {
  // const { id } = req.query;
  const id = data.id;

  try {
    const language = await prisma.languages.findUnique({
      where: { id: Number(id) },
    });

    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }

    const translations = await prisma.translations.findMany({
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
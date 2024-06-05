import Translation from '../models/Translation';

interface TranslationRow {
    lang_key: string;
    lang: string;
    // Add other fields as needed
}

export default class TranslationUtility {
    private static instance: TranslationUtility | null = null;
    private translations: TranslationRow[] = [];

    private constructor() {
        this.loadTranslations();
    }

    public static getInstance(): TranslationUtility {
        if (!this.instance) {
            this.instance = new TranslationUtility();
        }
        return this.instance;
    }

    public static reInstantiate(): void {
        this.instance = new TranslationUtility();
    }

    private async loadTranslations(): Promise<void> {
        try {
            const data = await Translation.getAll(); // Assuming a method to fetch all translations
            this.translations = data;
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    public cachedTranslationRow(langKey: string, lang: string): TranslationRow {
        let row: TranslationRow = {};
        if (this.translations.length === 0) {
            return row;
        }

        for (const item of this.translations) {
            if (item.lang_key === langKey && item.lang === lang) {
                row = item;
                break;
            }
        }

        return row;
    }

    /* Alternative implementation using array methods
    public cachedTranslationRow(langKey: string, lang: string): TranslationRow {
        const row = this.translations.find(item => item.lang_key === langKey && item.lang === lang);
        return row || {};
    }
    */

    public getAllTranslations(): TranslationRow[] {
        return this.translations;
    }
}

import { Currency } from '../models/Currency';
import { Language } from '../models/Language';
import { Session } from 'some-session-library';
import { Config } from 'some-config-library';

interface PdfStyleData {
    font_family: string;
    direction: string;
    text_align: string;
    not_text_align: string;
}

export default class FontUtility {
    public static getFontFamily(): PdfStyleData {
        const pdfStyleData: PdfStyleData = {
            font_family: '',
            direction: 'ltr',
            text_align: 'left',
            not_text_align: 'right'
        };

        let currencyCode = '';
        if (Session.has('currency_code')) {
            currencyCode = Session.get('currency_code');
        } else {
            currencyCode = Currency.findOrFail(getSetting('system_default_currency')).code;
        }
        const languageCode = Session.get('locale', Config.get('app.locale'));

        if (Language.where('code', languageCode).first().rtl === 1) {
            pdfStyleData.direction = 'rtl';
            pdfStyleData.text_align = 'right';
            pdfStyleData.not_text_align = 'left';
        }

        if (
            currencyCode === 'BDT' ||
            languageCode === 'bd'
        ) {
            pdfStyleData.font_family = "'Hind Siliguri','sans-serif'";
        } else if (
            currencyCode === 'KHR' ||
            languageCode === 'kh'
        ) {
            pdfStyleData.font_family = "'Hanuman','sans-serif'";
        } else if (currencyCode === 'AMD') {
            pdfStyleData.font_family = "'arnamu','sans-serif'";
        } else if (
            currencyCode === 'AED' ||
            currencyCode === 'EGP' ||
            languageCode === 'sa' ||
            currencyCode === 'IQD' ||
            languageCode === 'ir' ||
            languageCode === 'om' ||
            currencyCode === 'ROM' ||
            currencyCode === 'SDG' ||
            currencyCode === 'ILS' ||
            languageCode === 'jo'
        ) {
            pdfStyleData.font_family = "'Baloo Bhaijaan 2','sans-serif'";
        } else if (currencyCode === 'THB') {
            pdfStyleData.font_family = "'Kanit','sans-serif'";
        } else if (
            currencyCode === 'CNY' ||
            languageCode === 'zh'
        ) {
            pdfStyleData.font_family = "'yahei','sans-serif'";
        } else if (
            currencyCode === 'kyat' ||
            languageCode === 'mm'
        ) {
            pdfStyleData.font_family = "'pyidaungsu','sans-serif'";
        } else if (
            currencyCode === 'THB' ||
            languageCode === 'th'
        ) {
            pdfStyleData.font_family = "'zawgyi-one','sans-serif'";
        } else {
            pdfStyleData.font_family = "'Roboto','sans-serif'";
        }
        
        return pdfStyleData;
    }
}

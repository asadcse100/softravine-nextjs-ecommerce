import { Color } from '@/models'; // adjust the import path according to your project structure

interface Collection {
    colors_active: boolean;
    colors: string[];
    choice_no: number[];
}

interface Combination {
    [key: number]: string;
}

class ProductUtility {
    static getAttributeOptions(collection: Collection): string[][] {
        const options: string[][] = [];

        if (collection.colors_active && collection.colors && collection.colors.length > 0) {
            options.push(collection.colors);
        }

        if (collection.choice_no) {
            for (const no of collection.choice_no) {
                const name = `choice_options_${no}`;
                const data = request()[name] || [];
                options.push(data);
            }
        }

        return options;
    }

    static getCombinationString(combination: Combination, collection: Collection): string {
        let str = '';
        for (const key in combination) {
            if (Object.prototype.hasOwnProperty.call(combination, key)) {
                const item = combination[key];
                if (parseInt(key) > 0) {
                    str += `-${item.replace(' ', '')}`;
                } else {
                    if (collection.colors_active && collection.colors && collection.colors.length > 0) {
                        const colorName = Color.find(c => c.code === item)?.name || '';
                        str += colorName;
                    } else {
                        str += item.replace(' ', '');
                    }
                }
            }
        }
        return str;
    }
}

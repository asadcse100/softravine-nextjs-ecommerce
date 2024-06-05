import { CombinationService } from 'aiz-packages/combination-generate/services/CombinationService';
import { Cart } from '../models/Cart';
import { Color } from '../models/Color';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Wishlist } from '../models/Wishlist';
import { ProductUtility } from '../utils/ProductUtility';
import { Combinations } from 'combinations'; // Assuming Combinations is a valid package

import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { Str } from 'lodash'; // Make sure you have lodash installed

interface FlashDealData {
    flash_deal_id: number;
    flash_discount: number;
    flash_discount_type: string;
}

export default class ProductService {
    public static async store(req: NextApiRequest, res: NextApiResponse, next: NextHandler): Promise<void> {
        try {
            const data = req.body;
            const collection = Object.assign({}, data);

            let approved = 1;
            let user_id;

            if (req.user.user_type === 'seller') {
                user_id = req.user.id;
                if (get_setting('product_approve_by_admin') == 1) {
                    approved = 0;
                }
            } else {
                user_id = await User.findOne({ user_type: 'admin' }).select('id');
            }

            const tags = [];
            if (collection.tags[0] !== null) {
                for (const tag of JSON.parse(collection.tags[0])) {
                    tags.push(tag.value);
                }
            }
            collection.tags = tags.join(',');

            let discount_start_date = null;
            let discount_end_date = null;
            if (collection.date_range !== null) {
                const date_var = collection.date_range.split(' to ');
                discount_start_date = new Date(date_var[0]).getTime();
                discount_end_date = new Date(date_var[1]).getTime();
            }
            delete collection.date_range;

            if (!collection.meta_title) {
                collection.meta_title = collection.name;
            }
            if (!collection.meta_description) {
                collection.meta_description = strip_tags(collection.description);
            }
            if (!collection.meta_img) {
                collection.meta_img = collection.thumbnail_img;
            }

            let shipping_cost = 0;
            if (collection.shipping_type) {
                if (collection.shipping_type === 'free') {
                    shipping_cost = 0;
                } else if (collection.shipping_type === 'flat_rate') {
                    shipping_cost = collection.flat_shipping_cost;
                }
            }
            delete collection.flat_shipping_cost;

            const slug = Str.slug(collection.name);
            const same_slug_count = await Product.countDocuments({ slug: { $regex: `${slug}%` } });
            const slug_suffix = same_slug_count ? `-${same_slug_count + 1}` : '';
            collection.slug += slug_suffix;

            let colors = JSON.stringify([]);
            if (collection.colors_active && collection.colors && collection.colors.length > 0) {
                colors = JSON.stringify(collection.colors);
            }

            const options = ProductUtility.get_attribute_options(collection);

            const combinations = CombinationService.generate_combination(options);
            if (combinations.length > 0) {
                for (const combination of combinations) {
                    const str = ProductUtility.get_combination_string(combination, collection);

                    delete collection[`price_${str.replace('.', '_')}`];
                    delete collection[`sku_${str.replace('.', '_')}`];
                    delete collection[`qty_${str.replace('.', '_')}`];
                    delete collection[`img_${str.replace('.', '_')}`];
                }
            }

            delete collection.colors_active;

            let choice_options = [];
            if (collection.choice_no && collection.choice_no.length) {
                for (const no of collection.choice_no) {
                    const str = `choice_options_${no}`;
                    const item: { attribute_id: number; values: any[] } = { attribute_id: no, values: [] };
                    for (const eachValue of collection[str]) {
                        item.values.push(eachValue);
                    }
                    delete collection[str];
                    choice_options.push(item);
                }
            }

            choice_options = JSON.stringify(choice_options);

            const attributes = collection.choice_no ? JSON.stringify(collection.choice_no) : JSON.stringify([]);

            delete collection.button;

            const productData = Object.assign(collection, {
                user_id,
                approved,
                discount_start_date,
                discount_end_date,
                shipping_cost,
                slug,
                colors,
                choice_options,
                attributes,
                published: collection.button === 'unpublish' || collection.button === 'draft' ? 0 : 1,
            });

            const product = await Product.create(productData);
            res.json(product);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    // You can implement the update, product_duplicate_store, and destroy methods similarly
}

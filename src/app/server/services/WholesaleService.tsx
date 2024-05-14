import { Request, Response } from 'express';
import { Product, ProductStock, WholesalePrice, ProductTax, FlashDealProduct, ProductTranslation, User, Cart } from '../models';
import { flash, translate, addon_is_activated, get_setting } from '../helpers';
import { default as Artisan } from 'artisan'; // Assuming Artisan has been properly imported

export class WholesaleService {
    public async store(req: Request, res: Response): Promise<void> {
        try {
            const product = new Product();
            product.slug = req.body.name.toLowerCase().replace(/[^A-Za-z0-9\-]/g, '').replace(/ /g, '-');

            if (await Product.findOne({ slug: product.slug })) {
                flash(translate('Another product exists with the same slug. Please change the slug!')).warning();
                return res.redirect('back');
            }

            product.name = req.body.name;
            product.added_by = req.body.added_by;
            if (req.user?.user_type === 'seller') {
                product.user_id = req.user.id;
                if (get_setting('product_approve_by_admin') === 1) {
                    product.approved = 0;
                }
            } else {
                product.user_id = (await User.findOne({ user_type: 'admin' }))?.id;
            }
            product.category_id = req.body.category_id;
            product.brand_id = req.body.brand_id;
            product.barcode = req.body.barcode;

            if (addon_is_activated('refund_request')) {
                product.refundable = req.body.refundable ? 1 : 0;
            }

            product.photos = req.body.photos;
            product.thumbnail_img = req.body.thumbnail_img;
            product.unit = req.body.unit;
            product.min_qty = req.body.min_qty;
            product.low_stock_quantity = req.body.low_stock_quantity;
            product.stock_visibility_state = req.body.stock_visibility_state;

            const tags = req.body.tags?.[0] ? JSON.parse(req.body.tags[0]).map((tag: any) => tag.value) : [];
            product.tags = tags.join(',');

            product.description = req.body.description;
            product.video_provider = req.body.video_provider;
            product.video_link = req.body.video_link;
            product.unit_price = req.body.unit_price;

            product.shipping_type = req.body.shipping_type;
            product.est_shipping_days = req.body.est_shipping_days;

            if (addon_is_activated('club_point') && req.body.earn_point) {
                product.earn_point = req.body.earn_point;
            }

            if (req.body.shipping_type) {
                if (req.body.shipping_type === 'free') {
                    product.shipping_cost = 0;
                } else if (req.body.shipping_type === 'flat_rate') {
                    product.shipping_cost = req.body.flat_shipping_cost;
                } else if (req.body.shipping_type === 'product_wise') {
                    product.shipping_cost = JSON.stringify(req.body.shipping_cost);
                }
            }

            if (req.body.is_quantity_multiplied) {
                product.is_quantity_multiplied = 1;
            }

            product.meta_title = req.body.meta_title || product.name;
            product.meta_description = req.body.meta_description || product.description.replace(/<[^>]*>?/gm, '');
            product.meta_img = req.body.meta_img || product.thumbnail_img;

            if (req.body.pdf) {
                product.pdf = req.body.pdf;
            }

            product.colors = '[]';
            product.choice_options = '[]';
            product.published = req.body.button !== 'unpublish' && req.body.button !== 'draft' ? 1 : 0;
            product.cash_on_delivery = req.body.cash_on_delivery ? 1 : 0;
            product.featured = req.body.featured ? 1 : 0;
            product.todays_deal = req.body.todays_deal ? 1 : 0;
            product.wholesale_product = 1;

            await product.save();

            const productStock = new ProductStock();
            productStock.product_id = product.id;
            productStock.variant = '';
            productStock.price = req.body.unit_price;
            productStock.sku = req.body.sku;
            productStock.qty = req.body.current_stock;
            await productStock.save();

            if (req.body.wholesale_price) {
                for (let key = 0; key < req.body.wholesale_price.length; key++) {
                    const wholesalePrice = new WholesalePrice();
                    wholesalePrice.product_stock_id = productStock.id;
                    wholesalePrice.min_qty = req.body.wholesale_min_qty[key];
                    wholesalePrice.max_qty = req.body.wholesale_max_qty[key];
                    wholesalePrice.price = req.body.wholesale_price[key];
                    await wholesalePrice.save();
                }
            }

            if (req.body.tax_id) {
                for (let key = 0; key < req.body.tax_id.length; key++) {
                    const productTax = new ProductTax();
                    productTax.tax_id = req.body.tax_id[key];
                    productTax.product_id = product.id;
                    productTax.tax = req.body.tax[key];
                    productTax.tax_type = req.body.tax_type[key];
                    await productTax.save();
                }
            }

            if (req.body.flash_deal_id) {
                const flashDealProduct = new FlashDealProduct();
                flashDealProduct.flash_deal_id = req.body.flash_deal_id;
                flashDealProduct.product_id = product.id;
                await flashDealProduct.save();
            }

            const productTranslation = await ProductTranslation.findOne({ lang: process.env.DEFAULT_LANGUAGE, product_id: product.id }) || new ProductTranslation();
            productTranslation.name = req.body.name;
            productTranslation.unit = req.body.unit;
            productTranslation.description = req.body.description;
            await productTranslation.save();

            flash(translate('Product has been inserted successfully')).success();

            Artisan.call('view:clear');
            Artisan.call('cache:clear');

            res.send('Product inserted successfully');
        } catch (error) {
            console.error(error);
            flash(translate('Something went wrong')).error();
            res.redirect('back');
        }
    }

    // Similar for update and destroy methods
}

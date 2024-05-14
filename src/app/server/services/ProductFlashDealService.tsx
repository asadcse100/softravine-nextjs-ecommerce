import { FlashDeal } from "../models/FlashDeal";
import { FlashDealProduct } from "../models/FlashDealProduct";
import { Product } from "../models/Product";

interface FlashDealData {
    flash_deal_id: number;
    flash_discount: number;
    flash_discount_type: string;
}

export class ProductFlashDealService {
    public store(data: FlashDealData, product: Product): void {
        if (data.flash_deal_id) {
            const flash_deal_product = FlashDealProduct.firstOrNew({
                flash_deal_id: data.flash_deal_id, 
                product_id: product.id
            });
            flash_deal_product.flash_deal_id = data.flash_deal_id;
            flash_deal_product.product_id = product.id;
            flash_deal_product.save();

            const flash_deal = FlashDeal.findOrFail(data.flash_deal_id);
            product.discount = data.flash_discount;
            product.discount_type = data.flash_discount_type;
            product.discount_start_date = flash_deal.start_date;
            product.discount_end_date = flash_deal.end_date;
            product.save();
        }
    }
}

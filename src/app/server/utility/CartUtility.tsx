import Cookie from 'cookie';

interface Product {
    id: number;
    user_id: number;
    choice_options: string;
    auction_product: number;
    wholesale_product: number;
    discount_start_date: string | null;
    discount_end_date: string | null;
    discount_type: string;
    discount: number;
    taxes: Tax[];
    bids: Bid[];
    // Define other properties as needed
}

interface ProductStock {
    price: number;
    wholesalePrices: WholesalePrice[];
}

interface Choice {
    attribute_id: string;
}

interface WholesalePrice {
    min_qty: number;
    max_qty: number;
    price: number;
}

interface Tax {
    tax_type: string;
    tax: number;
}

interface Bid {
    amount: number;
    // Define other properties as needed
}

interface Cart {
    quantity: number;
    product_id: number;
    owner_id: number;
    price: number;
    tax: number;
    product_referral_code: string | null;
}

export class CartUtility {

    public static create_cart_variant(product: Product, request: Record<string, string>): string {
        let str: string | null = null;
        if (request['color']) {
            str = request['color'];
        }

        if (product.choice_options && JSON.parse(product.choice_options).length > 0) {
            // Gets all the choice values of customer choice option and generate a string like Black-S-Cotton
            for (const choice of JSON.parse(product.choice_options) as Choice[]) {
                const attribute_id = `attribute_id_${choice.attribute_id}`;
                if (str !== null) {
                    str += `-${request[attribute_id].replace(' ', '')}`;
                } else {
                    str = request[attribute_id].replace(' ', '');
                }
            }
        }
        return str || '';
    }

    public static get_price(product: Product, product_stock: ProductStock, quantity: number): number {
        let price = product_stock.price;
        if (product.auction_product === 1) {
            price = Math.max(...product.bids.map(bid => bid.amount));
        }

        if (product.wholesale_product) {
            const wholesalePrice = product_stock.wholesalePrices.find(price =>
                price.min_qty <= quantity && price.max_qty >= quantity);
            if (wholesalePrice) {
                price = wholesalePrice.price;
            }
        }

        return this.discount_calculation(product, price);
    }

    public static discount_calculation(product: Product, price: number): number {
        let discount_applicable = false;

        if (
            product.discount_start_date === null ||
            (Date.now() >= Date.parse(product.discount_start_date) &&
                Date.now() <= Date.parse(product.discount_end_date))
        ) {
            discount_applicable = true;
        }

        if (discount_applicable) {
            if (product.discount_type === 'percent') {
                price -= (price * product.discount) / 100;
            } else if (product.discount_type === 'amount') {
                price -= product.discount;
            }
        }
        return price;
    }

    public static tax_calculation(product: Product, price: number): number {
        let tax = 0;
        for (const product_tax of product.taxes) {
            if (product_tax.tax_type === 'percent') {
                tax += (price * product_tax.tax) / 100;
            } else if (product_tax.tax_type === 'amount') {
                tax += product_tax.tax;
            }
        }

        return tax;
    }

    public static save_cart_data(cart: Cart, product: Product, price: number, tax: number, quantity: number): void {
        cart.quantity = quantity;
        cart.product_id = product.id;
        cart.owner_id = product.user_id;
        cart.price = price;
        cart.tax = tax;
        cart.product_referral_code = null;

        if (Cookie.get('referred_product_id') && parseInt(Cookie.get('referred_product_id')) === product.id) {
            cart.product_referral_code = Cookie.get('product_referral_code') || null;
        }

        // Cart.create(data);
        // Implement save method for cart
    }

    public static check_auction_in_cart(carts: Cart[]): boolean {
        for (const cart of carts) {
            if (cart.product.auction_product === 1) {
                return true;
            }
        }
        return false;
    }
}

import { ProductTax } from '../models/ProductTax';

interface ProductData {
    tax_id: number[];
    product_id: number;
    tax: number[];
    tax_type: string[];
}

export class ProductTaxService {
    public store(data: ProductData): void {
        const { tax_id, product_id, tax, tax_type } = data;

        if (tax_id) {
            tax_id.forEach((val, key) => {
                const product_tax = new ProductTax();
                product_tax.tax_id = val;
                product_tax.product_id = product_id;
                product_tax.tax = tax[key];
                product_tax.tax_type = tax_type[key];
                product_tax.save();
            });
        }
    }

    public product_duplicate_store(product_taxes: ProductTax[], product_new: { id: number }): void {
        product_taxes.forEach((tax) => {
            const product_tax = new ProductTax();
            product_tax.product_id = product_new.id;
            product_tax.tax_id = tax.tax_id;
            product_tax.tax = tax.tax;
            product_tax.tax_type = tax.tax_type;
            product_tax.save();
        });
    }
}

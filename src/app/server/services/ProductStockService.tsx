// Import necessary modules from Next.js
import { useEffect, useState } from 'react';
import { CombinationService } from 'AizPackages/CombinationGenerate/Services/CombinationService';
import ProductStock from '../models/ProductStock';
import ProductUtility from '../utility/ProductUtility';

interface ProductData {
  // Define types for product data
  id: number;
  // Add other fields as needed
}

interface FormData {
  [key: string]: any;
}

// Define ProductStockService class
class ProductStockService {
  public async store(data: FormData, product: ProductData): Promise<void> {
    const collection = Object.entries(data);

    const options = ProductUtility.get_attribute_options(collection);
    
    // Generates the combinations of customer choice options
    const combinations = new CombinationService().generate_combination(options);
    
    if (combinations.length > 0) {
      product.variant_product = 1; // Assuming variant_product is in ProductData
      // Save product using API or other method
      
      combinations.forEach((combination: any) => {
        const str = ProductUtility.get_combination_string(combination, collection);
        const product_stock = new ProductStock();
        product_stock.product_id = product.id;
        product_stock.variant = str;
        product_stock.price = data[`price_${str.replace('.', '_')}`];
        product_stock.sku = data[`sku_${str.replace('.', '_')}`];
        product_stock.qty = data[`qty_${str.replace('.', '_')}`];
        product_stock.image = data[`img_${str.replace('.', '_')}`];
        // Save product stock using API or other method
      });
    } else {
      delete collection['colors_active'];
      delete collection['colors'];
      delete collection['choice_no'];
      const qty = collection['current_stock'];
      const price = collection['unit_price'];
      delete collection['current_stock'];

      const productData = {
        ...collection,
        variant: '',
        qty,
        price
      };

      // Save product stock using API or other method
    }
  }

  public async product_duplicate_store(product_stocks: ProductStock[], product_new: ProductData): Promise<void> {
    product_stocks.forEach((stock) => {
      const product_stock = new ProductStock();
      product_stock.product_id = product_new.id;
      product_stock.variant = stock.variant;
      product_stock.price = stock.price;
      product_stock.sku = stock.sku;
      product_stock.qty = stock.qty;
      // Save product stock using API or other method
    });
  }
}

export default ProductStockService;

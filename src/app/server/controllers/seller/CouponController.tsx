import { Request, Response } from 'express';
import Coupon from '../models/Coupon'; // Make sure to import your Coupon model
import Auth from '../services/Auth'; // Assuming you have an Auth service for authentication

export async function index(req: Request, res: Response) {
    try {
        const coupons = await Coupon.find({ user_id: Auth.user.id }).sort({ id: 'desc' });
        return res.render('seller.coupons.index', { coupons });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function create(req: Request, res: Response) {
    try {
        return res.render('seller.coupons.create');
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function store(req: Request, res: Response) {
    try {
        const user_id = Auth.user.id;
        await Coupon.create({ ...req.body, user_id });
        
        // Flash message not available in this conversion
        return res.redirect('seller.coupon.index');
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function edit(req: Request, res: Response) {
    try {
        const coupon = await Coupon.findById(decrypt(req.params.id));
        return res.render('seller.coupons.edit', { coupon });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const coupon = await Coupon.findById(req.params.id);
        await coupon.updateOne(req.body);

        // Flash message not available in this conversion
        return res.redirect('seller.coupon.index');
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function destroy(req: Request, res: Response) {
    try {
        await Coupon.findByIdAndDelete(req.params.id);

        // Flash message not available in this conversion
        return res.redirect('seller.coupon.index');
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function get_coupon_form(req: Request, res: Response) {
    try {
        if (req.body.coupon_type === "product_base") {
            const products = await filter_products(\App\Models\Product.find({ user_id: Auth.user.id }));
            return res.render('partials.coupons.product_base_coupon', { products });
        } else if (req.body.coupon_type === "cart_base") {
            return res.render('partials.coupons.cart_base_coupon');
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function get_coupon_form_edit(req: Request, res: Response) {
    try {
        if (req.body.coupon_type === "product_base") {
            const coupon = await Coupon.findById(req.body.id);
            const products = await filter_products(\App\Models.Product.find({ user_id: Auth.user.id }));
            return res.render('partials.coupons.product_base_coupon_edit', { coupon, products });
        } else if (req.body.coupon_type === "cart_base") {
            const coupon = await Coupon.findById(req.body.id);
            return res.render('partials.coupons.cart_base_coupon_edit', { coupon });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
